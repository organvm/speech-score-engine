---
purpose: Reusable repository abstractions exposed from @sse/database. Most concrete repositories live in apps/api/src/repositories.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §5.2"
status: planned
---

# packages/database/src/repositories/

## Purpose

Concrete repositories live in `apps/api/src/repositories/` because they're API-internal. This directory holds repository abstractions that **need to be shared** with the worker or with cross-cutting database logic.

Probable inhabitants (eventually):

- `audit-event.repository.ts` — Both API and worker write audit events. Sharing the repository avoids two SQL strings for the same INSERT.
- `playback-render.repository.ts` — Worker reads and updates `playback_render` rows; API also reads them. Shared.

Until a repository is genuinely needed in both `apps/api` and `apps/worker`, keep it API-side. Premature shared placement adds dependency edges without payoff.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §5.2`
- API-side repositories: `apps/api/src/repositories/`
