---
purpose: Shared test fixtures — sample scenes, mock audio outputs, deterministic version data.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §14"
status: planned
planned_files:
  - scenes/
  - voice-profiles.json
  - versions/
---

# test/fixtures/

## Purpose

Synthesized fixture data reusable across integration tests. The fixtures are **deterministic and versioned** — each fixture has a fixed UUID and content hash so tests can assert against expected values.

## What goes here

- `scenes/` — Sample scene texts covering: well-formed dialogue, malformed speaker labels, mixed dialogue + stage directions, single-speaker monologue, alternating duets, dense polyvocal sections.
- `voice-profiles.json` — A small voice-profile catalog matching the seed.
- `versions/` — Pre-computed parsed-state snapshots paired with their source scene text, for use by tests that need a known-good parsed structure without running the parser.

## Loading convention

Fixtures are loaded via a typed loader function: `loadScene("alternating-duet")` returns the typed scene object. Direct `JSON.parse(fs.readFileSync(...))` is avoided so refactors don't have to grep filesystem reads.

## What does NOT go here

- Production data of any kind.
- Test-helper functions (those go in `test/utils/` if/when that exists).
- Fixtures used by exactly one test (co-locate with the test).
