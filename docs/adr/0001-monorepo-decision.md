# ADR 0001: Modular monorepo with pnpm + Turborepo

**Status:** Accepted
**Date:** 2026-05-13

## Context

The system has three deployable surfaces (browser client, application API, async render worker) plus several shared concerns (domain contracts, database schema, environment config). Per `docs/product/repository-blueprint-handoff-package.md` §1, the early-development reality is that these surfaces evolve together: shared TS types, contract changes, schema changes, and event-name changes all cross the surface boundaries on the same day.

## Decision

A modular monorepo using pnpm workspaces with Turborepo orchestration.

- `apps/{web,api,worker}` for the deployable surfaces.
- `packages/{domain,database,config}` for shared internal concerns.
- pnpm for workspace + dependency hoisting and lockfile reproducibility.
- Turborepo for task graph orchestration (build, dev, typecheck, lint).

Service boundaries are preserved as package boundaries — each `packages/*` exports only what's intentionally shared. Later extraction to separate repositories remains mechanically possible if the surfaces' lifecycles diverge.

## Alternatives considered

- **Multi-repo from day one.** Rejected: would duplicate the domain contracts and force coordinated cross-repo PRs for every contract evolution during the period when those evolutions are most frequent.
- **Nx instead of Turborepo.** Rejected for now: Nx is more featureful but heavier; the project doesn't currently need its generator infrastructure or its plugin ecosystem.
- **A monolithic single-package repo.** Rejected: the web/api/worker split is real (different runtimes, different deployment targets) and collapsing it would obscure the service boundaries the system needs to preserve as it grows.

## Consequences

- The lockfile and `node_modules` hoisting strategy is the source of truth for dependency resolution.
- Each package gets its own `package.json` and `tsconfig.json` extending `tsconfig.base.json`.
- Cross-package imports go through workspace protocol (`workspace:*`).
- CI builds the whole graph; per-surface deployment pipelines filter on changed packages downstream.

## Revisit if

- Build times under Turborepo exceed ~10 minutes locally.
- Two or more deployable surfaces diverge in language/runtime (e.g., the worker is rewritten in Rust).
- Independent open-sourcing of a single package becomes a goal.
