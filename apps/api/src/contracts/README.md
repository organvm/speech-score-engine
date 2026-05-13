---
purpose: API-local typed contracts — request/response shapes specific to the API, not shared with web/worker.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.2"
status: planned
---

# apps/api/src/contracts/

## Purpose

TS contracts specific to the API's wire surface that **aren't shared** with `apps/web` or `apps/worker`. Most shared contracts live in `@sse/domain/contracts/` and `@sse/domain/parsing/`; this directory holds the API-internal ones that don't justify pulling into the shared package.

## What might go here

- Internal handler-to-service input/output types when those don't map cleanly to a domain contract.
- Server-sent event payload shapes (when SSE is added for render-status push).
- Webhook payload shapes (when outbound webhooks are added).

## What does NOT go here

- Anything `apps/web` or `apps/worker` needs. Move to `@sse/domain/contracts/`.
- HTTP route schemas — those are co-located with their module in `modules/<name>/<name>.schemas.ts`.

## Why this exists

If 100% of cross-service contracts went into `@sse/domain/`, that package would acquire API-specific types that confuse `apps/web` consumers and bloat the shared dependency graph. Drawing a clear "API-only" line here prevents that drift.

If this directory remains empty after the first round of implementation, fold the convention back: just put internal contracts next to the module that owns them. The directory's existence is provisional pending real use.
