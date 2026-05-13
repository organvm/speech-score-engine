---
purpose: Multi-step pipelines orchestrating providers, services, and persistence. Called by job processors.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.3"
status: planned
planned_files:
  - render-pipeline.ts
  - audio-assembly.ts
---

# apps/worker/src/pipelines/

## Purpose

Each file here is a **multi-step pipeline** that a job processor invokes: load → transform → call providers → assemble → persist. Pipelines compose multiple adapters and services into a single end-to-end flow.

The separation between `jobs/` and `pipelines/` is deliberate: a job processor is the BullMQ-shaped envelope; a pipeline is the actual work. The same pipeline could in principle be invoked from a CLI or a test harness without BullMQ involvement.

## What goes here

- `render-pipeline.ts` — End-to-end render flow: fetch version + speakers + voice profiles → call `VoiceProviderAdapter.render` per line (or batched) → assemble audio segments → store the result → update `playback_render` row → emit `render.completed`.
- `audio-assembly.ts` — Pure(ish) audio assembly logic: takes N per-line audio buffers + pause hints + emphasis hints, returns one combined buffer with the correct timing. Does not call providers; works on bytes.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.3`
- Architecture: `docs/architecture/003-render-pipeline.md`
