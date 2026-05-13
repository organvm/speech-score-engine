---
purpose: Database query layer. One repository per primary aggregate root.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.2"
status: planned
planned_files:
  - project.repository.ts
  - scene.repository.ts
  - speaker.repository.ts
  - voice-profile.repository.ts
  - scene-version.repository.ts
  - version-line.repository.ts
  - render.repository.ts
  - diagnostic-report.repository.ts
  - share-link.repository.ts
  - audit-event.repository.ts
---

# apps/api/src/repositories/

## Purpose

The database query layer. Each repository owns query construction and result mapping for one aggregate root. Repositories are the only place SQL strings live inside `apps/api`.

A repository's job: take typed inputs, run parameterized queries via the `pg` client (or transaction helper from `@sse/database/transactions/`), map result rows into domain types from `@sse/domain`, return them.

## What goes here

One file per aggregate root from the domain model (see `docs/architecture/002-domain-model.md`). Each file exports a class (or factory function returning a typed object) with explicit method names — `findById`, `findByProjectId`, `insert`, `update`, `softDelete`, etc.

## Conventions

- **All queries are parameterized.** String interpolation into SQL is forbidden; use `$1, $2, ...` always.
- **Repositories return domain types, not raw rows.** Field-name mapping (snake_case → camelCase) happens here.
- **Transactional flows live in `@sse/database/src/transactions/`**, not in repositories. Repositories operate on a single connection; transactions wrap multiple repository calls.
- **No business logic.** A repository does not decide "should this scene be archivable" — that's `modules/` or `services/`. It only knows how to read and write.

## What does NOT go here

- Migration files — those are `packages/database/migrations/`.
- Schema declarations — Postgres + the migration files are the source of truth; we don't maintain a parallel TS schema file unless codegen demands one.
- Cross-aggregate orchestration — that's `services/` or `transactions/`.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.2`
- Architecture: `docs/architecture/002-domain-model.md`
- Database client: `packages/database/src/client.ts`
