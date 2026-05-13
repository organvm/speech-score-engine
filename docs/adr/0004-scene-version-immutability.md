---
adr_id: "0004"
title: "scene_version rows are immutable after creation"
status: accepted
date: "2026-05-13"
deciders: ["Anthony Padavano"]
---

# ADR 0004: scene_version rows are immutable after creation

## Context

The system needs reproducible references to a specific take of a scene. Renders happen against a take. Share links expose a take. Diagnostics analyze a take. Compare views diff two takes. Each of these makes sense only if "a take" doesn't drift after the reference is bound to it.

The user's working state — `scene.raw_text_current`, `parsed_state_current`, `working_settings_current` — is necessarily mutable; that's the editing surface. A snapshot mechanism is needed to take a frozen reference *from* the mutable scene that the rest of the system can bind to.

The question: do `scene_version` rows, once written, remain frozen, or can they be edited (label changes, regenerate parse from raw_text, etc.)?

## Options considered

### Option A — Mutable scene_version rows

Allow `UPDATE scene_version SET ...` for "trivial" fields (version_label, computed metadata). Forbid changes to `raw_text_snapshot` and `parsed_state_snapshot`.

**Pros:**
- The user can rename a version after the fact.
- Re-parsing with a fixed parser can update derived data without creating a new version.

**Cons:**
- "What is mutable" becomes a moving target. Today it's `version_label` and a hash; tomorrow someone adds an `analysis_notes` field. The rule becomes "everything except the snapshot," which is fragile.
- Caches, render outputs, share-link previews all keyed by `version_id` may drift relative to the version's current state.
- The audit log's `version.created` event no longer fully describes what's at that version_id later.
- Reproducibility claims weaken: "we rendered version X" no longer guarantees "we can re-render version X with identical input."

### Option B — Fully immutable scene_version rows

Once `INSERT INTO scene_version (...)` commits, no UPDATE statement ever touches that row. Even `version_label` is frozen. To "rename" a version, the user creates a new version with the new label.

**Pros:**
- `version_id` is the world's hardest binding — it identifies exactly one frozen artifact forever.
- All downstream caches, renders, share links, diagnostics, compare views are correctly keyed.
- Audit log accurately describes the full history.
- Reasoning about the system collapses: "given version_id, the input is fully determined."

**Cons:**
- The user cannot rename a version they created. (Or rather: renaming creates a new version.)
- The mental model is unusual — most systems allow at least cosmetic edits.

## Decision

**Option B. Full immutability.**

This is the **load-bearing rule** of the system. Every reproducibility property — share-link stability, render input determinism, diagnostic-versus-version binding, compare-view correctness — depends on it. Sacrificing it for cosmetic conveniences (rename a version) breaks the property class that motivates having versions at all.

The pattern is analogous to git commits: a commit's SHA identifies the commit's exact content; rewriting it produces a new SHA, not an edited old one.

## Consequences

### Database-level

- `packages/database/migrations/0003_add_scene_versions_version_lines.sql` does not need explicit triggers to enforce this — the rule is at the application/service layer. We do not write UPDATE statements against `scene_version` from any code path.
- A test in `test/integration/versioning/` should attempt to UPDATE a `scene_version` row through a code path and verify it fails (or, more practically, asserts that no production code path UPDATE's the table).

### Service-level

- `VersioningService.createVersion` is the **only** write path into `scene_version`. No other service function may construct an UPDATE against the table.
- `VersioningService.restoreVersion` does NOT modify the source version — it copies the version's fields into the **mutable scene** (`scene.raw_text_current = source_version.raw_text_snapshot`, etc.). The source version is unchanged.

### API-level

- There is no `PATCH /api/v1/versions/{versionId}` endpoint. There is no `DELETE` either — versions are append-only forever. (Soft-delete via a separate column would be a future ADR if needed; current scope doesn't include it.)

### Renders

- `playback_render.version_id` references a fixed snapshot. A render against version X always has the same input. Re-rendering with new settings means a new `playback_render` row against the same `version_id` with a different `render_profile_id`.

### Share links

- `share_link.version_id` references a fixed snapshot. The shared content does not drift mid-review.

### Audit

- `audit_event(event_type='version.created', payload={version_id, ...})` fully describes what was created. There is no `version.updated` event because no such event can occur.

### Diagnostics

- Multiple `diagnostic_report` rows per `version_id` are allowed (regenerated reports over time as the diagnostics algorithm evolves). The version itself does not change between report regenerations.

### User experience

- "I want to rename my version" → "Save as new version with the new label." The UI should make this obvious.
- "I made a typo in my version label" → same path. The cost of the inconvenience is small relative to the property gain.

## Revisit if

- A future product requirement genuinely demands editable version labels and the integrity gains can be relocated to a derived structure (e.g., a `version_alias` table that maps human-friendly names to immutable `version_id`s, where the alias is the editable surface). At that point, this ADR would be superseded — write the replacement and link it via `superseded_by`.

## Related

- ADR 0002 — JSONB-and-normalized duplication is safe *because* of this immutability.
- `docs/architecture/004-versioning-model.md` — the full operational model that depends on this rule.
- `packages/domain/src/contracts/versioning.service.ts` — the interface that enforces this at the service-contract level.
