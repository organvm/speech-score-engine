---
purpose: Domain-oriented HTTP modules — one per resource family — owning request validation, handler logic, and module-local state.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.2"
status: planned
planned_files:
  - auth/
  - projects/
  - scenes/
  - parsing/
  - speakers/
  - versions/
  - renders/
  - diagnostics/
  - shares/
  - audit/
---

# apps/api/src/modules/

## Purpose

Each subdirectory here is a **domain module** — a cluster of handlers, request schemas, and module-local helpers for one resource family. The shape is deliberately domain-oriented (one directory per noun in the system) rather than generic-CRUD-flat. The blueprint (§4.2) calls this out explicitly: "avoid a flat 'routes plus utils' structure."

A module's job: validate incoming requests, call the right `services/`, transform the result into the response shape, and emit any boundary-level events.

## What goes here

- `auth/` — Sign-in / token issuance / session handlers.
- `projects/` — Project CRUD.
- `scenes/` — Scene CRUD, status transitions.
- `parsing/` — Scene-text → parsed-state orchestration. Wraps `SceneParserService` from `@sse/domain/parsing`.
- `speakers/` — Speaker CRUD within a scene.
- `versions/` — Version creation, restore, list. Calls `VersioningService`.
- `renders/` — Render submission, status read.
- `diagnostics/` — Diagnostics generation triggers + retrieval.
- `shares/` — Share-link creation, revocation.
- `audit/` — Audit-event query endpoints (administrative).

## Module structure (per directory)

```
modules/<name>/
├── index.ts                    # Exports handler functions to be bound by routes/
├── <name>.handlers.ts          # Handler implementations
├── <name>.schemas.ts           # zod request/response schemas (or imports from @sse/domain)
└── <name>.errors.ts            # Module-specific error classes (rare; most errors are generic)
```

## What does NOT go here

- Cross-cutting middleware — that's `server/middleware/`.
- Business logic that spans multiple modules — that's `services/`.
- Database query construction — that's `repositories/`.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.2`
- Architecture: `docs/architecture/005-api-contracts.md`
