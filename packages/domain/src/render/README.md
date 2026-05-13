---
purpose: Render-domain types, schemas, value objects.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §5.1"
status: planned
---

# packages/domain/src/render/

## Purpose

Render-related TS types beyond the `RenderStatus` / `RenderScope` enums currently in `scene/scene.types.ts`. As the render pipeline lands real logic, the shapes for `PlaybackRender`, `RenderProfile`, `RenderConfig` move here.

The render-dispatch service contract already lives in `contracts/render-dispatch.service.ts` — those interfaces stay there. This directory is for the entity-level types and schemas.

## References

- Architecture: `docs/architecture/003-render-pipeline.md`
- ADR: `docs/adr/0003-async-render-worker.md`
- Contract: `packages/domain/src/contracts/render-dispatch.service.ts`
