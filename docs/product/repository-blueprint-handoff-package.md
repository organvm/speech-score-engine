---
title: "Repository blueprint handoff package"
source_path: "dramaturgist-tuning-markdown-archive/sources/repository-blueprint-handoff-package.md"
source_sha1: "5b2202b570bf"
project_save_id: "ProjectSave_6384200fb5d081918417ce75e3660d2f"
conversation_id: "69c6ec6f-164c-8329-ac9c-6734aeda8e5b"
conversation_title: "Branch · Speech-based Performance System"
canvas_index: 5
date_in_chatgpt: "2026-03-27"
recovered_at: "2026-05-13"
---
# Repository Blueprint and Implementation Handoff Package

## $DOCUMENT_ID

`audio-dramaturgical-studio_repository-blueprint-and-handoff_20260327`

## $PURPOSE

This package translates the product-design and systems package into an implementation-ready repository blueprint. It defines the repository structure, service boundaries, database migration stubs, endpoint and interface contracts, and the operational handoff needed for an engineering team to build the MVP coherently.

The controlling rule remains unchanged:

**the system must be implemented as a temporal-performance application, not as a generic text-to-speech wrapper.**

That rule should be visible in the codebase structure itself.

---

## 1. $REPOSITORY_STRATEGY

For the MVP, the most logical implementation shape is a **modular monorepo**.

A monorepo is the right decision here because the application layers are tightly coupled during early development. The front end, API, worker, shared domain types, and database contracts will evolve together quickly. A multi-repo architecture at this stage would add friction, duplicate type definitions, and increase coordination cost without yielding meaningful decoupling benefits.

The monorepo should still preserve clean internal service boundaries so that later extraction remains possible.

The target implementation shape is therefore:

a browser client,
an application API,
an asynchronous render worker,
a shared domain package,
a database package,
and infrastructure/configuration modules.

---

## 2. $TOP_LEVEL_REPOSITORY_LAYOUT

```text id="ecpcdr"
$REPO_ROOT/
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── .env.example
├── .gitignore
├── docs/
│ ├── architecture/
│ │ ├── 001-system-context.md
│ │ ├── 002-domain-model.md
│ │ ├── 003-render-pipeline.md
│ │ ├── 004-versioning-model.md
│ │ └── 005-api-contracts.md
│ ├── product/
│ │ ├── mvp-spec.md
│ │ ├── system-design-package.md
│ │ └── repository-blueprint-and-handoff.md
│ └── adr/
│ ├── 0001-monorepo-decision.md
│ ├── 0002-postgres-jsonb-snapshots.md
│ ├── 0003-async-render-worker.md
│ └── 0004-scene-version-immutability.md
├── apps/
│ ├── web/
│ ├── api/
│ └── worker/
├── packages/
│ ├── domain/
│ ├── database/
│ ├── ui/
│ ├── config/
│ ├── observability/
│ └── client-sdk/
├── infrastructure/
│ ├── docker/
│ ├── terraform/
│ └── scripts/
├── test/
│ ├── fixtures/
│ ├── integration/
│ └── e2e/
└── .github/
└── workflows/
```

---

## 3. $FOLDER_PURPOSES

## `docs/`

This directory contains the durable architectural and product record. The product and system specs should live here verbatim, not only in chat transcripts or ephemeral notes. The engineering team should treat this directory as the canonical reasoning layer behind the code.

## `apps/web/`

This is the browser client. It contains the scene workspace, dashboard, parse review, diagnostics panel, version history, comparison view, and share view. It should contain no private domain truth not mirrored in shared packages. The front end should consume shared types and generated or hand-maintained API contracts.

## `apps/api/`

This is the application server. It owns authentication, authorization, project and scene CRUD, parsing endpoints, version creation, diagnostics orchestration, share-link handling, and render job submission. It should not perform long-running audio rendering inline.

## `apps/worker/`

This is the asynchronous job processor. It consumes render jobs, invokes voice providers, assembles audio artifacts, stores outputs, updates render status, and emits audit or telemetry events. It may also perform diagnostics generation if that process becomes slow enough to warrant background execution.

## `packages/domain/`

This package contains the core domain model, schemas, value objects, enumerations, parsers for internal scene structures, and event names. This is the conceptual heart of the repo. If the team keeps this package clean, the system will remain ontologically coherent.

## `packages/database/`

This package contains the database schema, migration files, ORM or query-layer definitions, repository abstractions, and seed data. It should also expose transaction helpers for version creation and other integrity-sensitive flows.

## `packages/ui/`

This contains reusable UI components and interaction patterns used by the web application, especially timeline panels, speaker chips, transport controls, diagnostics cards, and version history widgets.

## `packages/config/`

This contains environment parsing, typed configuration loading, and shared runtime configuration logic.

## `packages/observability/`

This contains structured logging utilities, audit event emitters, telemetry wrappers, and tracing helpers.

## `packages/client-sdk/`

This package contains shared API client functions and request/response types for the browser application. It prevents endpoint drift between front end and API.

## `infrastructure/`

This contains Docker files, deployment infrastructure definitions, and utility scripts for local setup and environment provisioning.

## `test/`

This contains shared fixtures and higher-level integration and end-to-end tests that operate across apps.

---

## 4. $DETAILED_APP_STRUCTURE

## 4.1 `apps/web/`

```text id="1x5854"
apps/web/
├── src/
│ ├── app/
│ │ ├── auth/
│ │ ├── dashboard/
│ │ ├── projects/
│ │ ├── scenes/
│ │ │ ├── [sceneId]/
│ │ │ │ ├── workspace/
│ │ │ │ ├── versions/
│ │ │ │ ├── compare/
│ │ │ │ └── share/
│ │ └── public-share/
│ ├── components/
│ │ ├── scene-editor/
│ │ ├── playback-transport/
│ │ ├── diagnostics/
│ │ ├── speaker-panel/
│ │ ├── version-history/
│ │ └── timeline/
│ ├── hooks/
│ ├── lib/
│ ├── state/
│ ├── styles/
│ └── types/
├── public/
└── package.json
```

### Notes

The web app should organize around user workflows, not only technical primitives. The `scene-editor`, `playback-transport`, and `diagnostics` components should be first-class architectural units.

The `state/` layer should preserve clarity about three things:

current editable scene state,
selected version context,
and current playback/render context.

Those must not blur together.

---

## 4.2 `apps/api/`

```text id="k43s8x"
apps/api/
├── src/
│ ├── server/
│ │ ├── app.ts
│ │ ├── routes/
│ │ ├── middleware/
│ │ └── errors/
│ ├── modules/
│ │ ├── auth/
│ │ ├── projects/
│ │ ├── scenes/
│ │ ├── parsing/
│ │ ├── speakers/
│ │ ├── versions/
│ │ ├── renders/
│ │ ├── diagnostics/
│ │ ├── shares/
│ │ └── audit/
│ ├── services/
│ │ ├── scene-parser.service.ts
│ │ ├── versioning.service.ts
│ │ ├── diagnostics.service.ts
│ │ ├── render-dispatch.service.ts
│ │ └── share-link.service.ts
│ ├── repositories/
│ ├── policies/
│ ├── contracts/
│ └── bootstrap/
└── package.json
```

### Notes

The API should use domain-oriented modules rather than generic controller sprawl. The team should avoid a flat “routes plus utils” structure. Parsing, versioning, renders, and diagnostics are domain concepts and deserve explicit modules.

The versioning service is especially critical. It should own the atomic transaction that converts mutable scene state into immutable version state.

---

## 4.3 `apps/worker/`

```text id="un4b4z"
apps/worker/
├── src/
│ ├── bootstrap/
│ ├── jobs/
│ │ ├── render-scene.job.ts
│ │ ├── generate-diagnostics.job.ts
│ │ └── cleanup-assets.job.ts
│ ├── providers/
│ │ ├── voice/
│ │ └── storage/
│ ├── pipelines/
│ │ ├── render-pipeline.ts
│ │ └── audio-assembly.ts
│ ├── services/
│ │ ├── render-status.service.ts
│ │ └── artifact-storage.service.ts
│ └── telemetry/
└── package.json
```

### Notes

The worker should be built around explicit job handlers and provider adapters. Voice-provider logic must be isolated behind a provider interface so that vendor switching or multi-provider support does not infect the whole system.

---

## 5. $SHARED_PACKAGE_STRUCTURE

## 5.1 `packages/domain/`

```text id="9fdfn1"
packages/domain/
├── src/
│ ├── scene/
│ │ ├── scene.types.ts
│ │ ├── scene.schemas.ts
│ │ ├── scene.value-objects.ts
│ │ └── scene.logic.ts
│ ├── speaker/
│ ├── version/
│ ├── render/
│ ├── diagnostics/
│ ├── share/
│ ├── events/
│ │ ├── event-names.ts
│ │ └── event-payloads.ts
│ ├── contracts/
│ │ ├── api/
│ │ └── internal/
│ ├── parsing/
│ │ ├── parse-scene-input.ts
│ │ ├── parse-result.types.ts
│ │ └── normalization.ts
│ └── index.ts
└── package.json
```

### Notes

This package should define the canonical TypeScript schemas and contracts for parsed scenes, version line structures, diagnostics flags, and event payloads.

If the team uses runtime validation, this is the correct location for schema definitions.

---

## 5.2 `packages/database/`

```text id="jayl7u"
packages/database/
├── migrations/
│ ├── 0001_init_users_projects_scenes.sql
│ ├── 0002_add_speakers_voice_profiles.sql
│ ├── 0003_add_scene_versions_version_lines.sql
│ ├── 0004_add_render_profiles_playback_renders.sql
│ ├── 0005_add_diagnostic_reports_share_links.sql
│ └── 0006_add_audit_events.sql
├── seeds/
│ ├── voice_profiles.seed.sql
│ └── sample_project.seed.sql
├── src/
│ ├── schema/
│ ├── queries/
│ ├── repositories/
│ ├── transactions/
│ └── index.ts
└── package.json
```

### Notes

Migration files should remain SQL-first unless the team has strong reasons otherwise. Versioning and audit logic are sensitive enough that explicit SQL improves trust and reviewability.

---

## 5.3 `packages/client-sdk/`

```text id="3ny78s"
packages/client-sdk/
├── src/
│ ├── auth.client.ts
│ ├── projects.client.ts
│ ├── scenes.client.ts
│ ├── parsing.client.ts
│ ├── speakers.client.ts
│ ├── versions.client.ts
│ ├── renders.client.ts
│ ├── diagnostics.client.ts
│ ├── shares.client.ts
│ ├── http.ts
│ └── index.ts
└── package.json
```

### Notes

The web app should not scatter raw fetch calls everywhere. The client SDK provides consistency and contract enforcement.

---

## 6. $SERVICE_BOUNDARIES

## $SERVICE_01_WEB_CLIENT

This service owns user interaction, local editing state, playback UI control, optimistic updates where appropriate, and rendering of timelines, diagnostics, and version comparisons.

It does not own authoritative parsing truth, immutable version creation, share-token generation, or persistent audit events.

## $SERVICE_02_APPLICATION_API

This service owns authentication, authorization, scene persistence, parsing orchestration, version creation, share-link creation, diagnostics triggering, and render job submission.

It is the authoritative domain gateway.

## $SERVICE_03_RENDER_WORKER

This service owns asynchronous audio generation and render artifact persistence. It transforms a version snapshot and render profile into an output audio asset.

It does not own scene mutation or user-facing authorization logic.

## $SERVICE_04_DATABASE_LAYER

This layer owns persistence, transactional integrity, and query composition. It must make version creation atomic and reproducible.

## $SERVICE_05_PROVIDER_ADAPTERS

This layer abstracts voice providers, blob storage, and possibly future waveform-generation services.

It prevents vendor coupling from spreading upward.

---

## 7. $DATABASE_MIGRATION_STUBS

Below are the initial migration stubs, written to align with the previously defined normalized schema.

## `0001_init_users_projects_scenes.sql`

```sql id="hrjp45"
BEGIN;

CREATE TABLE app_user (
user_id UUID PRIMARY KEY,
email TEXT NOT NULL UNIQUE,
display_name TEXT NOT NULL,
account_plan TEXT NOT NULL DEFAULT 'free',
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
last_active_at TIMESTAMPTZ
);

CREATE TABLE project (
project_id UUID PRIMARY KEY,
owner_user_id UUID NOT NULL REFERENCES app_user(user_id),
title TEXT NOT NULL,
description TEXT,
archived_at TIMESTAMPTZ,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE scene (
scene_id UUID PRIMARY KEY,
project_id UUID NOT NULL REFERENCES project(project_id),
title TEXT NOT NULL,
raw_text_current TEXT NOT NULL DEFAULT '',
parsed_state_current JSONB,
working_settings_current JSONB,
estimated_duration_ms_current INTEGER,
scene_status TEXT NOT NULL DEFAULT 'draft',
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_project_owner_user_id ON project(owner_user_id);
CREATE INDEX idx_scene_project_id ON scene(project_id);

COMMIT;
```

## `0002_add_speakers_voice_profiles.sql`

```sql id="u3uoh8"
BEGIN;

CREATE TABLE voice_profile (
voice_profile_id UUID PRIMARY KEY,
provider_key TEXT NOT NULL,
provider_voice_key TEXT NOT NULL,
display_name TEXT NOT NULL,
timbre_class TEXT,
gender_presentation TEXT,
locale_code TEXT,
default_speech_rate NUMERIC(5,2),
default_pitch_offset NUMERIC(5,2),
is_active BOOLEAN NOT NULL DEFAULT TRUE,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE speaker (
speaker_id UUID PRIMARY KEY,
scene_id UUID NOT NULL REFERENCES scene(scene_id),
display_label TEXT NOT NULL,
sort_order INTEGER NOT NULL,
default_voice_profile_id UUID REFERENCES voice_profile(voice_profile_id),
default_pacing_profile JSONB,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
UNIQUE(scene_id, display_label)
);

CREATE INDEX idx_speaker_scene_id ON speaker(scene_id);

COMMIT;
```

## `0003_add_scene_versions_version_lines.sql`

```sql id="b3o6r5"
BEGIN;

CREATE TABLE scene_version (
version_id UUID PRIMARY KEY,
scene_id UUID NOT NULL REFERENCES scene(scene_id),
version_label TEXT,
raw_text_snapshot TEXT NOT NULL,
parsed_state_snapshot JSONB NOT NULL,
settings_snapshot JSONB NOT NULL,
estimated_duration_ms INTEGER,
created_by_user_id UUID NOT NULL REFERENCES app_user(user_id),
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE version_line (
version_line_id UUID PRIMARY KEY,
version_id UUID NOT NULL REFERENCES scene_version(version_id),
speaker_id UUID REFERENCES speaker(speaker_id),
line_index INTEGER NOT NULL,
text_content TEXT NOT NULL,
is_stage_direction BOOLEAN NOT NULL DEFAULT FALSE,
pause_after_ms INTEGER,
emphasis_hint TEXT,
estimated_duration_ms INTEGER,
structural_tags JSONB,
UNIQUE(version_id, line_index)
);

CREATE INDEX idx_scene_version_scene_id ON scene_version(scene_id);
CREATE INDEX idx_version_line_version_id ON version_line(version_id);

COMMIT;
```

## `0004_add_render_profiles_playback_renders.sql`

```sql id="smqibw"
BEGIN;

CREATE TABLE render_profile (
render_profile_id UUID PRIMARY KEY,
scene_id UUID NOT NULL REFERENCES scene(scene_id),
name TEXT NOT NULL,
config JSONB NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE playback_render (
render_id UUID PRIMARY KEY,
scene_id UUID NOT NULL REFERENCES scene(scene_id),
version_id UUID NOT NULL REFERENCES scene_version(version_id),
render_profile_id UUID REFERENCES render_profile(render_profile_id),
render_scope TEXT NOT NULL,
scope_start_line_index INTEGER,
scope_end_line_index INTEGER,
audio_uri TEXT,
waveform_uri TEXT,
duration_ms INTEGER,
render_status TEXT NOT NULL,
provider_job_key TEXT,
error_message TEXT,
requested_by_user_id UUID NOT NULL REFERENCES app_user(user_id),
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
completed_at TIMESTAMPTZ
);

CREATE INDEX idx_playback_render_version_id ON playback_render(version_id);
CREATE INDEX idx_playback_render_status ON playback_render(render_status);

COMMIT;
```

## `0005_add_diagnostic_reports_share_links.sql`

```sql id="jgy1rh"
BEGIN;

CREATE TABLE diagnostic_report (
report_id UUID PRIMARY KEY,
scene_id UUID NOT NULL REFERENCES scene(scene_id),
version_id UUID NOT NULL REFERENCES scene_version(version_id),
summary TEXT,
metrics JSONB NOT NULL,
flags JSONB NOT NULL,
generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE share_link (
share_id UUID PRIMARY KEY,
scene_id UUID NOT NULL REFERENCES scene(scene_id),
version_id UUID NOT NULL REFERENCES scene_version(version_id),
access_mode TEXT NOT NULL DEFAULT 'read_only',
token_hash TEXT NOT NULL UNIQUE,
expires_at TIMESTAMPTZ,
revoked_at TIMESTAMPTZ,
created_by_user_id UUID NOT NULL REFERENCES app_user(user_id),
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_diagnostic_report_version_id ON diagnostic_report(version_id);
CREATE INDEX idx_share_link_version_id ON share_link(version_id);

COMMIT;
```

## `0006_add_audit_events.sql`

```sql id="hahz72"
BEGIN;

CREATE TABLE audit_event (
audit_event_id UUID PRIMARY KEY,
user_id UUID REFERENCES app_user(user_id),
scene_id UUID REFERENCES scene(scene_id),
version_id UUID REFERENCES scene_version(version_id),
event_type TEXT NOT NULL,
event_payload JSONB,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_event_event_type ON audit_event(event_type);
CREATE INDEX idx_audit_event_scene_id ON audit_event(scene_id);
CREATE INDEX idx_audit_event_version_id ON audit_event(version_id);

COMMIT;
```

---

## 8. $TRANSACTIONAL_DATABASE_RULES

The most important transaction in the entire system is **version creation**.

When the user saves a version, the system must do the following atomically:

read the current mutable scene state,
persist a new `scene_version` snapshot,
persist all normalized `version_line` rows,
calculate and store the duration estimate,
and emit a `version.created` audit event.

If any part fails, no partial version should remain.

That transaction should live in a dedicated database transaction helper, for example:

`packages/database/src/transactions/create-scene-version.transaction.ts`

A second high-value transaction is render finalization. When the worker completes a render, it should atomically update render status, attach artifact URIs, set completion time, and emit a `render.completed` event.

---

## 9. $ENDPOINT_AND_INTERFACE_CONTRACTS

## 9.1 $CONTRACT_STYLE

Contracts should exist in two forms.

The external form is the HTTP request/response contract used by web and share clients.

The internal form is the service contract used between API modules and between the API and worker-dispatch logic.

These contracts should be represented in `packages/domain/src/contracts/`.

---

## 9.2 $HTTP_CONTRACTS

## `POST /api/v1/projects/{projectId}/scenes`

### Request

```json id="b76xpa"
{
"title": "Scene One",
"raw_text_current": "A: Hello.\nB: Hi."
}
```

### Response

```json id="hiny04"
{
"scene_id": "uuid",
"project_id": "uuid",
"title": "Scene One",
"raw_text_current": "A: Hello.\nB: Hi.",
"scene_status": "draft",
"created_at": "2026-03-27T20:00:00Z",
"updated_at": "2026-03-27T20:00:00Z"
}
```

## `POST /api/v1/scenes/{sceneId}/parse`

### Request

```json id="amlqml"
{
"raw_text": "A: Hello.\nB: Hi.\n[They sit.]"
}
```

### Response

```json id="c4g885"
{
"parsed_state": {
"speakers": [
{ "display_label": "A" },
{ "display_label": "B" }
],
"lines": [
{
"line_index": 1,
"speaker_label": "A",
"text_content": "Hello.",
"is_stage_direction": false
},
{
"line_index": 2,
"speaker_label": "B",
"text_content": "Hi.",
"is_stage_direction": false
},
{
"line_index": 3,
"speaker_label": null,
"text_content": "They sit.",
"is_stage_direction": true
}
]
}
}
```

## `POST /api/v1/scenes/{sceneId}/versions`

### Request

```json id="yusk57"
{
"version_label": "after-cutting-exposition"
}
```

### Response

```json id="nc1v7s"
{
"version_id": "uuid",
"scene_id": "uuid",
"version_label": "after-cutting-exposition",
"estimated_duration_ms": 48200,
"created_at": "2026-03-27T20:03:00Z"
}
```

## `POST /api/v1/versions/{versionId}/renders`

### Request

```json id="7wvj8v"
{
"render_scope": "full_scene",
"render_profile_id": "uuid",
"scope_start_line_index": null,
"scope_end_line_index": null
}
```

### Response

```json id="3j3d08"
{
"render_id": "uuid",
"render_status": "queued",
"version_id": "uuid"
}
```

## `GET /api/v1/renders/{renderId}`

### Response

```json id="qxaumw"
{
"render_id": "uuid",
"render_status": "completed",
"audio_uri": "https://asset-store/render.wav",
"waveform_uri": "https://asset-store/render.json",
"duration_ms": 48200,
"completed_at": "2026-03-27T20:04:10Z"
}
```

## `GET /api/v1/versions/{versionId}/diagnostics/latest`

### Response

```json id="hpiet5"
{
"report_id": "uuid",
"summary": "Possible pacing drag in mid-scene monologue block.",
"metrics": {
"estimated_duration_ms": 48200,
"speaker_count": 3,
"longest_uninterrupted_run_lines": 11,
"alternation_density": 0.41
},
"flags": [
{
"flag_type": "long_monologue_run",
"line_range": [14, 24],
"message": "One speaker dominates this stretch for 11 consecutive lines."
}
]
}
```

---

## 9.3 $INTERNAL_SERVICE_CONTRACTS

These contracts define the service boundaries more explicitly than HTTP alone.

## `SceneParserService`

```ts id="7jm7qf"
export interface ParseSceneInput {
rawText: string;
}

export interface ParseSceneResult {
speakers: Array<{
displayLabel: string;
}>;
lines: Array<{
lineIndex: number;
speakerLabel: string | null;
textContent: string;
isStageDirection: boolean;
}>;
}

export interface SceneParserService {
parse(input: ParseSceneInput): Promise<ParseSceneResult>;
}
```

## `VersioningService`

```ts id="x4rgjp"
export interface CreateSceneVersionInput {
sceneId: string;
createdByUserId: string;
versionLabel?: string;
}

export interface CreateSceneVersionResult {
versionId: string;
sceneId: string;
estimatedDurationMs: number | null;
createdAt: string;
}

export interface VersioningService {
createVersion(input: CreateSceneVersionInput): Promise<CreateSceneVersionResult>;
restoreVersion(sceneId: string, versionId: string, restoredByUserId: string): Promise<void>;
}
```

## `RenderDispatchService`

```ts id="v8dywy"
export interface RequestRenderInput {
sceneId: string;
versionId: string;
requestedByUserId: string;
renderProfileId?: string;
renderScope: "full_scene" | "line_range" | "single_line";
scopeStartLineIndex?: number | null;
scopeEndLineIndex?: number | null;
}

export interface RequestRenderResult {
renderId: string;
renderStatus: "queued";
}

export interface RenderDispatchService {
requestRender(input: RequestRenderInput): Promise<RequestRenderResult>;
}
```

## `DiagnosticsService`

```ts id="hwh7z4"
export interface GenerateDiagnosticsInput {
sceneId: string;
versionId: string;
}

export interface DiagnosticsFlag {
flagType: string;
lineRange: [number, number];
message: string;
}

export interface GenerateDiagnosticsResult {
reportId: string;
summary: string;
metrics: Record<string, unknown>;
flags: DiagnosticsFlag[];
}

export interface DiagnosticsService {
generate(input: GenerateDiagnosticsInput): Promise<GenerateDiagnosticsResult>;
}
```

## `VoiceProviderAdapter`

```ts id="kyw8at"
export interface VoiceRenderLine {
speakerLabel: string | null;
textContent: string;
voiceProviderKey: string;
providerVoiceKey: string;
speechRate?: number;
pauseAfterMs?: number | null;
isStageDirection: boolean;
}

export interface VoiceRenderRequest {
lines: VoiceRenderLine[];
}

export interface VoiceRenderArtifact {
audioBuffer: Buffer;
durationMs: number;
}

export interface VoiceProviderAdapter {
render(request: VoiceRenderRequest): Promise<VoiceRenderArtifact>;
}
```

---

## 10. $RECOMMENDED_ENVIRONMENT_VARIABLES

In keeping with your operating conventions, the repository should adopt environment-variable-first configuration.

A minimal `.env.example` should look like this:

```bash id="asquam"
$NODE_ENV=development
$WEB_PORT=3000
$API_PORT=4000
$DATABASE_URL=postgres://user:password@localhost:5432/audio_dramaturgy
$REDIS_URL=redis://localhost:6379
$OBJECT_STORAGE_BUCKET=audio-dramaturgy-local
$OBJECT_STORAGE_ENDPOINT=http://localhost:9000
$OBJECT_STORAGE_ACCESS_KEY=minio
$OBJECT_STORAGE_SECRET_KEY=miniosecret
$AUTH_SESSION_SECRET=change-me
$VOICE_PROVIDER_ID=provider_a
$VOICE_PROVIDER_API_KEY=change-me
$APP_BASE_URL=http://localhost:3000
$API_BASE_URL=http://localhost:4000
$PUBLIC_SHARE_BASE_URL=http://localhost:3000/share
$LOG_LEVEL=info
```

The config package should validate these on process start and fail fast if required variables are missing.

---

## 11. $LOCAL_DEVELOPMENT_BOOTSTRAP

The initial local developer experience should be runnable with one command once prerequisites are installed.

A practical shape would be:

```bash id="uww46i"
$ pnpm install
$ pnpm db:migrate
$ pnpm db:seed
$ pnpm dev
```

The `dev` command should launch:

the web app,
the API,
the worker,
and any necessary local dependencies or proxies if containerized.

A Docker Compose layer under `infrastructure/docker/` is advisable for Postgres, Redis, and local object storage.

---

## 12. $CI_CD_BLUEPRINT

The repository should start with a simple but strict CI pipeline.

The workflow should run:

install,
typecheck,
lint,
unit tests,
integration tests,
and migration validation.

A basic `.github/workflows/ci.yml` should enforce that no migration is syntactically invalid and no shared contract package drifts from dependents.

The pipeline should also include one render-worker smoke test using a mock voice provider.

---

## 13. $IMPLEMENTATION_ORDER_INSIDE_THE_REPO

The engineering sequence should mirror the product sequence.

First, build the database package, domain contracts, and API routes for users, projects, scenes, and parsing.

Second, build the web flows for new scene import, parse review, and scene persistence.

Third, implement version creation transaction logic and version history UI.

Fourth, implement render dispatch, worker processing, and playback UI.

Fifth, implement diagnostics generation and diagnostics UI.

Sixth, harden share links and compare versions.

This order matters. The worker should not be built first. The system has to know what a scene version is before it can render one reliably.

---

## 14. $MINIMUM_TESTING_MATRIX

The repo should encode trust in three areas.

The first is **parsing trust**. The parser must be tested against common dialogue shapes, malformed labels, blank lines, stage directions, and duplicate speaker normalization.

The second is **version integrity**. Version creation tests must prove snapshot immutability and exact line preservation.

The third is **render lifecycle correctness**. Render request, status change, completion persistence, and asset-link attachment must be testable without real provider calls by using adapters and mocks.

A minimal test layout would therefore include:

`test/integration/parsing/`
`test/integration/versioning/`
`test/integration/rendering/`
`test/e2e/scene-hearing-loop/`

---

## 15. $IMPLEMENTATION_HANDOFF_PARAGRAPH

Build this as a modular monorepo with `apps/web`, `apps/api`, and `apps/worker`, backed by shared `packages/domain`, `packages/database`, `packages/client-sdk`, `packages/config`, and `packages/observability`. The database must preserve a strict split between mutable `scene` state and immutable `scene_version` snapshots, with normalized `version_line` rows and atomic version-creation transactions. The API owns parsing, persistence, versioning, diagnostics orchestration, and render-job submission; the worker owns asynchronous audio rendering through provider adapters and artifact storage. Implement in sequence: schema and contracts first, then scene import and parse review, then versioning, then render pipeline and playback, then diagnostics and share flows. Do not let the system collapse into generic TTS architecture; preserve dramatic language as structured temporal data across schema, services, events, and UI.

---

## 16. $NEXT_LOGICAL_ARTIFACT

The next strongest artifact is a **code-generation starter pack** containing:

`README.md`,
`pnpm-workspace.yaml`,
top-level `package.json`,
initial TypeScript config files,
Docker Compose file,
first migration files,
and scaffolded source files for `apps/api`, `apps/web`, and `apps/worker`.

That would turn this from a blueprint into an executable repository skeleton.
