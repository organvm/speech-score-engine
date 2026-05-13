---
adr_id: "0002"
title: "Use Postgres JSONB for parsed-state and settings snapshots alongside normalized version_line rows"
status: accepted
date: "2026-05-13"
deciders: ["Anthony Padavano"]
---

# ADR 0002: Postgres JSONB for parsed-state and settings snapshots alongside normalized version_line rows

## Context

A `scene_version` row holds an immutable snapshot of a scene. The snapshot has two natural representations:

- A whole-document JSON blob (the parsed structure with all speakers, lines, settings).
- A normalized set of rows — one per line — that can be filtered, indexed, joined.

Both views have legitimate consumers in the system:

- The editor / compare / version-load endpoint wants the whole document at once.
- Diagnostics, line-range renders, speaker-filtered queries want the normalized rows.

Three options were considered.

## Options considered

### Option A — JSONB only

Store everything in one `parsed_state_snapshot` JSONB column. Every query reads the whole document and filters in application code or Postgres JSON operators.

**Pros:**
- Simple schema. One row per version.
- Atomic write is trivial (one INSERT).
- Whole-document reads are fastest.

**Cons:**
- Line-level queries (diagnostics, range renders) become awkward — Postgres JSON operators are fine but indexing inside JSONB is limited compared to native columns.
- Aggregations across many versions' lines (analytics) are slow.
- No FK from `version_line.speaker_id` → `speaker.speaker_id`; speaker integrity becomes application-level only.

### Option B — Normalized rows only

Store everything in `version_line` rows. Reconstruct the JSON-shaped parse_state at read time by joining + aggregating.

**Pros:**
- Clean third-normal form. Strong referential integrity.
- All queries are SQL-native.
- Single source of truth for line-level data.

**Cons:**
- The most common read (load the whole version) becomes an N+1 in disguise: N row reads + reconstruction. With version-sizes in the hundreds of lines, this matters.
- The JSON-shape API contract requires reassembly on every read. Application code carries this complexity.
- Update patterns (which don't apply here — versions are immutable — but matter for `scene.parsed_state_current`) get hairy.

### Option C — Both (the chosen option)

Store both `parsed_state_snapshot` JSONB **and** normalized `version_line` rows. Write both in the same transaction.

**Pros:**
- Fast whole-document reads via JSONB.
- Fast line-level queries via the normalized rows.
- Referential integrity for `version_line.speaker_id` → `speaker.speaker_id`.
- The duplication is *intentional and bounded* — only at version creation, and never updated afterward.

**Cons:**
- Storage cost is roughly doubled (the data appears twice).
- Two write paths in the create-version transaction.
- Risk of representations diverging if the transaction is implemented sloppily — but immutability prevents post-write drift.

## Decision

**Option C.**

The duplication is safe because of the version-immutability invariant (see ADR 0004). The performance gains on both read patterns outweigh the storage cost. The integrity-via-FK is a real benefit for speaker-level queries.

## Consequences

### Required

- `packages/database/src/transactions/create-scene-version.transaction.ts` (when implemented) must write both representations atomically in one transaction. Partial writes would produce a divergent state that the system has no recovery path for.
- The `parsed_state_snapshot` and the reassembled `version_line` rows must be byte-identical at creation time. A test must assert this invariant against any non-trivial version (the integration test suite in `test/integration/versioning/` will own this).

### Not required (drift is impossible)

- We do NOT need triggers or constraints to keep the two representations in sync over time. The versions are immutable.

### Storage

- Expect ~1.8–2.2× the storage of the leaner option. For a system holding tens of thousands of versions of scenes with hundreds of lines, this is well within ordinary Postgres scale.

### What this enables

- Diagnostic generation (`apps/api/src/services/diagnostics.service.ts`, planned) reads `version_line` rows directly with line-index ordering, speaker-grouped aggregations, and run-length analysis without parsing JSON.
- The compare view (`apps/web/src/app/scenes/[sceneId]/compare/`) can fetch both versions as whole documents in two queries, then diff client-side.
- Line-range renders pull only the lines they need via index-range filter.

## Revisit if

- Storage cost becomes a real concern (versions in the millions, line counts in the thousands per version).
- A schema migration changes the parsed-state shape such that backward-fill of old JSONB into new normalized rows becomes too costly.
- A new query pattern emerges that neither representation serves well — at which point a third materialized view might join the pair.

## Related

- ADR 0004 (scene-version immutability) — the load-bearing reason this duplication is safe.
- Architecture doc 002-domain-model — the entity-level view.
- Migration `0003_add_scene_versions_version_lines.sql` — where both representations are declared.
