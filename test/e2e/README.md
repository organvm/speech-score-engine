---
purpose: End-to-end browser-driven tests covering the full scene-hearing loop.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §14"
status: planned
planned_files:
  - scene-hearing-loop/
---

# test/e2e/

## Purpose

End-to-end tests that drive the running web app (Next.js dev server or production build) against a real API + worker stack, with mock voice/storage adapters at the edges.

The canonical e2e flow (blueprint §14): import scene → review parse → save version → render → play. If this passes, the system is end-to-end functional.

## Tooling

Likely Playwright. Decided when tests land.

## Conventions

- Each e2e test brings up its own stack (or uses a shared pre-warmed one).
- All external integrations are mocked at the adapter layer; e2e tests verify **system flow**, not provider behavior.
- E2e tests are slow. Keep them few and high-signal: cover the loops that integration tests can't cover (real browser, real network, real Fastify, real BullMQ).

## What does NOT go here

- Unit or integration tests — those are elsewhere.
- Anything that depends on a live external API (real ElevenLabs, real S3) — use mocks.
