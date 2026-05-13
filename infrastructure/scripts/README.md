---
purpose: Utility scripts for local setup, environment provisioning, manual operations.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §2"
status: planned
---

# infrastructure/scripts/

## Purpose

Operational utility scripts that don't fit cleanly into npm scripts or Terraform. Things like:

- One-off local-setup helpers (`bootstrap-local-minio.sh` — create the local-dev bucket on first run).
- Migration utilities (`dump-prod-snapshot.sh`, `restore-snapshot-to-local.sh`).
- Sanity-check scripts (`check-env.sh` — verifies a `.env` file against the schema).

## Conventions

- Bash: `#!/usr/bin/env bash` + `set -euo pipefail`. Per the global CLAUDE.md.
- Quote variables: `"$var"`. Use `[[` over `[`.
- Each script has a header comment explaining what it does and when to run it.

## What does NOT go here

- Scripts npm can run via `package.json`. Those go in `package.json` (already there: `db:migrate`, `db:up`, etc.).
- One-off scripts a developer writes for personal use — keep those out of the repo.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §2`
