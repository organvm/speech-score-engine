---
purpose: Worker-internal services — render-status updates, artifact-storage upload, etc.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.3"
status: planned
planned_files:
  - render-status.service.ts
  - artifact-storage.service.ts
---

# apps/worker/src/services/

## Purpose

Worker-side services that wrap operations the pipelines need: render-status transitions, artifact-storage uploads, etc. These are the worker's equivalent of `apps/api/src/services/`, but limited to worker concerns.

## What goes here

- `render-status.service.ts` — Atomic transitions of the `playback_render` row: `queued → in_progress → completed | failed | cancelled`. Emits the corresponding audit event in the same transaction.
- `artifact-storage.service.ts` — High-level wrapper over the storage adapter. Handles content-type detection, bucket/key naming, signed-URL generation.

## What does NOT go here

- Provider SDK calls — those are in `providers/`.
- Pipeline orchestration — that's `pipelines/`.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.3`
