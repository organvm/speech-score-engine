---
purpose: HTTP server bootstrap, routing, middleware, and error-response shape.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.2"
status: planned
planned_files:
  - app.ts
  - routes/
  - middleware/
  - errors/
---

# apps/api/src/server/

## Purpose

Everything that wires HTTP requests into the domain modules: Fastify instance assembly, route registration, request/response middleware, and the canonical error-response shape.

This directory owns the **wire boundary**. Code in `modules/`, `services/`, and `repositories/` does not import Fastify; that coupling stops here.

## What goes here

- `app.ts` — Fastify app factory. Constructs the instance, registers plugins, mounts routes, applies error handler. Exposes `buildApp(deps) => FastifyInstance`. Called by the entrypoint at `apps/api/src/server.ts`.
- `routes/` — One file per resource family (`projects.routes.ts`, `scenes.routes.ts`, `versions.routes.ts`, `renders.routes.ts`, `diagnostics.routes.ts`, `shares.routes.ts`). Each file imports its module's handler functions and binds them to HTTP paths.
- `middleware/` — Cross-cutting concerns: request ID propagation, auth-token verification, request logging, rate limiting.
- `errors/` — Error classes + the error-handler hook that translates them into the canonical envelope (`{error: {code, message, details?}}`).

## What does NOT go here

- Business logic — that's `modules/` and `services/`.
- Database queries — those are `repositories/`.
- Cross-app shared types — those are `@sse/domain`.

## When to implement

The first endpoint that lands (per blueprint §13 sequence: scene CRUD + parse) brings:

1. `app.ts` (real Fastify instance)
2. `routes/scenes.routes.ts`
3. `middleware/request-id.ts`
4. `errors/error-handler.ts` + `errors/api-error.ts`

`server.ts` currently inlines a trivial Fastify instance for `/health` only; that gets refactored to use `buildApp(deps)` from `app.ts` when the second endpoint lands.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.2, §9`
- Architecture: `docs/architecture/005-api-contracts.md`
