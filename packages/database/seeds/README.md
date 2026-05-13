---
purpose: SQL seed files for local development — voice profiles catalog + a sample project for trying the system end-to-end.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §5.2"
status: scaffolded
planned_files:
  - voice_profiles.seed.sql
  - sample_project.seed.sql
---

# packages/database/seeds/

## Purpose

Idempotent SQL seeds that populate a fresh database with development data. Two seeds exist:

- `voice_profiles.seed.sql` — a curated voice-profile catalog so the API can offer voice options out of the box. Includes one `mock` provider voice (used by tests and demo) plus a few human-readable example slots for real provider voices once those are wired.
- `sample_project.seed.sql` — a single demo user + project + scene + speakers, so a developer doing `pnpm db:seed` after `pnpm db:migrate` has something to point the web app at.

## Conventions

- **Idempotent.** Re-running the seed file must not fail (use `ON CONFLICT DO NOTHING` or pre-checks). The seed runner runs both files on every `pnpm db:seed` invocation.
- **Stable IDs.** Use fixed UUIDs so the same row IDs appear across resets — makes it easy to bookmark demo URLs.
- **Idempotent ordering.** Voice profiles first (referenced by speakers), then project, then scene, then speakers.

## Running

```
pnpm db:seed
```

(Defined in root `package.json`, calls into `@sse/database`'s seed runner.)

## What does NOT go here

- Test fixtures — those are `test/fixtures/`.
- Production data — never. Seeds are dev-only.
