---
purpose: Cross-package integration and end-to-end tests + shared fixtures.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §2, §14"
status: planned
---

# test/

## Purpose

This is the **cross-package** test root — tests that exercise multiple apps or packages together. Single-package unit tests live next to their source files (`foo.ts` + `foo.test.ts`).

Per blueprint §14, the system must encode trust in three areas:

1. **Parsing trust** — `test/integration/parsing/`. Common dialogue shapes, malformed labels, blank lines, stage directions, duplicate-speaker normalization.
2. **Version integrity** — `test/integration/versioning/`. Snapshot immutability, exact line preservation across create-version operations.
3. **Render lifecycle correctness** — `test/integration/rendering/`. Render request, status transitions, completion persistence, asset-link attachment — all testable without real provider calls via mock adapters.

Plus end-to-end:

- `test/e2e/scene-hearing-loop/` — A scripted user flow: import scene → review parse → save version → render → play.

## Subdirectories

| Path | Purpose |
|---|---|
| `test/fixtures/` | Shared fixtures (sample scenes, sample versions, mock voice-render outputs) used by integration + e2e tests. |
| `test/integration/parsing/` | Parser tests against ground-truth scene texts. |
| `test/integration/versioning/` | Atomic-version-creation tests + immutability assertions. |
| `test/integration/rendering/` | Render-pipeline tests using the mock voice adapter. |
| `test/e2e/` | Browser-driven e2e tests (Playwright when adopted). |

## What does NOT go here

- Per-module unit tests — co-locate with source.
- Production data fixtures — never. Use synthesized data.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §14`
