---
purpose: Shared parameterized SQL query strings used across repositories. Optional — most queries live in their repository.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §5.2"
status: planned
---

# packages/database/src/queries/

## Purpose

A place for query strings that **multiple repositories** reuse. Most queries belong in the repository that owns them (`apps/api/src/repositories/<entity>.repository.ts`). This directory is the exception: queries that cross aggregate boundaries, or that are referenced from both a repository and a transaction helper.

## What might go here

- `version-with-lines.query.ts` — load a `scene_version` with all its `version_line` rows in one round-trip; reused by version-load and render-pipeline.
- `aggregate-diagnostics.query.ts` — complex multi-table aggregation feeding the diagnostics service.

If after the first round of implementation no queries qualify, fold this directory back — keep queries co-located with their owning repository.
