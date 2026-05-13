---
purpose: Web-app-local TypeScript types that aren't shared with other packages.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.1"
status: planned
---

# apps/web/src/types/

## Purpose

TS types specific to the web app that don't belong in `@sse/domain`. UI-specific shapes (component props, route-param types, navigation states), client-only enums, branded types for things like time-millisecond units in the playback context.

## What does NOT go here

- Domain types — those are `@sse/domain`.
- HTTP request/response shapes — those are `@sse/domain/contracts` or `@sse/client-sdk` re-exports.
- Component props — co-locate with the component file.

If you reach for this directory and you're not sure whether the type should be web-local or shared, default to **shared** in `@sse/domain` first; demote here only if the type genuinely never crosses the web-app boundary.
