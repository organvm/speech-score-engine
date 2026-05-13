# Scaffold: speech-score-engine implementation

**Authority canvas:** `dramaturgist-tuning-markdown-archive/sources/repository-blueprint-handoff-package.md` §16 ("$NEXT_LOGICAL_ARTIFACT") explicitly names this scaffold as the next artifact after the design corpus.

**Date:** 2026-05-13
**Phase:** First implementation scaffold (FRAME → SHAPE → BUILD entry)

## Goal

Turn the repo from archive-only into an executable monorepo skeleton that runs:

```
pnpm install
pnpm db:migrate     # against local docker-compose Postgres
pnpm dev            # launches web + api + worker
```

…where every file present is genuine and parseable. No 501-handlers, no `throw new Error("not implemented")`, no TODO markers, no stub functions. Endpoints that don't have logic don't get scaffolded yet.

## Stack decisions (locked)

| Concern | Choice | Reason |
|---|---|---|
| Package manager | pnpm | Blueprint §2, §11. |
| Monorepo orchestrator | Turborepo | De-facto pnpm pairing; blueprint §2 names `turbo.json`. |
| Language | TypeScript strict | Global CLAUDE.md TS preference. |
| API framework | Fastify | TS-native, fast, schema-validated by default. Blueprint doesn't force a choice. |
| Web framework | Next.js (app router) | Blueprint's `[sceneId]` dynamic-route shape and `app/auth`, `app/dashboard` directories are app-router-flavored. |
| Worker | BullMQ + ioredis | Standard Node async-job stack; matches blueprint's render-job model. |
| DB driver | pg (raw SQL migrations) | Blueprint §7: "Migration files should remain SQL-first." |
| Validation | zod | Industry standard; pairs with Fastify type providers. |
| Format/lint | Biome | Unified, fast, TS-native. |
| Dev runner | tsx | Faster than ts-node. |
| Local infra | Docker Compose: Postgres 16 + Redis 7 + MinIO | Blueprint §11. |

## Scope (the MVS — Minimum Viable Scaffold)

Each item below is "actually working code that compiles and runs," not a stub.

### Root config
- `package.json` (workspace root with `dev`, `build`, `lint`, `typecheck`, `db:migrate` scripts via Turbo)
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `.env.example` (per blueprint §10)
- `.gitignore`
- `biome.json`
- `README.md` (replaces nothing; new)

### docs/
Per blueprint §2 + §3, the spec canvases must live as durable docs under `docs/product/`. Symlink-or-copy decision: hard-copy (symlinks break on Windows + git treats them weirdly). Add ADRs per §2.

### packages/
- `packages/domain/` — TS interfaces lifted from blueprint §9.3 (SceneParserService, VersioningService, RenderDispatchService, DiagnosticsService, VoiceProviderAdapter), plus zod schemas for the parse-result shape from §9.2.
- `packages/database/migrations/0001…0006.sql` — verbatim from blueprint §7.
- `packages/database/src/client.ts` — pg pool factory.
- `packages/config/src/env.ts` — zod-validated env loader.

### apps/
- `apps/api/src/server.ts` — Fastify with `/health` (returns `{ok: true, db: 'connected'|'down'}` after a `SELECT 1` against Postgres). Nothing else.
- `apps/worker/src/index.ts` — BullMQ worker booted on the `render-scene` queue with **no jobs registered yet** — process stays alive, ready to take handlers later.
- `apps/web/` — Next.js 15 app router. Home page renders the project name + a link to the docs. Nothing else.

### infrastructure/
- `infrastructure/docker/compose.yaml` — Postgres 16 + Redis 7 + MinIO.

### .github/
- `.github/workflows/ci.yml` — install, typecheck, lint, build, migration-syntax-check.

## Non-scope (do NOT do in this pass)

- Scene parser implementation
- Version-creation transaction implementation
- Voice provider adapters
- Diagnostics generator
- Render pipeline
- Auth/sessions/share tokens
- Any UI components beyond the Next.js home page
- E2E tests, integration tests
- Anything the blueprint doesn't reach yet at this implementation depth

These are real implementation work and belong in later commits, in the order the blueprint §13 specifies.

## Execution order

1. Root configs + .gitignore + README + biome
2. Docs copy from sources/ into docs/product/
3. packages/domain (contracts + zod)
4. packages/database (migrations + pg client)
5. packages/config (env)
6. apps/api (Fastify + /health)
7. apps/worker (BullMQ idle)
8. apps/web (Next.js home)
9. infrastructure/docker/compose.yaml
10. .github/workflows/ci.yml
11. Update CLAUDE.md (transition from "archive-only" framing to "scaffold present, implementation begins")
12. `pnpm install` smoke test (verify the workspace resolves)
13. Commit + push

## Risks

- **`pnpm install` may fail in this session** because the user's local pnpm version, registry config, or network state isn't guaranteed. If it does, commit the source files anyway and surface the failure mode — the scaffold's correctness shouldn't depend on a one-shot install working in-session.
- **Biome vs ESLint** is a defensible-either-way choice. Biome is the call here; if the user pushes back, swap is mechanical.
- **The `$VARIABLE` markers in `.env.example` are blueprint-source-of-truth notation, not bash syntax.** Translating them to real bash env-var names is part of the scaffold (drop the `$` prefix).
- **Next.js 15 / React 19 release cadence** moves fast; pinning specific minor versions in the scaffold may age. Pin to caret-major and rely on the lockfile for reproducibility.

## After this scaffold

The next plan-file should cover the first vertical slice per blueprint §13: scene CRUD + parser endpoint + parse-review web flow. That's `0002-vertical-slice-scene-parse.md` or similar.
