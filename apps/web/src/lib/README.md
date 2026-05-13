---
purpose: Web-app-side utilities and integrations — API client construction, formatters, parsers for client-only concerns.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.1"
status: planned
---

# apps/web/src/lib/

## Purpose

Web-app-side utilities that aren't React hooks and aren't components. Things like:

- API client construction (one instance of `@sse/client-sdk`'s `createClient` wired with the right base URL + auth-token getter).
- Formatters for durations, dates, byte sizes.
- Client-only parsers (parse a URL hash, parse query params).
- Browser-storage helpers (localStorage wrappers with typed accessors).

## What does NOT go here

- React hooks — `hooks/`.
- React components — `components/` or `app/`.
- Cross-package utilities — those go to `@sse/ui` or a new shared package.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.1`
- Client SDK: `packages/client-sdk/`
