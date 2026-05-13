---
purpose: BullMQ job processor implementations. One file per queue.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.3"
status: planned
planned_files:
  - render-scene.job.ts
  - generate-diagnostics.job.ts
  - cleanup-assets.job.ts
---

# apps/worker/src/jobs/

## Purpose

Each file in this directory is a **job processor** for one named queue declared in `apps/worker/src/queues.ts`. The processor receives the job payload, runs the pipeline, updates the relevant database row, emits the corresponding audit event.

A job processor is *not* the place for the rendering pipeline itself — that's `pipelines/`. The processor is the glue: load the version from DB, call the pipeline, persist the result.

## What goes here

| File | Queue | Pipeline used |
|---|---|---|
| `render-scene.job.ts` | `render-scene` | `pipelines/render-pipeline.ts` |
| `generate-diagnostics.job.ts` | `generate-diagnostics` | (logic in services/diagnostics directly; no separate pipeline) |
| `cleanup-assets.job.ts` | `cleanup-assets` | (sweeps stuck renders, expired share-link associated artifacts) |

## Required pattern

Every job processor is **idempotent at the row level**. A re-delivery (after worker crash) reads the row state first; if it's already terminal (`completed` / `failed` / `cancelled`), the processor logs and returns without redoing work.

## What does NOT go here

- Provider calls — those go through adapters in `providers/`.
- Pipeline assembly logic — that's `pipelines/`.
- Status-row updates as raw SQL — wrap those in `services/render-status.service.ts`.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.3`
- Architecture: `docs/architecture/003-render-pipeline.md`
- ADR: `docs/adr/0003-async-render-worker.md`
- Queue names: `apps/worker/src/queues.ts`
