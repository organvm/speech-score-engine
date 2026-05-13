---
purpose: Worker process startup wiring — instantiate adapters + services, register Workers against the named queues.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.3"
status: planned
planned_files:
  - build-dependencies.ts
  - register-workers.ts
  - register-shutdown.ts
---

# apps/worker/src/bootstrap/

## Purpose

The worker's composition root. Parallels `apps/api/src/bootstrap/` — instantiate concrete adapters, wire them to job processors, register BullMQ Workers against their queues, register graceful-shutdown hooks.

## What goes here

- `build-dependencies.ts` — Constructs the voice provider adapter (from env: `VOICE_PROVIDER_ID`), the storage adapter, the database pool, the logger.
- `register-workers.ts` — For each queue, creates a BullMQ `Worker` with the matching job processor from `jobs/`.
- `register-shutdown.ts` — Drains queues, closes worker connections, disconnects Redis, ends pg pool.

## Why separate from the worker's `src/index.ts`

The current `index.ts` declares queues only (no processors registered yet). When the first job processor lands, `index.ts` becomes the entrypoint that calls `bootstrap/register-workers.ts`. Keeping the wiring isolated here means the entrypoint stays trivial.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.3`
- Architecture: `docs/architecture/003-render-pipeline.md`
