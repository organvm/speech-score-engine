---
title: Domain model
authority: derived
derives_from:
  - "packages/database/migrations/0001..0006_*.sql"
  - "packages/domain/src/scene/scene.types.ts"
  - "docs/product/speech-score-terminology-charter.md"
  - "docs/product/system-design-package.md"
status: current
last_validated_against_code: "2026-05-13"
---

# Domain model

## Identity and ownership

```
                       ┌─────────────┐
                       │  app_user   │
                       │  (account)  │
                       └──────┬──────┘
                              │ owns
                              ▼
                       ┌─────────────┐
                       │   project   │
                       └──────┬──────┘
                              │ contains
                              ▼
                       ┌─────────────┐
                       │    scene    │◄──── mutable working state
                       │  (mutable)  │      (raw_text_current,
                       └──┬───────┬──┘       parsed_state_current,
                          │       │          working_settings_current)
                          │       │ versions
                          │       ▼
                          │  ┌───────────────┐
                          │  │ scene_version │◄── immutable snapshot
                          │  │  (immutable)  │    (raw_text_snapshot,
                          │  └───────┬───────┘     parsed_state_snapshot,
                          │          │ lines      settings_snapshot)
                          │          ▼
                          │  ┌───────────────┐
                          │  │ version_line  │ normalized per-line rows
                          │  └───────┬───────┘ (text_content,
                          │          │          speaker_id,
                          │          │          pause_after_ms,
                          │          │          emphasis_hint,
                          │          │          estimated_duration_ms)
                          │          │
                          │ speakers │
                          ▼          │
                    ┌─────────────┐  │
                    │   speaker   │◄─┘ referenced by version_line.speaker_id
                    └──────┬──────┘
                           │ default voice
                           ▼
                    ┌────────────────┐
                    │ voice_profile  │
                    └────────────────┘
```

## Core entity descriptions

### `app_user`

Account-level identity. One user owns many projects.

### `project`

A user-owned grouping of scenes. Title + optional description. Soft-archived via `archived_at`. No nested folders — the project is the only organizational unit above the scene.

### `scene` (mutable)

The working state the user edits live. Carries `raw_text_current`, `parsed_state_current` (JSONB cache of the structured parse), `working_settings_current` (JSONB; pacing, ensemble assignments, etc.), and `estimated_duration_ms_current`.

`scene_status`: `draft | in_review | finalized | archived` — a stage indicator for human triage; not load-bearing for the engine.

### `scene_version` (immutable)

A frozen snapshot of a `scene` at a point in time. Carries `raw_text_snapshot`, `parsed_state_snapshot` (JSONB; full), `settings_snapshot` (JSONB; full), `estimated_duration_ms`. Created atomically — see `004-versioning-model.md`.

Once written, never updated.

### `version_line`

Normalized per-line rows associated with a `scene_version`. Each row carries `text_content`, optional `speaker_id`, `is_stage_direction`, optional `pause_after_ms`, optional `emphasis_hint`, optional `estimated_duration_ms`, optional `structural_tags` (JSONB). Unique on `(version_id, line_index)`.

The denormalized `parsed_state_snapshot` JSONB on `scene_version` plus the normalized `version_line` rows are intentionally redundant. The JSONB is for fast "load whole version" reads; the rows are for queries that need to filter or aggregate across lines (e.g., diagnostics).

### `speaker`

Per-scene speaker identity. `(scene_id, display_label)` is unique. Has optional `default_voice_profile_id` and optional `default_pacing_profile` (JSONB). `sort_order` for stable speaker enumeration.

Speakers belong to scenes, not versions. A version inherits the scene's speakers via `version_line.speaker_id` references.

### `voice_profile`

A provider-side voice identity. Carries `provider_key` (which voice provider — `mock`, `elevenlabs`, etc.), `provider_voice_key` (the provider's internal ID for this voice), `display_name`, optional `timbre_class`, `gender_presentation`, `locale_code`, `default_speech_rate`, `default_pitch_offset`, `is_active`.

`voice_profile` rows are global across users — a curated catalog the system maintains. Per-scene speaker → voice binding happens via `speaker.default_voice_profile_id`.

### `render_profile`

A reusable render-configuration per scene. `name` + `config` (JSONB; speech rate, output format, mix settings, etc.). One scene can have multiple render profiles (e.g., "rehearsal-mono", "show-stereo").

### `playback_render`

A specific render attempt. Binds a `scene_version` + `render_profile` + `render_scope` (`full_scene | line_range | single_line`) + optional `(scope_start_line_index, scope_end_line_index)`. Tracks `render_status` (`queued | in_progress | completed | failed | cancelled`), `audio_uri`, `waveform_uri`, `duration_ms`, `provider_job_key`, `error_message`, `requested_by_user_id`, `completed_at`.

### `diagnostic_report`

A generated analysis bound to a `scene_version`. `metrics` (JSONB; estimated duration, speaker count, longest uninterrupted run, alternation density, etc.) + `flags` (JSONB; array of `{flag_type, line_range, message}`). Many reports per version possible (regenerated over time).

### `share_link`

A token-bound public-read access to a `scene_version`. `access_mode` (currently `read_only`), `token_hash` (never store the token in plaintext — only its hash for lookup), `expires_at`, `revoked_at`, `created_by_user_id`.

Like renders, share links bind to versions, not scenes. The shared content is always a frozen take.

### `audit_event`

Append-only event log. `event_type` is a free-text discriminator (e.g., `version.created`, `render.completed`, `share.revoked`). `event_payload` (JSONB) carries the event-specific data. Optional `user_id`, `scene_id`, `version_id` for query indices.

## Value objects and enumerations

Defined in `packages/domain/src/scene/scene.types.ts` and validated via zod in `packages/domain/src/scene/scene.schemas.ts`:

- `SceneStatus = 'draft' | 'in_review' | 'finalized' | 'archived'`
- `RenderStatus = 'queued' | 'in_progress' | 'completed' | 'failed' | 'cancelled'`
- `RenderScope = 'full_scene' | 'line_range' | 'single_line'`
- `ShareAccessMode = 'read_only'`

## Why the JSONB+normalized split

JSONB columns (`parsed_state_snapshot`, `settings_snapshot`, `metrics`, `flags`, `working_settings_current`) coexist with normalized tables (`version_line`, `speaker`) intentionally:

- **JSONB** is for whole-document reads where the API needs the entire structure at once.
- **Normalized rows** are for queries that filter, aggregate, or join across the structure (diagnostics, version-line-level filtering, line-level UI updates).
- The duplication is allowed because the version is immutable — there's no consistency-drift risk after the version is created.

See `docs/adr/0002-postgres-jsonb-snapshots.md` for the decision rationale.

## Read paths and write paths

The system has two write paths and one canonical read path:

| Write path | Where | What it produces |
|---|---|---|
| Mutable scene update | `apps/api/src/modules/scenes/` (planned) | Updates `scene.raw_text_current`, `parsed_state_current`, `working_settings_current`. |
| Version creation | `packages/database/src/transactions/create-scene-version.transaction.ts` (planned) | Atomically writes a `scene_version` row + N `version_line` rows + an `audit_event`. See `004-versioning-model.md`. |

| Read path | Where | What it returns |
|---|---|---|
| Load scene | `apps/api/src/modules/scenes/` | Returns mutable `scene` + the version-history index. |
| Load version | `apps/api/src/modules/versions/` (planned) | Returns the immutable `scene_version` with its `parsed_state_snapshot`. |

## Out of scope here

- Migrations syntax (lives in `packages/database/migrations/`).
- Authorization rules (will live in `apps/api/src/policies/`).
- The TS contracts for cross-service communication (live in `packages/domain/src/contracts/`).
