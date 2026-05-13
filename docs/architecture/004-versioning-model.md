---
title: Versioning model
authority: derived
derives_from:
  - "docs/product/repository-blueprint-handoff-package.md §8"
  - "packages/database/migrations/0003_add_scene_versions_version_lines.sql"
  - "packages/domain/src/contracts/versioning.service.ts"
status: current
last_validated_against_code: "2026-05-13"
---

# Versioning model

## The invariant

> **A `scene_version` row, once written, is never updated.**

This is the load-bearing rule of the entire system. Every reproducibility property — share links, render reproducibility, diagnostic regeneration against a fixed input — depends on it. See `docs/adr/0004-scene-version-immutability.md`.

## Why the mutable/immutable split

The user works on a `scene` (mutable) — typing, deleting, restructuring. The system needs:

- A frictionless editing experience (no "save version every time you press space").
- The ability to reference a *specific* take that doesn't drift afterward (for renders, shares, diagnostics, compare-views).

Splitting `scene` (mutable working state) from `scene_version` (immutable snapshots) gives both. Editing is cheap. Versioning is explicit — created when the user takes a snapshot, branches a comparison, ships a render, or hands a share link to a collaborator.

## What a version captures

```
scene_version row:
  ├── version_id        UUID
  ├── scene_id          → references the parent scene
  ├── version_label     human-friendly name (optional)
  ├── raw_text_snapshot full original text
  ├── parsed_state_snapshot   JSONB — the full parsed structure
  ├── settings_snapshot       JSONB — full working_settings_current at time of capture
  ├── estimated_duration_ms   computed
  ├── created_by_user_id      who created it
  └── created_at

version_line rows (N per version):
  ├── version_line_id   UUID
  ├── version_id        → back to scene_version
  ├── speaker_id        → speaker (nullable for stage directions)
  ├── line_index        ordinal within the version
  ├── text_content
  ├── is_stage_direction
  ├── pause_after_ms
  ├── emphasis_hint
  ├── estimated_duration_ms
  └── structural_tags   JSONB

UNIQUE(version_id, line_index)
```

Both representations (the JSONB snapshot and the normalized rows) are populated atomically in one transaction. See "Atomic creation" below.

## Atomic creation

Lives at `packages/database/src/transactions/create-scene-version.transaction.ts` (planned).

The transaction:

1. `BEGIN`
2. Read current `scene.raw_text_current`, `parsed_state_current`, `working_settings_current`, `estimated_duration_ms_current`.
3. `INSERT INTO scene_version (...)` returning `version_id`.
4. For each line in `parsed_state_current.lines`: `INSERT INTO version_line (...)`.
5. `INSERT INTO audit_event (event_type='version.created', payload={version_id, scene_id})`.
6. `COMMIT`.

If any step fails, the whole transaction rolls back. There must never be a partially-written version.

## Why two representations of the same data

`parsed_state_snapshot` (JSONB) is the entire parsed structure stored as one document. `version_line` rows are normalized siblings.

| Use case | Reads from |
|---|---|
| "Load the whole version for the editor / compare view." | `parsed_state_snapshot` — one row, single query. |
| "Show me every line where speaker X talks." | `version_line` — indexed `speaker_id` lookup. |
| "What's the longest uninterrupted run by one speaker?" (diagnostics) | `version_line` — ordered scan over `line_index`. |
| "Render lines 4–11 of version X." | `version_line` — index-range filter. |
| "Hash the version for change detection." | `parsed_state_snapshot` — JSONB canonicalization is faster than reassembling rows. |

The duplication is allowed because **the version is immutable**. There is no drift risk after creation: both representations are written in the same transaction and never updated.

See `docs/adr/0002-postgres-jsonb-snapshots.md` for the trade-off rationale.

## Restoring a version into the mutable scene

(Per blueprint §9.3 `VersioningService.restoreVersion`.)

When the user wants to "go back" to a previous version's content:

1. Read the version's `raw_text_snapshot`, `parsed_state_snapshot`, `settings_snapshot`.
2. `UPDATE scene SET raw_text_current = ..., parsed_state_current = ..., working_settings_current = ...`.
3. Emit `audit_event` (event_type=`version.restored`, payload={scene_id, version_id, restored_by_user_id}).

**The version row is never modified.** Restore is a copy *from* the version *into* the mutable scene. The user can immediately edit the scene without affecting the version. To preserve the restored state, they create a new version (which will likely have content hash matching the restored-from version — handled by the `duplicate_group` semantics applied elsewhere).

## Comparison between versions

Two patterns are supported:

- **Whole-document diff** — compare `raw_text_snapshot` between two versions. Useful for textual diff display.
- **Line-level diff** — compare `version_line` rows between two versions, joined on best-match heuristic (since `line_index` may shift if lines were inserted/deleted). Useful for "this line changed" attribution.

Comparison views (`apps/web/src/app/scenes/[sceneId]/compare/`) consume both.

## Identity of "the same content across versions"

If the user creates version A, edits, reverts, and creates version B with identical content to A, B is a distinct row with a distinct `version_id` and a distinct `created_at` — but the content hash matches A's. Higher-level code can use `parsed_state_snapshot` hash for "is this the same content?" comparisons.

This is the same pattern the chat-pair archive's `duplicate_group` column uses for ChatGPT's branched-conversation case.

## Versions and renders

A `playback_render` row references `version_id`, NOT `scene_id`. This is what makes renders reproducible:

- A render against version A is a render of version A's content. Whatever the user does to the mutable scene afterward, the render's input is preserved.
- A "re-render with new settings" is a new render row against the same version with a different render_profile.

(Per `003-render-pipeline.md`.)

## Versions and share links

Same reason: `share_link.version_id`, not `share_link.scene_id`. A shared scene is always a specific frozen take. If the user wants to share the "current state," they must first capture it as a version and then create a share link against that version.

This was a deliberate decision against "always-share-current-state" because:

- Collaborators viewing a share link would see content drift mid-review.
- Reviewers commenting on "line 14" would have line 14 change underneath them.

## What's NOT a version

- The mutable `scene` row's history. We don't keep a per-keystroke or per-save log of mutable-scene mutations; that's not the system's concern.
- The audit log. `audit_event` rows are append-only but they're separate from versions — they record *actions* (`version.created`, `render.completed`), not state snapshots.

## Out of scope here

- The actual parser that turns `raw_text_current` into `parsed_state_current` (lives in `apps/api/src/services/scene-parser.service.ts`, planned).
- The diagnostics generation that runs against a version (lives in `apps/api/src/services/diagnostics.service.ts`, planned).
- The audit-event taxonomy (lives in `packages/domain/src/events/event-names.ts`).
