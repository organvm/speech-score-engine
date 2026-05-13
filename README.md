# speech-score-engine

A dramaturgical-audio workbench. Treats dialogue as **polyvocal speech score** — text, timing, recurrence, vocal distribution, and spatial notation interoperable across analog and digital forms.

The system is **not a text-to-speech wrapper**. The primary domain unit is the `$PHRASE_EVENT`: a bounded utterance with semantic content, speaker assignment, temporal position, duration behavior, and relational status to other phrase-events. Temporal structure is first-class.

## Status

This is a fresh scaffold of an executable monorepo skeleton. The canonical design corpus is preserved verbatim under `docs/product/` and at higher source-of-truth fidelity under `dramaturgist-tuning-markdown-archive/sources/`. See `CLAUDE.md` for repository conventions and provenance invariants.

What's wired up right now:

- A pnpm + Turborepo monorepo: `apps/{web,api,worker}` + `packages/{domain,database,config}`.
- 6 SQL migrations covering users, projects, scenes, speakers, voice profiles, scene versions + version lines, render profiles + playback renders, diagnostic reports + share links, and audit events. (Per `docs/product/repository-blueprint-handoff-package.md` §7, verbatim.)
- A Fastify API with a single `/health` endpoint that pings the database.
- A BullMQ worker process that boots cleanly on the `render-scene` queue with no handlers yet.
- A Next.js 15 web app rendering a project home page.
- Docker Compose for local Postgres 16 + Redis 7 + MinIO.
- A CI workflow for typecheck, lint, build, and migration-syntax check.

What's intentionally NOT yet implemented (these are the next vertical slices, in blueprint §13 order):

1. Scene parsing
2. Version creation transaction
3. Render pipeline + voice provider adapters
4. Diagnostics generator
5. Share links + version comparison

## Prerequisites

- Node 22+
- pnpm 9+
- Docker (for local Postgres / Redis / MinIO)

## Bootstrap

```bash
cp .env.example .env       # adjust as needed
pnpm install
pnpm db:up                 # docker compose: Postgres + Redis + MinIO
pnpm db:migrate            # runs the 6 SQL migrations
pnpm dev                   # launches web + api + worker via Turbo
```

After `pnpm dev`:

| Service | URL |
|---|---|
| Web | http://localhost:3000 |
| API | http://localhost:4000 |
| API health | http://localhost:4000/health |
| MinIO console | http://localhost:9001 |

## Repository layout

```
.
├── apps/
│   ├── web/          # Next.js 15 app router — browser client
│   ├── api/          # Fastify — application API
│   └── worker/       # BullMQ — asynchronous render worker
├── packages/
│   ├── domain/       # TS contracts + zod schemas — the conceptual heart
│   ├── database/     # SQL migrations + pg client + transaction helpers
│   └── config/       # zod-validated typed env loader
├── infrastructure/
│   └── docker/       # compose.yaml for local infra
├── docs/
│   ├── product/      # canonical design canvases (verbatim from sources/)
│   └── adr/          # architecture decision records
├── dramaturgist-tuning-markdown-archive/
│   ├── sources/      # canvas docs (source-of-truth, SHA-1-tracked)
│   └── *.md          # 36 prompt-response pairs from the design conversation
├── .claude/
│   └── plans/        # dated implementation plans (never overwritten)
├── CLAUDE.md         # repo conventions for Claude Code sessions
└── README.md
```

## Architecture in one paragraph

(From `docs/product/repository-blueprint-handoff-package.md` §15 verbatim.) Build this as a modular monorepo with `apps/web`, `apps/api`, and `apps/worker`, backed by shared `packages/domain`, `packages/database`, `packages/client-sdk`, `packages/config`, and `packages/observability`. The database must preserve a strict split between mutable `scene` state and immutable `scene_version` snapshots, with normalized `version_line` rows and atomic version-creation transactions. The API owns parsing, persistence, versioning, diagnostics orchestration, and render-job submission; the worker owns asynchronous audio rendering through provider adapters and artifact storage. Implement in sequence: schema and contracts first, then scene import and parse review, then versioning, then render pipeline and playback, then diagnostics and share flows. Do not let the system collapse into generic TTS architecture; preserve dramatic language as structured temporal data across schema, services, events, and UI.

## License

Unlicensed (private).
