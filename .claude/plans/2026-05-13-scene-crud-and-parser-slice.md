# Vertical slice: scene CRUD + parser endpoint

**Authority canvas:** `docs/product/repository-blueprint-handoff-package.md` §13 step 1 — "build the database package, domain contracts, and API routes for users, projects, scenes, and parsing." Test acceptance is bounded by §14 pillar 1 ("parsing trust").

**Date:** 2026-05-13
**Phase:** First implementation slice after scaffold (BUILD entry).
**Predecessor plans:** `2026-05-13-scaffold-implementation.md` (scaffold), `2026-05-13-materialize-blueprint-artifacts.md` (anchor READMEs + contracts).

---

## Goal

Cut the smallest end-to-end-runnable slice that proves the full stack works against real data: a seeded dev user → a project → a scene → a parsed scene state, all persisted and retrievable through HTTP.

When this slice ships, a developer can:

```bash
# Seed a dev user + sample project (one-time)
pnpm db:seed

# Create a scene under the seeded project
curl -X POST localhost:4000/projects/<projectId>/scenes \
  -H 'content-type: application/json' \
  -d '{ "title": "Test scene", "rawText": "ALICE: Hello.\nBOB: Hi." }'

# Parse it
curl -X POST localhost:4000/scenes/<sceneId>/parse

# Fetch the parsed state
curl localhost:4000/scenes/<sceneId>
```

…and the `parsed_state_current` column in `scene` holds the structured `ParsedSceneState`.

This slice **does not** include: web UI, scene versioning (the immutable snapshot transaction), rendering, diagnostics, share links, or real authentication. Those follow in blueprint-order subsequent slices.

---

## Out of scope (named explicitly)

| Deferred concern | Why deferred | Where it lands |
|---|---|---|
| Authentication / JWT / session | Adds complexity orthogonal to the data-shape proof. | Future slice; blueprint §6 names `$SERVICE_02_APPLICATION_API` as the auth owner but doesn't fix when. |
| Web UI for scene import / parse review | §13 step 2, not step 1. | Next slice after this one. |
| Versioning (scene → scene_version snapshot transaction) | §13 step 3. The slice deliberately stops at mutable `scene.parsed_state_current`. | Slice after the web UI. |
| Multi-user authorization / project membership | Single seeded dev user makes the auth question moot for now. | Tracked in scope-deferral note in the API README. |
| Speakers as first-class entities (separate `speaker` table writes) | The parser emits `ParsedSceneSpeaker` into JSONB; promoting to the `speaker` table is a join-and-FK step that doesn't change the parsed-data shape. | Versioning slice (when `version_line.speaker_id` FK becomes load-bearing). |

---

## Decisions to make before implementation

These need explicit calls. Default proposed in each row; revisit if the implementing session has a reason to differ.

| Decision | Proposed default | Open alternative |
|---|---|---|
| **Dev user identification** | Seed a fixed-UUID `dev@local` user via `pnpm db:seed`; routes read user via `X-User-Id` header with the seeded UUID as default. | Alternatives: cookie-based dev session; per-request mock middleware. The header approach lets curl work without ceremony and is trivial to swap for real auth later. |
| **Parser strategy** | Hand-written line-by-line state machine in `apps/api/src/modules/parsing/scene-parser.ts`. Regex for the speaker-prefix shape (`/^([A-Z][A-Z0-9 ._'-]*?)\s*:\s*(.*)$/`), explicit handling for stage directions (lines wrapped in `()` or `[]`), blank-line stanza separation. | PEG (peggy/ohm) parser. Defer — overkill for the §14 parsing-trust matrix. |
| **Repository pattern** | Function-based modules in `packages/database/src/repositories/` taking a `Pool` or `PoolClient`, returning typed domain objects. No classes. | Class-based repositories. Blueprint §5.2 names `src/repositories/` directory but doesn't dictate class vs. function. Functions compose better with transaction passing. |
| **Validation boundary** | zod schemas in `packages/domain/src/scene/scene.schemas.ts` (already partially present) wired as Fastify type providers via `@fastify/type-provider-zod` for request validation; same schemas reused in repository return-type assertion (`schema.parse(row)` at the DB boundary). | Validate only at API boundary, trust DB. Cheap to add at the DB boundary now; expensive to add later when bad data is already in. |
| **Error shape** | Throw typed domain errors (`SceneNotFoundError`, `ParseError`) in services; map to RFC 7807 `problem+json` in a single Fastify `setErrorHandler`. | Per-route try/catch. The single handler is the only thing that keeps the error shape consistent. |
| **Parser idempotence** | `POST /scenes/:id/parse` re-parses `raw_text_current` and overwrites `parsed_state_current`. Safe to repeat. No conditional logic. | Detect unchanged input and short-circuit. Premature optimization. |

ADR-worthy items from the above: (a) the dev-auth header convention, (b) the function-based repository pattern, (c) the validation-at-both-boundaries choice. If the implementing session agrees with the defaults, write a single ADR-0005 that records all three as one decision package; if they diverge, split.

---

## Execution waves

Order matters within a wave only when one item names a contract the next consumes. Items inside a wave can be parallelized across agents if dispatched.

### Wave 1 — Domain contracts (close gaps in existing scaffolding)

The `packages/domain/src/scene/` directory has types and partial schemas. Verify and complete:

- `packages/domain/src/scene/scene.schemas.ts` — zod schemas for `Scene`, `ParsedSceneState`, `ParsedSceneLine`, `ParsedSceneSpeaker`. Confirm each schema matches the type and the SQL column.
- `packages/domain/src/scene/scene.requests.ts` (new) — request/response schemas: `CreateSceneRequest`, `UpdateSceneRequest`, `SceneResponse`, `ListScenesResponse`. These are HTTP shapes; they reference the entity schemas but are not identical (e.g. `CreateSceneRequest` has `title` + `rawText`, not `rawTextCurrent`).
- `packages/domain/src/project/` (new directory) — minimal `Project` type + schema + request shapes. Anchor with a one-line `index.ts` if no implementation belongs in domain.
- `packages/domain/src/user/` (new directory) — `User` type + schema. No request shapes yet (no auth routes).

Exit criterion: `pnpm --filter @sse/domain typecheck` passes; `pnpm --filter @sse/domain build` produces working `dist/`.

### Wave 2 — Repositories (database package)

Add `packages/database/src/repositories/` with one module per aggregate:

- `user.repository.ts` — `findUserById`, `findUserByEmail`.
- `project.repository.ts` — `createProject`, `findProjectById`, `listProjectsByOwner`.
- `scene.repository.ts` — `createScene`, `findSceneById`, `listScenesByProject`, `updateSceneRawText`, `updateSceneParsedState`, `updateSceneStatus`.

Each module:
- Takes a `Pool | PoolClient` first parameter (lets the same function run inside a transaction later).
- Returns typed domain objects (snake_case rows mapped to camelCase by an explicit row-mapper function colocated in the module — no ORM, no auto-conversion magic).
- Throws `EntityNotFoundError` (from a new `packages/database/src/errors.ts`) when a singular `findX` doesn't hit.

No transactions yet — versioning needs them, this slice doesn't.

`packages/database/seeds/sample_project.seed.sql` already exists; review whether it produces a fixed-UUID dev user the API can read via `X-User-Id` default. If not, amend (don't add a second seed file).

Exit criterion: `pnpm db:up && pnpm db:migrate && pnpm db:seed` produces a queryable dev user + project. `pnpm --filter @sse/database typecheck` passes.

### Wave 3 — Parser (api module)

`apps/api/src/modules/parsing/scene-parser.ts` — implements `SceneParserService` from `@sse/domain`. Hand-written line-state-machine. Behavior matrix:

| Input shape | Parser output |
|---|---|
| `SPEAKER: line text` | `ParsedSceneLine { speakerLabel: 'SPEAKER', textContent: 'line text', isStageDirection: false }` |
| `SPEAKER : line text` (whitespace before colon) | Same as above; speaker label trimmed. |
| `Speaker Name: line` (mixed case) | `speakerLabel: 'Speaker Name'`. No case normalization at parser layer — that's a downstream concern. |
| `SPEAKER (CONT'D): line` | `speakerLabel: 'SPEAKER'`; parenthetical suffix stripped. |
| `(door slams)` | `ParsedSceneLine { speakerLabel: null, textContent: 'door slams', isStageDirection: true }` |
| `[lights dim]` | Same — bracketed stage direction. |
| Blank line | Skipped; not emitted. |
| Continuation of prior speaker (no colon, no brackets, previous line had a speaker) | Appended to previous `ParsedSceneLine.textContent` with a space, OR emitted as a new line with the prior speaker carried forward — **decide in the implementing session**. Default: emit a new line with prior speaker carried forward (preserves line-index granularity for later rendering). |
| Duplicate speaker (`ALICE:` appearing twice) | Single entry in `parsed.speakers`; both lines reference it by label. Normalization: trim + collapse internal whitespace, NOT case-fold. |
| Malformed `: text without speaker` | `ParsedSceneLine { speakerLabel: null, textContent: ': text without speaker', isStageDirection: false }`. Parser does not throw. |

The parser is **total** — it never throws on input shape. Errors surface only on programmer-error (e.g. `null` input), which is a zod validation failure upstream.

Exit criterion: unit tests in `apps/api/src/modules/parsing/scene-parser.test.ts` cover every row in the matrix above and pass.

### Wave 4 — API routes

`apps/api/src/modules/` gets these route modules (Fastify plugins):

- `projects.routes.ts` — `POST /projects`, `GET /projects`, `GET /projects/:projectId`.
- `scenes.routes.ts` — `POST /projects/:projectId/scenes`, `GET /projects/:projectId/scenes`, `GET /scenes/:sceneId`, `PATCH /scenes/:sceneId`, `POST /scenes/:sceneId/parse`.

Wiring:

- `apps/api/src/server.ts` — already loads env + pool. Add: `setErrorHandler` (RFC 7807), register `@fastify/type-provider-zod`, register the two route plugins.
- `apps/api/src/bootstrap/identity.ts` (new) — reads `X-User-Id` header, defaults to `env.DEV_USER_ID`. Decorates request with `request.user = { userId }`. No verification yet.
- `apps/api/src/services/scene.service.ts` (new) — composes repository calls + parser. Owns the "create scene → parse → persist parsed state" composition for `POST /scenes/:id/parse`. Routes call services, services call repositories.

Exit criterion: `pnpm dev` starts the API; the four curl commands at the top of this plan all succeed against a fresh `pnpm db:up && pnpm db:migrate && pnpm db:seed`.

### Wave 5 — Integration tests

Per blueprint §14, parsing is the first testing pillar. Add:

- `test/integration/parsing/parser-trust.test.ts` — parser-level tests duplicating the unit matrix but going through the HTTP endpoint (scene created via route, parsed via route, parsed state retrieved via route). Uses a real Postgres (Docker), real Fastify, real parser. No mocks.
- A minimal `test/fixtures/scenes/*.txt` set covering the matrix rows.

Test runner: `vitest` (already a workspace dev dep if the scaffold added it; if not, that's a one-line `package.json` add). Use a per-test schema reset, not a per-test transaction rollback — keeps the test boundary close to production behavior.

Exit criterion: `pnpm test` runs the integration suite green against a freshly-migrated database.

### Wave 6 — ADR

Write `docs/adr/0005-dev-auth-repositories-and-validation.md` recording the three decisions:

1. Dev-mode user identification via `X-User-Id` header + `DEV_USER_ID` env default; defer real auth.
2. Function-based repository modules with explicit `Pool | PoolClient` first param.
3. zod validation at both the HTTP boundary (via `@fastify/type-provider-zod`) and the DB-row boundary (via `schema.parse(row)` in repository row-mappers).

Frontmatter per `docs/conventions/frontmatter.md` ADR schema.

---

## File-level deltas (anticipated; deviations are fine if reasoned)

**New files (≈14):**

- `packages/domain/src/scene/scene.requests.ts`
- `packages/domain/src/project/{index.ts, project.types.ts, project.schemas.ts}`
- `packages/domain/src/user/{index.ts, user.types.ts}`
- `packages/database/src/errors.ts`
- `packages/database/src/repositories/{user.repository.ts, project.repository.ts, scene.repository.ts, index.ts}`
- `apps/api/src/bootstrap/identity.ts`
- `apps/api/src/modules/parsing/{scene-parser.ts, scene-parser.test.ts}`
- `apps/api/src/modules/{projects.routes.ts, scenes.routes.ts}`
- `apps/api/src/services/scene.service.ts`
- `test/integration/parsing/parser-trust.test.ts`
- `test/fixtures/scenes/{matrix files}.txt`
- `docs/adr/0005-dev-auth-repositories-and-validation.md`

**Modified files (≈4):**

- `apps/api/src/server.ts` — add error handler, register type provider, mount routes, mount identity hook.
- `apps/api/package.json` — add `@fastify/type-provider-zod`, `vitest` (if missing).
- `packages/config/src/index.ts` — add `DEV_USER_ID` env var.
- `packages/database/seeds/sample_project.seed.sql` — ensure fixed-UUID dev user matches `DEV_USER_ID` default.

No SQL migration in this slice. Schema for §13 step 1 is already complete.

---

## Risks and where they land

| Risk | Mitigation |
|---|---|
| Parser matrix drift between unit tests, integration tests, and blueprint §14 prose. | Encode the matrix as a markdown table in `apps/api/src/modules/parsing/README.md` (anchor README, per `docs/conventions/directory-readme.md`); both test files derive their cases from that table. |
| Repository functions get unwieldy as later slices add transactions. | Each function already accepts `Pool | PoolClient` from day one — transaction wrapping in later slices needs no signature changes. |
| Dev-user header convention leaks into production code. | Single `identity.ts` hook is the only place that reads it; when real auth lands, that file is rewritten while leaving everything else untouched. ADR-0005 names this as the swap point. |
| Tests against a real database become flaky if the dev DB is also being used interactively. | Per-test schema reset uses a separate `sse_test` database (env-controlled), not the dev DB. |

---

## Definition of done

This plan is complete when **all** of:

1. The four-curl sequence at the top of this file succeeds end-to-end against a clean `pnpm db:up && pnpm db:migrate && pnpm db:seed`.
2. `pnpm typecheck && pnpm lint && pnpm test && pnpm build` passes.
3. `apps/api/src/modules/parsing/scene-parser.test.ts` covers every row in the parser behavior matrix.
4. `test/integration/parsing/parser-trust.test.ts` covers the same matrix through HTTP.
5. ADR-0005 is committed.
6. CI workflow in `.github/workflows/ci.yml` runs the integration test job against a service-container Postgres (if not already wired; check before assuming).
7. This plan file is committed.

---

## What this unlocks

When the slice ships, the next plan (`YYYY-MM-DD-web-scene-import-and-parse-review.md`) can lean on:

- A real `scene_id` → `parsed_state_current` round-trip to wire the Next.js scene-import + parse-review flow against.
- The function-based repository pattern as the precedent for the versioning transaction (§13 step 3).
- The ADR-0005 dev-auth convention as the placeholder until real auth becomes load-bearing.
