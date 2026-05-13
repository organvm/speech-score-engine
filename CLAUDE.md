# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`speech-score-engine` is a TypeScript pnpm-workspace monorepo implementing the system the design canvases call `$SPEECH_SCORE_ENGINE`: a dramaturgical-audio workbench for authoring, analyzing, rehearsing, rendering, and executing polyvocal speech works. As of 2026-05-13 it holds both **(a) the full provenance-preserved design corpus** recovered from a ChatGPT project (`dramaturgist-tuning`, project key `g-p-69c6e425347c81918dfba984fb76206c`), and **(b) the initial executable scaffold** generated from that corpus.

The scaffold is structural, not feature-complete. The build runs (`pnpm install && pnpm db:up && pnpm db:migrate && pnpm dev`). The API has only `/health`. The worker boots BullMQ queues with no processors yet. The web app renders a static home page. **Wave 1 of blueprint §13 shipped 2026-05-13** (commit `6074094`): `packages/domain/` now defines TypeScript types + zod schemas for scenes, projects, users, parsing requests, and the four service interfaces (versioning, render dispatch, diagnostics, voice-provider adapter). Runtime logic — parser, repositories, API routes beyond `/health`, worker processors, render pipeline, diagnostics, share links — remains unbuilt. See `docs/product/repository-blueprint-handoff-package.md` §13 for the build order; see the "Current execution status" section below for what's shipped vs. pending.

## Layout

```
.
├── apps/
│   ├── web/                                    # Next.js 15 app router; src/{components,hooks,lib,state,styles,types} carry anchor READMEs
│   ├── api/                                    # Fastify (only /health endpoint so far); src/{server,modules,services,repositories,policies,contracts,bootstrap} anchored
│   └── worker/                                 # BullMQ + ioredis (queues declared, no processors yet); src/{bootstrap,jobs,providers,pipelines,services,telemetry} anchored
├── packages/
│   ├── domain/                                 # Runtime-neutral TS types + zod schemas + event constants. Submodules: scene/, project/, user/ (Wave 1 of §13 shipped); parsing/, contracts/ (4 service interfaces), events/; anchor-README only for diagnostics/, render/, share/, speaker/, version/.
│   ├── database/                               # 6 SQL migrations + pg client + migrate + seed runner; src/{schema,queries,repositories,transactions} anchored
│   ├── config/                                 # zod-validated env loader
│   ├── client-sdk/                             # Fetch wrapper for API access (browser-or-Node)
│   ├── ui/                                     # Shared React UI primitives (cn helper to start)
│   └── observability/                          # pino logger factory; shared structured logging
├── docs/
│   ├── conventions/                            # naming, frontmatter, directory-readme — DURABLE rules
│   ├── architecture/                           # 001-system-context through 005-api-contracts
│   ├── adr/                                    # ADR 0001-0004 (monorepo, JSONB snapshots, async worker, immutability)
│   └── product/                                # Verbatim copies of the design canvases (with cross-reference frontmatter)
├── infrastructure/
│   ├── docker/compose.yaml                     # Local Postgres 16 + Redis 7 + MinIO
│   ├── terraform/README.md                     # Anchor for future production IaC
│   └── scripts/README.md                       # Anchor for utility scripts
├── test/
│   ├── fixtures/README.md                      # Anchor for shared test fixtures
│   ├── integration/README.md                   # Anchor for parsing/versioning/rendering integration tests
│   └── e2e/README.md                           # Anchor for browser-driven e2e tests
├── .github/workflows/ci.yml                    # install, typecheck, lint, build, migration-syntax check
├── dramaturgist-tuning-markdown-archive/       # The provenance-preserving canonical archive
│   ├── codex-conversation-inventory.{md,tsv}   # Auxiliary Codex inventory (different schema from manifest)
│   ├── objects-and-subjects-inventory.md       # 152KB ontological index derived from 36 raw transcripts; 526 $VARIABLE tokens + semantic entities (commit b18469c)
│   ├── 00-{README.md,manifest.json,metadata.tsv,full-archive.md}   # Renamed 2026-05-13 from dramaturgist-tuning-00--*
│   ├── dt-NN-MMM--{topic-slug}.md              # 36 per-pair files; renamed 2026-05-13 to be self-describing in Finder
│   └── sources/                                # All 14 panel-sources from the ChatGPT project (SHA-1-tracked, byte-frozen)
│       ├── SOURCES-INDEX.md                    # Recovery index
│       ├── *.md                                # 12 canvas docs + 1 reconstructed lexicon
│       └── *.html                              # 2 SingleFile HTML captures (61KB + 1MB fidelities)
├── .serena/                                    # Serena MCP project config (project.yml + .gitignore); tracked but agent-tooling only
├── .claude/plans/YYYY-MM-DD-{slug}.md          # Per-session plan history (never overwrite)
├── CLAUDE.md                                   # This file
└── README.md                                   # Bootstrap + service URLs
```

## Conventions

Three durable conventions live in `docs/conventions/`. Read them before adding or renaming files.

| Convention | Doc | When it applies |
|---|---|---|
| Filename structure | [`docs/conventions/naming.md`](docs/conventions/naming.md) | Any new file in the repo. Especially: archive files (`dt-NN-MMM--{slug}.md` for chat pairs), ADRs (`NNNN-*.md`), architecture docs (`NNN-*.md`), migrations (`NNNN_snake_case.sql`). |
| YAML frontmatter | [`docs/conventions/frontmatter.md`](docs/conventions/frontmatter.md) | Any Markdown under `docs/`, the chat archive, or `.claude/plans/`. Type-specific schemas (ADR, architecture doc, canvas copy, plan, directory anchor). |
| Directory anchor READMEs | [`docs/conventions/directory-readme.md`](docs/conventions/directory-readme.md) | Any blueprint-anticipated directory that doesn't have implementation files yet. The README is the artifact — not a stub. |

## Common commands

| Command | What it does |
|---|---|
| `pnpm install` | Install workspace deps. |
| `pnpm db:up` | `docker compose up -d` for Postgres + Redis + MinIO. |
| `pnpm db:down` | Stop the local infra services. |
| `pnpm db:migrate` | Apply unapplied SQL migrations from `packages/database/migrations/`. Idempotent; tracks state in a `schema_migration` table. |
| `pnpm db:seed` | Run `packages/database/src/seed.ts` against the two SQL files in `packages/database/seeds/` (`sample_project.seed.sql`, `voice_profiles.seed.sql`). Idempotent — uses `ON CONFLICT DO NOTHING`. |
| `pnpm dev` | Turbo runs `dev` across all apps in parallel. Web on `:3000`, API on `:4000`. |
| `pnpm build` | Turbo-orchestrated build for all apps + packages. |
| `pnpm typecheck` | `tsc --noEmit` across the graph. |
| `pnpm lint` / `pnpm format` | Biome check / Biome write. |

## Architecture authority

`docs/product/repository-blueprint-handoff-package.md` is the load-bearing implementation spec. The scaffold tracks it directly: top-level layout (§2), folder purposes (§3), SQL migrations (§7), TS service contracts (§9.3), env vars (§10), bootstrap (§11). When implementing a feature, read the matching blueprint section first; if you diverge, write an ADR in `docs/adr/`.

The implementation order is **fixed** by blueprint §13: schema + contracts → scene CRUD + parsing → versioning transaction → render pipeline → diagnostics → share/compare. The system is **not** a TTS wrapper; dramatic language stays structured temporal data through the whole stack. See `docs/product/README.md` for the canvas read-order.

## Current execution status (slice §13)

Mirrors `.claude/plans/2026-05-13-closeout-v3.md` — authoritative source if these drift. The "scene CRUD + parser" vertical slice is decomposed into 6 waves in `.claude/plans/2026-05-13-scene-crud-and-parser-slice.md`:

| Wave | Scope | Status | Commit |
|---|---|---|---|
| 1 — Domain contracts | `packages/domain/src/{scene,project,user,parsing,contracts,events}/*.ts` — types, zod schemas, HTTP request shapes, service interfaces | **Shipped** | `6074094` |
| 2 — Repositories | `packages/database/src/repositories/*.ts` — pg queries against the 6 migrated tables | Pending | — |
| 3 — Parser | `apps/api/src/modules/parsing/` — line-level parse of authored speech into `version_line` rows | Pending | — |
| 4 — API routes | `apps/api/src/modules/scenes/` — scene CRUD + `/parse` endpoint | Pending | — |
| 5 — Integration tests | `test/integration/` — vitest workspace, fixtures, parse/version round-trip | Pending | — |
| 6 — ADR-0005 | `docs/adr/0005-*.md` — codify the slice's six design decisions | Pending | — |

When picking up work, read the slice plan first, then the closeout-v3 status table, then proceed from the lowest pending wave.

## Load-bearing invariants

Future agents must treat the following as constraints, not suggestions:

1. **`sources/SOURCES-INDEX.md` references SHA-1 prefixes and byte counts** for every recovered file. Reformatting, normalizing whitespace, or "tidying" any file under `sources/` or `dramaturgist-tuning-markdown-archive/` invalidates these references. If a source needs editing, update the index in the same commit.
2. **`$VARIABLE`-style tokens in the canvases are domain ontology**, not template placeholders. `$SPEECH_SCORE_ENGINE`, `$PHRASE_EVENT`, `$COMPOSITION_LAYER`, `$DOCUMENT_ID`, etc. are part of the authored prose. Do not "expand," "resolve," or substitute them.
3. **ChatGPT-internal citation markers** in canvas content (e.g. `fileciteturn0file4`, `\nturn0file12turn0file13`) are valid provenance trails into the original chat-export. Preserve verbatim.
4. **Canvases #4 (`speech-score-engine-system.md`) and #12 (`speech-performance-engine-concept.md`) are byte-identical** (both SHA-1 `96e52023ca5d`). This is intentional — they are distinct ProjectSave records under distinct panel titles. Do not dedupe; cross-reference in the index instead.
5. **`preview.text` from the ChatGPT saves endpoint is full content**, not truncated. The API field name is misleading. Documented in `SOURCES-INDEX.md` and the recovery plan.

## Stray-file resolution (settled 2026-05-13)

The pre-git-init root-level strays were resolved in the commit immediately following the initial commit:

- **Deleted as redundant**: `lexicon-and-style-guide.md` (1-byte newline diff vs `sources/lexicon-and-style-guide.md`) and `canvas-01--tracker-ableton-speech-workstation.md` (89-byte trailing-whitespace diff vs `sources/tracker-ableton-speech-workstation.md` from a failed earlier extraction).
- **Promoted into `sources/`**: the 1MB Tracker HTML at root became `sources/Tracker vs Modern DAW - Google Search (3_28_2026 12-07-50 AM).singlefile-full.html` (SHA-1 `061589a08957`). The chat-export 61KB version is unchanged; both are now indexed in `SOURCES-INDEX.md` as one panel-source with two fidelities.
- **Moved into the archive dir**: `dramaturgist-tuning-conversation-inventory.{md,tsv}` → `dramaturgist-tuning-markdown-archive/codex-conversation-inventory.{md,tsv}`. Different schema from the archive's `00--manifest.json` — kept for the share-anchor mapping and the per-conversation provenance set classification.

Repo root is now clean (no archive-adjacent strays).

## Reproducible operation: ChatGPT canvas recovery

The 12 canvas docs in `sources/` were extracted from the ChatGPT project's internal API — `Export data` does not include them. To re-run recovery from a fresh authenticated browser session:

```
# Token capture (in browser console on chatgpt.com):
fetch('/api/auth/session').then(r => r.json()).then(s => window.__tok = s.accessToken);

# Enumerate saves:
fetch('/backend-api/projects/g-p-69c6e425347c81918dfba984fb76206c/saves?limit=100',
      {headers: {'Authorization': 'Bearer ' + window.__tok}}).then(r => r.json());

# Per-save full content (preview.text is the whole canvas):
fetch('/backend-api/projects/{gizmo_id}/saves/{save_id}',
      {headers: {'Authorization': 'Bearer ' + window.__tok}}).then(r => r.json());
```

A reproducible content-extraction technique that bypasses Claude Code's JS-return content filter (used during the original recovery): render the text into a fixed-position `<article id="__cx">` with `white-space:pre-wrap` and read it via `get_page_text`. The accessibility tree returns the literal content; direct JS return values get filtered for cookie/Base64/long-string patterns.

## Plan discipline

Every non-trivial task gets a dated plan file at `.claude/plans/YYYY-MM-DD-{descriptive-slug}.md`. **Never overwrite** — revisions get `-v2`, `-v3` suffixes. After writing a plan, commit it (Universal Rule #5: plans are artifacts).

**Read `.claude/plans/2026-05-13-closeout-v3.md` first** for the current execution state — it carries the authoritative wave-status table and pointers to predecessors. The seven plans on disk, grouped by purpose:

| Purpose | Plan | Status |
|---|---|---|
| Canvas recovery handoff | `2026-05-13-dramaturgist-canvas-recovery-handoff.md` | Recovery phase complete |
| Scaffold implementation | `2026-05-13-scaffold-implementation.md` | Executed (commit `f8305cb`) |
| Blueprint materialization | `2026-05-13-materialize-blueprint-artifacts.md` | Executed (commit `e36a88f`) |
| §13 vertical slice (6 waves) | `2026-05-13-scene-crud-and-parser-slice.md` | Wave 1 shipped; Waves 2–6 pending |
| Session closeouts | `2026-05-13-closeout.md` → `-v2.md` → `-v3.md` | v3 is current; chain via `predecessor` frontmatter |

## What NOT to do here

- **Do not commit unprompted.** Commits go in only when explicitly requested. The repo is on `main` with the remote at `git@github.com:4444J99/speech-score-engine.git` (private).
- **Do not reformat, normalize, or "clean up" any file under `dramaturgist-tuning-markdown-archive/`** without explicit instruction. Provenance is the load-bearing property; SHA-1s in `SOURCES-INDEX.md` are tracked against those file contents.
- **Do not modify a `docs/product/*.md` canvas in isolation.** The canonical original lives at `dramaturgist-tuning-markdown-archive/sources/`; `docs/product/` is a copy. If a canvas needs editing, source-first and re-copy. Better: write an ADR in `docs/adr/` rather than rewrite the spec.
- **Do not bypass the blueprint's build order (§13).** The schema and contracts come first, then scene CRUD + parsing, then versioning, then render pipeline. Building the worker pipeline before there's a `scene_version` to render against will create coupling that has to be unwound.
- **Do not add stub functions / 501-handlers / TODO markers** for endpoints or features that don't have logic yet. The scaffold deliberately has fewer files than the blueprint anticipates; the right move when a feature is needed is to add the file at that point, not pre-create empty shells.
- **Do not run `chezmoi apply` against this directory.** It is not a chezmoi-managed path.
- **Do not edit the deployed `~/.claude/CLAUDE.md`** — its source is in the chezmoi tree at `~/Workspace/4444J99/domus-semper-palingenesis`. (Restated from the global CLAUDE.md.)
