---
purpose: Multi-step database transactions that span repositories — the integrity-sensitive flows.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §5.2, §8"
status: planned
planned_files:
  - create-scene-version.transaction.ts
  - finalize-render.transaction.ts
---

# packages/database/src/transactions/

## Purpose

The **most important transactions in the system** live here. Per blueprint §8: "version creation is the most important transaction in the entire system."

A transaction in this directory:

- Begins with `BEGIN;` and ends with `COMMIT;` (or rolls back on any error).
- Spans **multiple table writes** that must all-succeed-or-all-fail.
- Emits the corresponding audit event in the same transaction.

## Planned transactions

### `create-scene-version.transaction.ts`

Atomically:
1. Read mutable scene state (`scene.raw_text_current`, `parsed_state_current`, `working_settings_current`).
2. INSERT `scene_version` snapshot.
3. INSERT all `version_line` rows.
4. Compute + persist `estimated_duration_ms`.
5. INSERT `audit_event(event_type='version.created')`.

If any step fails, no partial version exists.

### `finalize-render.transaction.ts`

When the worker completes a render:
1. UPDATE `playback_render` SET render_status='completed', audio_uri, waveform_uri, duration_ms, completed_at.
2. INSERT `audit_event(event_type='render.completed')`.

(See `docs/architecture/003-render-pipeline.md` and `004-versioning-model.md`.)

## Why a separate directory

Transactions cross aggregate boundaries — they're naturally homeless relative to single-aggregate repositories. Concentrating them here:
- Makes the integrity-sensitive code reviewable in one place.
- Lets future schema changes update transactions in lockstep.
- Documents which flows have all-or-nothing semantics.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §8`
- Architecture: `docs/architecture/004-versioning-model.md`
- ADR: `docs/adr/0004-scene-version-immutability.md`
