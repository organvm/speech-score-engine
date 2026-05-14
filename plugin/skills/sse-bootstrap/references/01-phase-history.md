---
title: Phase-level history of the speech-score-engine bootstrap
snapshot_commit: 6adde86
generated_at: 2026-05-14T14:38:35Z
source: human-curated narrative; git log --reverse + .claude/plans/ as anchors
generated_by: hand-written; only frontmatter is touched by snapshot-state.sh
---

# Phase-level history of the speech-score-engine bootstrap

The 11 commits from `bba6f71` to `6adde86` group into seven phases. Each phase below names what it produced, which commits realized it, the plan that governed it, and the durable artifacts that came out of it. Read top-to-bottom for the narrative arc; read alongside [02-commit-log.md](02-commit-log.md) for per-commit detail and [03-plan-log.md](03-plan-log.md) for the deliberation record.

---

## Phase 1 — ChatGPT canvas recovery + archive creation

**Commits**: `bba6f71` (2026-05-13, initial commit).
**Governing plan**: `2026-05-13-dramaturgist-canvas-recovery-handoff.md`.

The repo did not begin life as code. It began as a forensic recovery exercise: a ChatGPT project called `dramaturgist-tuning` (project key `g-p-69c6e425347c81918dfba984fb76206c`) held 14 panel-sources — 2 file uploads and 12 canvas docs — that the project's `Export data` feature did not include. Canvas content lives behind the `/backend-api/projects/{id}/saves` endpoint, separate from the conversation-export endpoint.

What this phase produced:

- `dramaturgist-tuning-markdown-archive/sources/` — 14 panel-sources, byte-frozen, SHA-1-tracked. The `SOURCES-INDEX.md` is the manifest of what was recovered, where each file came from in the chat-export, and what its SHA-1 prefix is.
- `dramaturgist-tuning-markdown-archive/00-{README,manifest,metadata,full-archive}` and 36 per-pair `dt-NN-MMM--{slug}.md` files — the structural archive layer wrapping the byte-frozen sources.
- A documented recovery procedure (now in the project root `CLAUDE.md` under "Reproducible operation: ChatGPT canvas recovery") that includes a workaround for Claude Code's JS-return content filter: render the canvas content into a fixed-position `<article id="__cx">` with `white-space:pre-wrap` and read via `get_page_text`.

Two load-bearing invariants emerged here and have been respected ever since:

1. **`preview.text` is full content, despite its name.** The API field is misleadingly named — for these canvas saves it contains the whole canvas, not a truncated preview.
2. **Canvases #4 and #12 are byte-identical** (both 7,574 bytes, SHA-1 `96e52023ca5d`). Same source message in conversation `69c6e938-f0b8-832b-9f51-361505af6b25`; two ProjectSave records over the same content; different human-readable titles. Cross-referenced in `SOURCES-INDEX.md`; not deduplicated.

This phase ends with a 62-file initial commit (27,577 insertions) — most of the volume is the archive's full-prompt-response transcript and per-pair markdown — and an authoritative archive whose SHA-1 prefixes are tracked references the rest of the repo can verify against.

---

## Phase 2 — Stray resolution + provenance reconciliation

**Commits**: `7437f80` (2026-05-13, "Resolve root-level stray files post-recovery").
**Governing plan**: none — resolved in-flight; rationale is in the commit message and `CLAUDE.md`'s "Cross-cluster artifact drift" section.

Three files existed at repo root before `git init`: `lexicon-and-style-guide.md` (newline-diff duplicate of the archive copy), `canvas-01--tracker-ableton-speech-workstation.md` (whitespace-diff duplicate), and a 1 MB Tracker HTML SingleFile capture. The recovery had pulled the chat-export's 61KB version into `sources/` as canonical; the 1 MB local capture was the higher-fidelity sibling.

Resolution: the duplicates were removed; the 1 MB HTML was promoted into `sources/` as the full-fidelity sibling (`.singlefile-full.html`); `SOURCES-INDEX.md` was updated to reflect the two-fidelity entry. The byte-freeze invariant survived intact — every SHA-1 prefix in the index continues to match its file.

This phase establishes the **stray-resolution etiquette**: when files appear at repo root from cross-tool spillover, SHA-256 verify against the archive counterpart, classify by cluster destination (per the cluster's data-governance SOP), and never rename without authorization. The etiquette becomes a Recovery-from-Common-Deviations entry in Phase 7.

---

## Phase 3 — Scaffold generation

**Commits**: `f8305cb` (2026-05-13, "Scaffold: monorepo skeleton tracking blueprint §16").
**Governing plan**: `2026-05-13-scaffold-implementation.md`.

This is the phase that turns the archive from a corpus into a buildable monorepo. The blueprint canvas — `docs/product/repository-blueprint-handoff-package.md`, copied verbatim from `dramaturgist-tuning-markdown-archive/sources/repository-blueprint-handoff-package.md` — names the layout (§2), folder purposes (§3), service boundaries (§6), migration shapes (§7), HTTP contracts (§9.2), service interfaces (§9.3), env vars (§10), bootstrap (§11), CI/CD (§12), and the build order (§13).

What this phase produced:

- `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `biome.json`, `tsconfig.base.json` — workspace tooling.
- `apps/{web,api,worker}/` — three application targets.
- `packages/{domain,database,config,client-sdk,ui,observability}/` — six shared packages.
- `infrastructure/docker/compose.yaml` — Postgres 16 + Redis 7 + MinIO.
- `.github/workflows/ci.yml` — install / typecheck / lint / build / migration-syntax check (no test runner wired — that comes with Wave 5).
- `README.md` — service URLs and bootstrap commands.

**Section-numbering note**: the commit message references "blueprint §16" but §16 is `$NEXT_LOGICAL_ARTIFACT` (verified 2026-05-14: `grep -n "^## " docs/product/repository-blueprint-handoff-package.md`). The load-bearing build-order section is §13 `$IMPLEMENTATION_ORDER_INSIDE_THE_REPO`. The §16 reference in the commit message appears to be a numbering slip; subsequent docs (`CLAUDE.md`, the slice plan) consistently cite §13.

At end of phase, `pnpm install && pnpm db:up && pnpm db:migrate && pnpm dev` runs cleanly: web on `:3000`, API on `:4000`, worker boots BullMQ queues (no processors yet). The API has only `/health`. The scaffold is structural, not feature-complete — intentionally.

---

## Phase 4 — Blueprint materialization

**Commits**: `e36a88f` (2026-05-13, "Materialize blueprint-anticipated artifacts; reform filenames + frontmatter").
**Governing plan**: `2026-05-13-materialize-blueprint-artifacts.md`.

Phase 3 produced a skeleton; Phase 4 fleshes it out to the level the blueprint anticipates without writing feature code. The deliberate scope: anchor READMEs, durable conventions, ADRs, migrations.

What this phase produced:

- **Anchor READMEs** across every blueprint-anticipated directory that does not yet have implementation files. The convention: the README is the artifact, not a stub. See `docs/conventions/directory-readme.md`.
- **Three durable conventions** in `docs/conventions/`:
  - `naming.md` — filename structure rules (`dt-NN-MMM--{slug}.md` for chat pairs, `NNNN-*.md` for ADRs, `NNN-*.md` for architecture docs, `NNNN_snake_case.sql` for migrations).
  - `frontmatter.md` — type-specific YAML schemas (ADR, architecture doc, canvas copy, plan, directory anchor).
  - `directory-readme.md` — the anchor-README convention itself.
- **Five architecture docs** under `docs/architecture/`: `001-system-context` through `005-api-contracts`.
- **Four ADRs** under `docs/adr/`:
  - `0001-*.md` — monorepo with pnpm + Turbo.
  - `0002-*.md` — JSONB snapshots for scene_version content.
  - `0003-*.md` — async worker via BullMQ for render dispatch.
  - `0004-*.md` — migrations are immutable once applied.
- **Six SQL migrations** under `packages/database/migrations/`:
  - `0001_init_users_projects_scenes.sql`
  - `0002_add_speakers_voice_profiles.sql`
  - `0003_add_scene_versions_version_lines.sql`
  - `0004_add_render_profiles_playback_renders.sql`
  - `0005_add_diagnostic_reports_share_links.sql`
  - `0006_add_audit_events.sql`
- **Verbatim canvas copies** under `docs/product/` with cross-reference frontmatter back to `dramaturgist-tuning-markdown-archive/sources/`. The `sources/` tree stays byte-frozen; `docs/product/` is the working copy with frontmatter.

At end of phase, the repo has the full set of structural artifacts the blueprint anticipates, but no feature code. The next move is the first vertical slice.

---

## Phase 5 — Slice plan + ontology inventory

**Commits**: `916472c` (closeout v1, 2026-05-13), `672ecf3` (slice plan, 2026-05-13), `b18469c` (ontology inventory, 2026-05-13).
**Governing plans**: `2026-05-13-closeout.md`, `2026-05-13-scene-crud-and-parser-slice.md`.

This phase is deliberation, not implementation. Three things happened:

1. **First session closeout** (`916472c`). The session that produced Phases 1-4 closed out with a triple-ref audit: every artifact produced, every rule discovered, every N/A named. The closeout becomes the format for every subsequent session-end ritual in this repo.

2. **§13 slice plan authored** (`672ecf3`). Blueprint §13 step 1 — "build the database package, domain contracts, and API routes for users, projects, scenes, and parsing" — was cut into six executable waves:
   - Wave 1 — Domain contracts (zod schemas, request/response shapes).
   - Wave 2 — Repositories (function-based, taking `Pool`/`PoolClient`).
   - Wave 3 — Parser (line-by-line state machine in `apps/api/src/modules/parsing/`).
   - Wave 4 — API routes (Fastify + `@fastify/type-provider-zod`).
   - Wave 5 — Integration tests (vitest + service-container Postgres).
   - Wave 6 — ADR-0005 (dev-auth header + function-based repositories + validation-at-both-boundaries).
   The plan also names six explicit decisions (dev user identification, parser strategy, repository pattern, validation boundary, error shape, parser idempotence) and proposes defaults for each.

3. **Ontology inventory** (`b18469c`). Objects and subjects derived from the raw transcripts — what the corpus actually names as first-class entities. The inventory becomes a check on later implementation: a parser that emits a `ParsedSceneSpeaker` consistent with the ontology, not a generic `Speaker`.

At end of phase, the next session has a plan it can pick up and execute without re-deliberating.

---

## Phase 6 — Wave 1 implementation + audit

**Commits**: `6074094` (Wave 1, 2026-05-13), `6bbd5dc` (recovery commit, 2026-05-13), `47451d7` (closeout v3, 2026-05-13).
**Governing plan**: `2026-05-13-closeout-v3.md` (which inherits the slice plan from Phase 5).

The first session that picks up the slice plan implements Wave 1 — domain contracts:

- `packages/domain/src/scene/scene.schemas.ts` gains `sceneSchema` (entity).
- `packages/domain/src/scene/scene.requests.ts` (new) holds `CreateSceneRequest`, `UpdateSceneRequest`, `SceneResponse`, `ListScenesResponse`.
- `packages/domain/src/project/` (new dir) gets `project.types.ts`, `project.schemas.ts`, `project.requests.ts`, `index.ts`.
- `packages/domain/src/user/` (new dir) gets `user.types.ts`, `user.schemas.ts`, `index.ts`.
- 8 new files, 4 modified. Purely additive. 124 insertions, 0 deletions.

During the closeout, two pre-existing Universal Rule #2 violations are caught and recovered:

- `2026-05-13-closeout-v2.md` had been authored in a prior session but never committed (local-only). Recovery commit `6bbd5dc` tracks it byte-identical.
- `.serena/project.yml` had been generated by Serena MCP but never committed. Same commit tracks it.

The closeout (commit `47451d7`) runs the **10-index audit** — every registry the meta-organvm system tracks, applied to this repo. The audit produces an explicit naming of the repo's identity scheme: this repo is **outside** the meta-organvm `IRF-XXX-NNN` / `DONE-NNN` universe. The closure model is **SHA-correspondence** — commits and plans correspond by SHA, not by foreign-key ID. This becomes the repo's permanent governance posture.

The N/A-vacuum log catalogs gaps that need explicit decisions but don't block Wave 2: GitHub issues for the slice waves (deferred), IRF enrollment (deferred), `$PROMPT_READYNESS_CHECKLIST` definition (deferred), CI test job (rolled into Wave 5).

At end of phase, Wave 1 is done. Waves 2-6 are open. The repo's identity scheme (SHA-correspondence) is declared and enforced.

---

## Phase 7 — Cluster reframe + cross-tool etiquette

**Commits**: `6adde86` (2026-05-14, "Reframe CLAUDE.md as cluster-aware; archive SSE-ontology derivations").
**Governing plan**: `2026-05-14-cluster-route-speech-score-strays-into-agent-ontology.md` (home-scope copy: `~/.claude/plans/drifting-sprouting-ripple.md`).

During a cross-tool search for potentially-deleted plans and transcripts, the user pulled 20 untracked files into this repo's root from various AI-tool persistence trees (`~/.local/share/{opencode,gemini}/`, `~/.codex/`, `~/Downloads/<chatgpt-export>/`, `~/.claude/`). A SHA-256 sweep confirmed 18 of 20 were unique to this repo's root (created here by tool invocations, not migrated from a recoverable elsewhere). The 2 exceptions were byte-identical to existing archive copies.

What this phase produced:

- **`CLAUDE.md` reframed as cluster-aware.** The repo is one of three active workspaces in a cluster: `composition-1-2`, `_agent-ontology`, and this one. The cluster's canonical governance home is `/Users/4jp/Code/_agent-ontology` — its 8-phase audit protocol (`docs/PROTOCOL.md`) and data-governance SOP (`conventions/data-governance-sop.md`) are now cited as authority when classifying spillover here.
- **Cross-cluster artifact-drift etiquette** named in `CLAUDE.md`:
  1. Classify by cluster destination first, not by `.gitignore` default. Cross-tool audit material → `_agent-ontology/sessions/` or `archives/`. SSE domain extractions → `dramaturgist-tuning-markdown-archive/derived/`. Only `.gitignore` as last resort.
  2. Verify before deleting — SOP §4.2 requires SHA-256 match against the archive counterpart.
  3. Never rename without authorization. Filename collisions are first-class data, not bugs to deduplicate.
  4. Tool-spillover prevention: when adding new tooling that writes to repo root, add the prefix to `.gitignore` BEFORE running it.
- **SSE-ontology derivations archived** — the speech-score-engine-specific domain extractions from the recovery activity are routed into `dramaturgist-tuning-markdown-archive/derived/`.

At end of phase (and as of the snapshot this reference is pinned against), the repo is cluster-aware, the spillover etiquette is durable, and the bootstrap arc is closed. The §13 slice has 5 waves remaining; new work picks up from there.

---

## What did NOT happen in any of these phases

Naming this so future agents do not assume the repo carries these:

- **No test runner.** No vitest, playwright, or other test framework. The `test/{fixtures,integration,e2e}/` directories hold anchor READMEs only. Wave 5 of the slice introduces it.
- **No authentication.** The slice plan names `X-User-Id` header + `DEV_USER_ID` env default as the placeholder; real auth is post-slice.
- **No frontend feature code.** `apps/web/` renders a static home page. The Wave 2 of §13 (which is step 2 of the blueprint's six-step build order) introduces scene-import UI.
- **No IRF enrollment.** Deliberate. This repo is outside the meta-organvm work registry; SHA-correspondence is the chosen identity scheme.
- **No LaunchAgents anywhere.** Universal Rule #9. On-demand CLI only.
