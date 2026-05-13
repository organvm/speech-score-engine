---
title: API contracts
authority: derived
derives_from:
  - "docs/product/repository-blueprint-handoff-package.md §9"
  - "packages/domain/src/contracts/"
  - "packages/domain/src/parsing/"
status: current
last_validated_against_code: "2026-05-13"
---

# API contracts

## Two-tier contract surface

The system has **two** contract surfaces, not one. They live in different forms and serve different consumers.

| Surface | Form | Lives in | Consumed by |
|---|---|---|---|
| HTTP contracts | OpenAPI-shaped request/response JSON | Documented here (and authoritatively in `docs/product/repository-blueprint-handoff-package.md §9.2`) | `apps/web` (via `packages/client-sdk`), share viewers, future mobile clients |
| Internal service contracts | TypeScript interfaces | `packages/domain/src/contracts/*.ts` and `packages/domain/src/parsing/index.ts` | `apps/api` modules and services, `apps/worker` (for adapter contracts) |

The internal TS contracts are authoritative for the implementation. The HTTP contracts are authoritative for the wire. Drift between them is a bug — the HTTP layer should serialize types defined or derivable from `packages/domain`.

## HTTP contracts

Full request/response shapes are spelled out in `docs/product/repository-blueprint-handoff-package.md §9.2`. The endpoint surface:

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/v1/projects/{projectId}/scenes` | Create a scene under a project. |
| `POST` | `/api/v1/scenes/{sceneId}/parse` | Parse `raw_text` into `parsed_state`. Stateless on the wire. |
| `POST` | `/api/v1/scenes/{sceneId}/versions` | Atomically create a `scene_version` from the current mutable state. |
| `POST` | `/api/v1/versions/{versionId}/renders` | Submit a render job against a version. |
| `GET` | `/api/v1/renders/{renderId}` | Poll a render's status. |
| `GET` | `/api/v1/versions/{versionId}/diagnostics/latest` | Get the latest diagnostic report for a version. |

The `/api/v1/` prefix is intentional — major API version goes in the path. The version-prefix lets us run v1 and v2 side-by-side during migrations.

Headers, error shapes, pagination, and auth are not yet specified in the blueprint and will be defined when the first endpoint is implemented. The conservative defaults this scaffold expects:

- **Auth**: bearer token in `Authorization` header.
- **Errors**: `{error: {code: string, message: string, details?: object}}` with HTTP status reflecting class (400/401/403/404/409/422/500).
- **Pagination**: cursor-based (`{items, next_cursor}`) — never offset, never page-number.
- **Content-Type**: `application/json` for both directions.

## Internal TS contracts

In `packages/domain/src/contracts/`:

- **`versioning.service.ts`** — `VersioningService.createVersion(input) => CreateSceneVersionResult` plus `restoreVersion`.
- **`render-dispatch.service.ts`** — `RenderDispatchService.requestRender(input) => RequestRenderResult`.
- **`diagnostics.service.ts`** — `DiagnosticsService.generate(input) => GenerateDiagnosticsResult`.
- **`voice-provider.adapter.ts`** — `VoiceProviderAdapter.render(request) => VoiceRenderArtifact` (worker-internal; not API-visible).

In `packages/domain/src/parsing/`:

- **`SceneParserService.parse(input) => ParseSceneResult`** where `ParseSceneResult` is the same shape as `parsed_state` in the HTTP contract.

These are interfaces, not implementations. Implementations live in `apps/api/src/services/` (and `apps/worker/src/providers/` for the voice adapter) and are constructor-injected into the route handlers / job processors that use them.

## Why interfaces in `packages/domain`

The blueprint (§5.1) makes the domain package "the conceptual heart of the repo." Defining service interfaces in `domain` means:

- The API can consume an interface, not a concrete class. Service swaps (real → mock for tests; one provider → another) are mechanical.
- The web client (via `packages/client-sdk`) can reuse the request/response types so the wire stays type-safe.
- Implementation packages (`apps/api`, `apps/worker`) depend on `domain`, not the other way around. The dependency graph stays a DAG with `domain` at the leaf.

## Validation strategy

`packages/domain/src/scene/scene.schemas.ts` exports zod schemas matching the TS types. Use them at:

- **HTTP request boundary** — Fastify's zod type provider validates incoming JSON against the schema before the handler sees it.
- **Worker job-payload boundary** — same pattern: zod-parse before processing.
- **Database read boundary** — optional; the migrations enforce shape at the DB level, but zod-parsing on read gives runtime sanity in development.

zod-parsing on internal-only fully-typed data is wasted CPU. Validate at trust boundaries (user input, external APIs, queue payloads), not on every function call.

## Versioning the contracts

Two-track versioning:

- **HTTP wire version** — major version in the URL (`/api/v1/`). Breaking changes bump to `/api/v2/` and run both side-by-side until clients migrate.
- **Internal TS contract version** — no formal version; consumers all live in the same monorepo and change together. Breaking changes are normal refactors.

This intentionally diverges between layers. The wire is shared with external clients and must be stable; internal contracts evolve with the implementation.

## Adapters vs. services

Both are TS interfaces, but they sit at different boundaries:

| | Adapter | Service |
|---|---|---|
| Examples | `VoiceProviderAdapter`, `StorageAdapter` (planned) | `VersioningService`, `RenderDispatchService`, `DiagnosticsService` |
| Implementor lives | `apps/worker/src/providers/` | `apps/api/src/services/` |
| Wraps | External system (3rd-party API, blob store, filesystem) | Internal business logic |
| Replaceable by | Mock for tests, different vendor in prod | Different implementation strategy (e.g., sync vs. async) |
| Cost of swap | Low (mechanical) | High (probably implies architectural change) |

The distinction matters for contract evolution: adapter contracts must be stable enough that real provider implementations can be written against them without re-litigating the shape. Service contracts can evolve as the system's domain logic clarifies.

## Out of scope here

- Specific Fastify routing patterns (will live in `apps/api/src/server/routes/`).
- Specific zod schema definitions for each endpoint (will live in `packages/domain/src/contracts/api/`).
- Generated OpenAPI document (planned; produced from the TS contracts).
