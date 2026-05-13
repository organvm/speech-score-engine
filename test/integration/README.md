---
purpose: Integration tests — exercise multiple packages together against a real DB and mock providers.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §14"
status: planned
planned_files:
  - parsing/
  - versioning/
  - rendering/
---

# test/integration/

## Purpose

Integration tests against the real Postgres (via Docker Compose in dev, via the CI service container in CI) and **mock** voice/storage adapters. They cover the three trust areas the blueprint identifies (§14):

- `parsing/` — Parser correctness across edge cases.
- `versioning/` — Atomic version creation, immutability invariant.
- `rendering/` — Render lifecycle from queue → in_progress → completed (or failed) using `mock.adapter`.

## Tooling

Test runner: Vitest (decided when tests land; the cheap default for a TS monorepo).

Database fixture: each test isolates via a per-test transaction that rolls back, or a per-test schema, depending on parallelism needs. Decided at first test.

## What does NOT go here

- Anything touching real external APIs. Use mock adapters.
- E2E browser tests — those are `test/e2e/`.
- Unit tests — co-locate with source.
