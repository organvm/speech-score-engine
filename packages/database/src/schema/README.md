---
purpose: TS schema declarations or codegen output mirroring the SQL migrations. Currently empty pending decision on codegen.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §5.2"
status: planned
---

# packages/database/src/schema/

## Purpose

The blueprint anticipates a schema layer here — TS types that mirror the SQL tables. Two implementation routes:

1. **Hand-maintained** — type files that parallel the migrations. Drift risk; manual.
2. **Codegen** — tools like `kanel`, `pg-typegen`, or `drizzle-kit introspect` generate types from the live database. Lower drift, requires DB connection at build time.

Decision deferred. The current scaffold uses the domain types in `@sse/domain/src/scene/scene.types.ts` directly — they're hand-curated and intentionally do not 1:1 mirror DB column names (camelCase vs. snake_case, omitted columns that the API doesn't expose, etc.).

## What might go here

- A codegen output directory once a tool is chosen.
- Or hand-written types if we decide explicit > auto-derived.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §5.2`
- Migrations: `packages/database/migrations/`
- Domain types: `packages/domain/src/scene/scene.types.ts`
