---
purpose: Cross-module business logic implementations. Concrete classes that satisfy the @sse/domain service contracts.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.2"
status: planned
planned_files:
  - scene-parser.service.ts
  - versioning.service.ts
  - diagnostics.service.ts
  - render-dispatch.service.ts
  - share-link.service.ts
---

# apps/api/src/services/

## Purpose

Concrete implementations of the **service interfaces** declared in `@sse/domain/contracts/`. Services own business logic that spans repositories or coordinates external dependencies; they sit between `modules/` (the HTTP handlers) and `repositories/` (the DB layer).

A service does not know about HTTP. It receives plain typed input, calls repositories + adapters, returns plain typed output.

## What goes here

| File | Implements | Blueprint reference |
|---|---|---|
| `scene-parser.service.ts` | `SceneParserService` from `@sse/domain/parsing` | §9.3 |
| `versioning.service.ts` | `VersioningService` from `@sse/domain/contracts` | §9.3, §8 (the atomic transaction lives in `@sse/database/transactions`, this service calls it) |
| `diagnostics.service.ts` | `DiagnosticsService` from `@sse/domain/contracts` | §9.3 |
| `render-dispatch.service.ts` | `RenderDispatchService` from `@sse/domain/contracts` | §9.3 |
| `share-link.service.ts` | (interface lives in `@sse/domain/contracts/share-link.service.ts` when added; not in blueprint §9.3 by name but implied by §6) | §6 |

## Construction + injection

Services are instantiated once at boot in `bootstrap/` and injected into route handlers via Fastify's dependency injection. **Never** import a service class directly from a handler file; always receive it via injected `deps`.

## What does NOT go here

- HTTP request/response transformation — that's `modules/`.
- Raw SQL — that's `repositories/`.
- External-system communication (voice provider, blob storage) — those live in `apps/worker/src/providers/` because the API doesn't call them directly; the worker does.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.2, §9.3`
- Architecture: `docs/architecture/005-api-contracts.md`
- Contracts: `packages/domain/src/contracts/*.ts`
