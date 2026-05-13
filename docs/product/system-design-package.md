---
title: "System design package"
source_path: "dramaturgist-tuning-markdown-archive/sources/system-design-package.md"
source_sha1: "4f6d6eec1d8b"
project_save_id: null  # truncated in saves-list before capture; recovered from gizmo files array
conversation_id: "69c6ec6f-164c-8329-ac9c-6734aeda8e5b"
conversation_title: "Branch · Speech-based Performance System"
canvas_index: 6
date_in_chatgpt: "2026-03-27"
recovered_at: "2026-05-13"
---
# Product-Design and Systems Package

## $DOCUMENT_ID

`audio-dramaturgical-studio_mvp-system-design-package_20260327`

## $PURPOSE

This package extends the MVP specification into an implementation-oriented product and systems design artifact. It defines the normalized object schema, screen-by-screen annotated wireframe descriptions, API surface draft, event model for playback, render, and version actions, and a phased implementation plan from alpha to beta.

The package is written to preserve one governing principle:

**the system is not a document reader with voices attached; it is a temporal-performance modeling system whose first commercial expression is dialogue hearing and revision.**

---

# 1. Normalized Object Schema

## 1.1 $DESIGN_GOALS

The schema must satisfy five requirements.

First, it must preserve ordinary product needs such as ownership, persistence, sharing, authentication, and version recovery.

Second, it must preserve the temporal structure of dialogue rather than collapsing everything into raw text blobs.

Third, it must keep render outputs derivable from saved state.

Fourth, it must permit later evolution into overlapping speech, score logic, and live execution without breaking early assumptions.

Fifth, it must remain simple enough for an MVP team to implement.

The normalized schema below assumes a relational core with optional JSON fields where structured flexibility is useful. It can be implemented in PostgreSQL cleanly.

---

## 1.2 $ENTITY_RELATION_OVERVIEW

A `User` owns `Projects`.

A `Project` contains `Scenes`.

A `Scene` contains `Speakers`, `SceneVersions`, and current working draft state.

A `SceneVersion` contains immutable snapshots of parsed performance structure.

A `SceneVersion` contains many `VersionLines`.

Each `VersionLine` references one `Speaker`.

A `Speaker` references a selected `VoiceProfile`.

A `PlaybackRender` is generated from a `SceneVersion` plus a `RenderProfile`.

A `DiagnosticReport` is generated from a `SceneVersion`.

A `ShareLink` exposes a chosen `SceneVersion`.

This separation is essential: mutable working state lives at the scene layer, while stable revision evidence lives at the version layer.

---

## 1.3 $TABLE_USER

```sql id="mswm9d"
CREATE TABLE app_user (
user_id UUID PRIMARY KEY,
email TEXT NOT NULL UNIQUE,
display_name TEXT NOT NULL,
account_plan TEXT NOT NULL DEFAULT 'free',
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
last_active_at TIMESTAMPTZ
);
```

### Notes

`account_plan` supports later pricing controls, render quotas, and collaboration gating.

---

## 1.4 $TABLE_PROJECT

```sql id="ucs8b0"
CREATE TABLE project (
project_id UUID PRIMARY KEY,
owner_user_id UUID NOT NULL REFERENCES app_user(user_id),
title TEXT NOT NULL,
description TEXT,
archived_at TIMESTAMPTZ,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Notes

A project is lightweight in MVP but structurally necessary. It prevents flat scene sprawl and gives future room for plays, acts, sequences, or multiple development branches.

---

## 1.5 $TABLE_SCENE

```sql id="oeo1kx"
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
```

### Notes

The scene holds mutable working state. This is the live editing surface.

`parsed_state_current` may contain a transient representation of current line segmentation and speaker mapping before version save.
`working_settings_current` contains current playback defaults, pace, stage-direction behavior, and similar runtime parameters.

---

## 1.6 $TABLE_SPEAKER

```sql id="ghly5u"
CREATE TABLE speaker (
speaker_id UUID PRIMARY KEY,
scene_id UUID NOT NULL REFERENCES scene(scene_id),
display_label TEXT NOT NULL,
sort_order INTEGER NOT NULL,
default_voice_profile_id UUID,
default_pacing_profile JSONB,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
UNIQUE(scene_id, display_label)
);
```

### Notes

Speakers are scene-scoped in MVP. Later, reusable speaker archetypes can be layered on top if needed.

`default_pacing_profile` may include fields such as baseline speech rate, pause temperament, or stage-direction treatment.

---

## 1.7 $TABLE_VOICE_PROFILE

```sql id="kz7d6a"
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
```

### Notes

This table abstracts external voice providers. The application should not hard-wire business logic to provider-specific names.

---

## 1.8 $TABLE_SCENE_VERSION

```sql id="bp383v"
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
```

### Notes

This is the canonical immutable revision unit.

`parsed_state_snapshot` should be sufficient to reconstruct line order, speaker references, pause semantics, and any stage-direction flags.
`settings_snapshot` captures the playback environment under which renders and diagnostics are meaningful.

---

## 1.9 $TABLE_VERSION_LINE

```sql id="zsrndt"
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
```

### Notes

Even if the parsed snapshot already stores line arrays in JSON, storing normalized `version_line` rows is worthwhile. It makes diagnostics, analytics, search, and future compositional extensions much cleaner.

`structural_tags` can support flags such as `exposition_candidate`, `refrain`, `monologue_run`, or `interruptive_energy_high`.

---

## 1.10 $TABLE_RENDER_PROFILE

```sql id="9ee69x"
CREATE TABLE render_profile (
render_profile_id UUID PRIMARY KEY,
scene_id UUID NOT NULL REFERENCES scene(scene_id),
name TEXT NOT NULL,
config JSONB NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Notes

A render profile packages user-selectable playback behavior. Examples include neutral table read, slightly heightened read, or rhythm-forward mode. MVP can launch with one default render profile while keeping the object available for forward growth.

---

## 1.11 $TABLE_PLAYBACK_RENDER

```sql id="spohap"
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
```

### Notes

`render_scope` supports `full_scene`, `line_range`, or `single_line`.

The render should be treated as a derived artifact, not as primary truth.

---

## 1.12 $TABLE_DIAGNOSTIC_REPORT

```sql id="1hstkx"
CREATE TABLE diagnostic_report (
report_id UUID PRIMARY KEY,
scene_id UUID NOT NULL REFERENCES scene(scene_id),
version_id UUID NOT NULL REFERENCES scene_version(version_id),
summary TEXT,
metrics JSONB NOT NULL,
flags JSONB NOT NULL,
generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Notes

`metrics` holds numerical summaries such as line count, speaker share, alternation density, and longest monologue run.

`flags` holds addressable findings tied to line ranges.

---

## 1.13 $TABLE_SHARE_LINK

```sql id="5cduiu"
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
```

### Notes

This object should never expose editing in MVP. The share layer is for listening, reading, and review.

---

## 1.14 $TABLE_AUDIT_EVENT

```sql id="g3bmw9"
CREATE TABLE audit_event (
audit_event_id UUID PRIMARY KEY,
user_id UUID REFERENCES app_user(user_id),
scene_id UUID REFERENCES scene(scene_id),
version_id UUID REFERENCES scene_version(version_id),
event_type TEXT NOT NULL,
event_payload JSONB,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Notes

This supports product telemetry, debugging, revision trust, and future usage analytics without entangling domain tables with event-history concerns.

---

## 1.15 $NORMALIZATION_COMMENTARY

The critical architectural move is the split between `scene` and `scene_version`.

The scene is mutable, exploratory, unstable, and editable.

The scene version is immutable, analyzable, renderable, and shareable.

Without that split, diagnostics, render reproducibility, and trust in revision history become weak. With it, the system acquires a real temporal-document ontology.

---

# 2. Screen-by-Screen Annotated Wireframe Descriptions

## 2.1 $SCREEN_01_ENTRY_AND_AUTH

### Functional purpose

Authenticate the user and move them rapidly into the workspace.

### Layout concept

The screen has a narrow center column. The upper area carries product identity and concise value framing. The middle area contains sign-in and account creation controls. The lower area contains a single-sentence explanation of the primary workflow: write or paste dialogue, hear it performed, revise against time.

### Required components

The screen requires email and password inputs, social login if desired, and a primary action for starting a new account. A returning user should be taken to the dashboard immediately after authentication.

### Annotation

This screen should not over-theorize the product. Its job is conversion and entry, not explanation of the larger philosophical engine.

---

## 2.2 $SCREEN_02_DASHBOARD

### Functional purpose

Provide orientation, recent work continuity, and creation entry points.

### Layout concept

The left navigation rail contains Projects, Recent Scenes, Shared Links, and Account. The main body contains a prominent “New Scene” action at the top, followed by recent scenes and projects. Secondary metadata shows last edited timestamp, latest version count, and last render time.

### Required components

The screen needs a recent scenes list, project cards or rows, a quick-create entry, and lightweight search.

### Annotation

The dashboard should feel like a working writing tool, not a content platform. There should be no feed logic, no public discovery, no social distraction. The center of gravity is the next scene action.

---

## 2.3 $SCREEN_03_NEW_SCENE_IMPORT

### Functional purpose

Create a scene from blank text or pasted script.

### Layout concept

The top region contains scene title and project assignment. The central region contains a large text area with formatting examples. The right side contains parsing hints, showing how the system interprets speaker-prefixed lines.

### Required components

The screen needs a title field, project selector, large text input, parse action, and optional “load sample scene” for onboarding.

### Annotation

This screen must reduce first-run anxiety. The system should show the expected formatting convention plainly:

`SPEAKER: line of dialogue`

If stage directions are supported, the hint must remain simple and forgiving.

---

## 2.4 $SCREEN_04_PARSE_REVIEW

### Functional purpose

Let the user verify speaker detection and line segmentation before entering full workspace.

### Layout concept

A two-column layout works best. The left column shows raw text. The right column shows parsed speakers and line groupings. The user can merge duplicate speakers, rename ambiguous labels, and mark non-spoken lines as stage directions.

### Required components

The screen needs speaker chips, merge controls, rename inputs, parse-confidence hints if available, and a primary action to continue into workspace.

### Annotation

This is an important trust screen. If parsing is opaque, the product will feel magical and brittle. If parsing is inspectable and correctable, the product feels collaborative.

---

## 2.5 $SCREEN_05_SCENE_WORKSPACE

### Functional purpose

Serve as the main authoring, listening, and revision environment.

### Layout concept

This is a three-pane workspace.

The left pane is the script editor.
The center pane is playback and synchronized line focus.
The right pane is contextual tools, switching between speakers, diagnostics, and version actions.

A top toolbar contains scene title, save version, render status, and share action.

### Required components

The workspace requires editable script text, line highlighting, play and pause controls, line-range replay, a global pace control, speaker list, current voice assignments, diagnostics summary, and version-save controls.

### Annotation

This screen is the product. Every meaningful action should be reachable without leaving it.

The user should be able to do the following sequence with almost no friction: edit line, replay region, inspect issue, save version, replay full scene.

---

## 2.6 $SCREEN_06_SPEAKER_AND_VOICE_PANEL

### Functional purpose

Configure speaker identity and playback qualities.

### Layout concept

This is either a persistent right-side tab inside the workspace or a modal overlay. Each speaker appears as a row with name, voice assignment, preview control, and pacing parameters.

### Required components

The panel requires rename, reorder, voice preview, voice selection, and optional per-speaker pacing adjustment.

### Annotation

This panel should communicate differentiation, not character simulation fantasy. The goal is usable contrast between speakers, not cinematic acting mimicry.

---

## 2.7 $SCREEN_07_DIAGNOSTIC_PANEL

### Functional purpose

Expose scene structure and weak-point candidates.

### Layout concept

A stacked panel structure works best. The upper area shows summary metrics. The lower area shows clickable findings grouped by type. A small timeline visualization may show speaker distribution and long uninterrupted stretches.

### Required components

The panel requires estimated duration, lines per speaker, longest uninterrupted run, alternation density, repetition density, and clickable findings tied to line ranges.

### Annotation

Every finding should answer one question: where should the user listen again? The panel is not for abstract critique. It is for directed return-to-audio.

---

## 2.8 $SCREEN_08_VERSION_HISTORY

### Functional purpose

Make revision states visible, stable, and comparable.

### Layout concept

A list-detail interface works well. The left side lists versions in reverse chronological order. The right side shows metadata and comparison controls against the current version or another selected version.

### Required components

The screen requires version label, timestamp, estimated duration, settings summary, compare action, restore action, and share action.

### Annotation

Writers must trust that versions are recoverable. The interface should feel archival and calm, not fragile.

---

## 2.9 $SCREEN_09_COMPARE_VERSIONS

### Functional purpose

Let the user determine whether revision improved the scene.

### Layout concept

A two-column comparison view. The left side shows version A text and playback metadata. The right side shows version B. A shared top bar can toggle text diff, duration delta, and selected line replay.

### Required components

The comparison view requires text diff highlighting, duration comparison, speaker distribution comparison, and the ability to replay matching line ranges from each version.

### Annotation

The most useful comparison feature is not raw diff. It is temporal consequence: how did the change alter the movement of the scene?

---

## 2.10 $SCREEN_10_SHARE_VIEW

### Functional purpose

Present a read-only review artifact.

### Layout concept

A clean centered layout with scene title at top, audio player under it, script text below, and optional diagnostics summary collapsible beneath. No editing affordances appear.

### Required components

The screen requires playback, text view, speaker labels, diagnostics summary, and expiration or owner attribution if needed.

### Annotation

This should feel publishable but not public. It is a private review instrument.

---

# 3. API Surface Draft

## 3.1 $API_STYLE

A REST API is sufficient for MVP. It is clear, debuggable, and well-suited to the object model above. Long-running renders should use asynchronous job semantics. Real-time playback progress inside the browser does not require server push beyond render-status polling in MVP, though WebSocket support can be added later.

All identifiers below are written as path-friendly UUIDs.

---

## 3.2 $AUTH_ENDPOINTS

### `POST /api/v1/auth/register`

Creates a user account.

**Request**
```json id="jvqsgr"
{
"email": "user@example.com",
"password": "strong-password",
"display_name": "User Name"
}
```

**Response**
```json id="z9kj7w"
{
"user_id": "uuid",
"email": "user@example.com",
"display_name": "User Name",
"account_plan": "free"
}
```

### `POST /api/v1/auth/login`

Authenticates and returns session token or cookie-backed session.

### `POST /api/v1/auth/logout`

Ends the current session.

---

## 3.3 $PROJECT_ENDPOINTS

### `GET /api/v1/projects`

Returns all projects for current user.

### `POST /api/v1/projects`

Creates a project.

**Request**
```json id="u7hrry"
{
"title": "Untitled Project",
"description": "Optional"
}
```

### `GET /api/v1/projects/{project_id}`

Returns project detail.

### `PATCH /api/v1/projects/{project_id}`

Updates title or description.

### `DELETE /api/v1/projects/{project_id}`

Soft-archives a project.

---

## 3.4 $SCENE_ENDPOINTS

### `GET /api/v1/projects/{project_id}/scenes`

Returns scenes in a project.

### `POST /api/v1/projects/{project_id}/scenes`

Creates a scene.

**Request**
```json id="rif9t7"
{
"title": "Scene One",
"raw_text_current": "A: Hello.\nB: Hi."
}
```

### `GET /api/v1/scenes/{scene_id}`

Returns current scene with working state, speakers, current estimates, and recent versions.

### `PATCH /api/v1/scenes/{scene_id}`

Updates mutable working state.

**Request**
```json id="t20x5s"
{
"title": "Revised Scene Title",
"raw_text_current": "A: Hello.\nB: Hi again.",
"working_settings_current": {
"global_speech_rate": 1.0,
"default_pause_after_line_ms": 400,
"read_stage_directions": false
}
}
```

### `DELETE /api/v1/scenes/{scene_id}`

Soft-deletes or archives the scene.

---

## 3.5 $PARSE_ENDPOINTS

### `POST /api/v1/scenes/{scene_id}/parse`

Parses current raw text into structured form.

**Request**
```json id="47iho9"
{
"raw_text": "A: Hello.\nB: Hi.\n[They sit.]"
}
```

**Response**
```json id="o9pj9g"
{
"parsed_state": {
"speakers": [
{"display_label": "A"},
{"display_label": "B"}
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

### `POST /api/v1/scenes/{scene_id}/parse/commit`

Commits the reviewed parsed structure into the scene’s working state and creates or updates speaker rows as needed.

---

## 3.6 $SPEAKER_ENDPOINTS

### `GET /api/v1/scenes/{scene_id}/speakers`

Returns all speakers.

### `POST /api/v1/scenes/{scene_id}/speakers`

Creates a speaker.

### `PATCH /api/v1/speakers/{speaker_id}`

Updates label, order, or default voice assignment.

**Request**
```json id="08xg3x"
{
"display_label": "NARRATOR",
"sort_order": 1,
"default_voice_profile_id": "uuid",
"default_pacing_profile": {
"speech_rate": 0.95
}
}
```

### `POST /api/v1/scenes/{scene_id}/speakers/merge`

Merges duplicate speakers.

---

## 3.7 $VOICE_ENDPOINTS

### `GET /api/v1/voice-profiles`

Returns available voices.

### `GET /api/v1/voice-profiles/{voice_profile_id}`

Returns voice metadata.

### `POST /api/v1/voice-profiles/{voice_profile_id}/preview`

Generates a short sample preview for one speaker configuration.

---

## 3.8 $VERSION_ENDPOINTS

### `GET /api/v1/scenes/{scene_id}/versions`

Returns scene versions.

### `POST /api/v1/scenes/{scene_id}/versions`

Creates immutable version from current scene working state.

**Request**
```json id="ui2rnf"
{
"version_label": "after-cutting-exposition"
}
```

**Response**
```json id="zufus0"
{
"version_id": "uuid",
"estimated_duration_ms": 48200,
"created_at": "2026-03-27T20:00:00Z"
}
```

### `GET /api/v1/versions/{version_id}`

Returns version detail including normalized lines and settings snapshot.

### `POST /api/v1/versions/{version_id}/restore`

Copies a version snapshot back into the scene’s mutable current state.

---

## 3.9 $RENDER_ENDPOINTS

### `POST /api/v1/versions/{version_id}/renders`

Creates asynchronous render request.

**Request**
```json id="fv50i1"
{
"render_scope": "full_scene",
"render_profile_id": "uuid",
"scope_start_line_index": null,
"scope_end_line_index": null
}
```

**Response**
```json id="6g4ye8"
{
"render_id": "uuid",
"render_status": "queued"
}
```

### `GET /api/v1/renders/{render_id}`

Returns render job status and output URIs when complete.

### `GET /api/v1/versions/{version_id}/renders`

Returns render history for a version.

---

## 3.10 $DIAGNOSTIC_ENDPOINTS

### `POST /api/v1/versions/{version_id}/diagnostics`

Generates diagnostic report.

### `GET /api/v1/versions/{version_id}/diagnostics/latest`

Returns latest report.

**Response**
```json id="ytfq2z"
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

## 3.11 $SHARE_ENDPOINTS

### `POST /api/v1/versions/{version_id}/share-links`

Creates read-only share link.

### `GET /api/v1/share/{token}`

Returns public read-only scene version payload.

### `DELETE /api/v1/share-links/{share_id}`

Revokes share link.

---

## 3.12 $ANALYTICS_AND_AUDIT_ENDPOINTS

Internal endpoints or server-side instrumentation should capture scene created, parse committed, version saved, render requested, render completed, diagnostic viewed, share created, and version restored. These need not be public API contracts, but the telemetry model should exist from the beginning.

---

# 4. Event Model for Playback, Render, and Version Actions

## 4.1 $EVENT_MODEL_PURPOSE

The event model governs traceability, reproducibility, and downstream analytics. It is not merely logging. It is the behavioral skeleton of the product.

Each user action of consequence should emit a domain event. These events support debugging, usage analysis, quota enforcement, and later automation.

---

## 4.2 $EVENT_NAMING_PATTERN

Use stable, domain-specific names in the form:

`$NOUN.$ACTION.$STATE`

For example:

`scene.parse.requested`
`scene.parse.committed`
`version.created`
`render.requested`
`render.completed`
`playback.started`

This is clearer than generic clickstream labels.

---

## 4.3 $CORE_PLAYBACK_EVENTS

### `playback.started`

Emitted when playback begins for a scene version render.

```json id="b2jg70"
{
"event_type": "playback.started",
"user_id": "uuid",
"scene_id": "uuid",
"version_id": "uuid",
"render_id": "uuid",
"scope_start_line_index": 1,
"scope_end_line_index": 22,
"started_at_ms": 0,
"occurred_at": "2026-03-27T20:00:00Z"
}
```

### `playback.paused`

Emitted when playback pauses.

### `playback.resumed`

Emitted when playback resumes.

### `playback.completed`

Emitted when playback reaches end of requested scope.

### `playback.scrubbed`

Emitted when user jumps to a different point.

### `playback.line_focused`

Optional high-volume event. This should be sampled rather than fully persisted in MVP unless needed for advanced analytics.

---

## 4.4 $CORE_RENDER_EVENTS

### `render.requested`

Emitted when a render job is created.

### `render.queued`

Emitted when backend accepts job into queue.

### `render.processing`

Emitted when generation begins.

### `render.completed`

Emitted when audio becomes available.

### `render.failed`

Emitted on provider or processing failure.

Example:

```json id="en41ab"
{
"event_type": "render.completed",
"user_id": "uuid",
"scene_id": "uuid",
"version_id": "uuid",
"render_id": "uuid",
"render_scope": "full_scene",
"duration_ms": 48200,
"provider_key": "voice-provider-a",
"occurred_at": "2026-03-27T20:01:12Z"
}
```

---

## 4.5 $CORE_VERSION_EVENTS

### `version.created`

Emitted when a new immutable version is saved.

### `version.restored`

Emitted when a prior version becomes current working state.

### `version.compared`

Emitted when user opens comparison mode between versions.

Example:

```json id="3gacum"
{
"event_type": "version.created",
"user_id": "uuid",
"scene_id": "uuid",
"version_id": "uuid",
"version_label": "cut-mid-scene-monologue",
"line_count": 38,
"estimated_duration_ms": 48200,
"occurred_at": "2026-03-27T20:00:20Z"
}
```

---

## 4.6 $CORE_PARSE_EVENTS

### `scene.parse.requested`

### `scene.parse.completed`

### `scene.parse.committed`

These are important because parse trust is foundational. When users repeatedly correct parser output, that operational fact should become visible.

---

## 4.7 $CORE_DIAGNOSTIC_EVENTS

### `diagnostic.generated`

### `diagnostic.viewed`

### `diagnostic.flag_opened`

The last one matters because it reveals whether diagnostics actually direct revision behavior.

---

## 4.8 $CORE_SHARE_EVENTS

### `share.created`

### `share.viewed`

### `share.revoked`

These help identify whether the product is entering genuine collaborative development workflows.

---

## 4.9 $EVENT_STORE_BEHAVIOR

For MVP, all important events can be persisted in `audit_event` with a JSON payload. If later scale or orchestration demands increase, these events can also be published to a message bus without changing the surface semantics.

The event model should not be treated as optional polish. It is how the team learns whether the product is becoming part of the drafting process.

---

# 5. Phased Implementation Plan from Alpha to Beta

## 5.1 $IMPLEMENTATION_PRINCIPLE

The roadmap should preserve one sequencing law:

**prove the listening-and-revision loop before expanding into sophisticated theatrical composition.**

The build should not collapse under grand ambition. The alpha must feel useful in a narrow way. The beta must feel credible as a workflow tool.

---

## 5.2 $PHASE_ALPHA_0_FOUNDATION

### Purpose

Establish the core application shell, persistence layer, authentication, scene data model, and text parsing pipeline.

### Deliverables

The system supports user accounts, projects, scenes, raw text editing, parse request, parse review, speaker creation, and saving working state.

The team also implements relational schema, audit event scaffolding, and baseline API contracts.

### Acceptance threshold

A user can create a project, create a scene, paste text, parse it, correct speakers, and return later without loss.

### Primary risk

Parser brittleness. If parse review is poor, the perceived intelligence of the product collapses immediately.

---

## 5.3 $PHASE_ALPHA_1_FIRST_HEARING_LOOP

### Purpose

Deliver the first complete end-to-end hearing loop.

### Deliverables

The system supports voice assignment, version creation, render request, render completion, playback, line highlighting, and basic current-position tracking.

Users can hear a full scene and replay selected sections.

### Acceptance threshold

A user can get from pasted dialogue to first scene playback reliably and without hand-holding.

### Primary risk

Render latency. If playback takes too long, the product feels like batch processing rather than live revision infrastructure.

---

## 5.4 $PHASE_ALPHA_2_REVISION_TRUST

### Purpose

Make the product usable as a real revision environment rather than a novelty demo.

### Deliverables

The system supports version history, restoring prior versions, comparing basic text deltas, and re-rendering from specific versions. The workspace becomes stable enough for repeated drafting.

### Acceptance threshold

A serious user can draft, save versions, revise, compare, and recover without fear.

### Primary risk

Version semantics becoming unclear. If users do not understand what is mutable and what is archived, trust erodes.

---

## 5.5 $PHASE_ALPHA_3_DIAGNOSTIC_LAYER

### Purpose

Introduce lightweight dramaturgical inspection.

### Deliverables

The system supports estimated duration, speaker share metrics, uninterrupted-run analysis, alternation-density metrics, and clickable line-range findings. These appear in the diagnostic panel and connect back to playback.

### Acceptance threshold

At least some users actively open diagnostics and jump from findings back into the scene.

### Primary risk

Overclaim. Diagnostics must remain obviously helpful and bounded. Thin pseudo-intelligence would damage credibility.

---

## 5.6 $PHASE_PRIVATE_BETA_1_WORKFLOW_INTEGRATION

### Purpose

Harden the product with a small cohort of real users.

### Deliverables

The team recruits playwrights, dramaturgs, or writing instructors. Usage telemetry is reviewed weekly. The team improves parse quality, render caching, workspace responsiveness, share stability, and version comparison clarity.

The share view is productionized enough for real feedback loops.

### Acceptance threshold

Users return to the product for multiple scenes over multiple sessions, not just one-off curiosity.

### Primary risk

The team discovering that users like the concept but do not incorporate it into habit. If that happens, the problem is likely loop friction, not category weakness.

---

## 5.7 $PHASE_PRIVATE_BETA_2_QUALITY_AND_RETAINABILITY

### Purpose

Refine the system from “interesting and usable” to “retainable and recommendable.”

### Deliverables

The team improves render turnaround, prefetches likely replay regions, strengthens diagnostics wording, adds better comparison views, and ensures share artifacts feel review-ready.

Operational controls for provider failures, retries, and quotas are added.

### Acceptance threshold

The product can support repeat use without frequent support intervention. Users can trust the artifact enough to send it to collaborators.

### Primary risk

Infrastructure inconsistency. A tool for writers cannot feel flaky.

---

## 5.8 $PHASE_BETA_OPENING

### Purpose

Move from controlled trial to broader availability while preserving product identity.

### Deliverables

The product exposes a pricing or plan structure, clear onboarding, sample scenes, and polished dashboard continuity. Analytics dashboards are in place for time-to-first-playback, render success rate, replay frequency, version save rate, diagnostic engagement, share creation, and retention across scenes.

### Acceptance threshold

The product can support a wider user base while still proving the core behavioral thesis: people are revising dialogue against hearing, not merely testing the novelty of synthetic voices.

### Primary risk

Positioning drift. The product must not market itself as generic script TTS. It must remain a listening-first dramatic writing tool.

---

# 6. Recommended Technical Stack Shape

## $APPLICATION_LAYER

A browser-first application using React or a similar component architecture is appropriate. The workspace complexity justifies a stateful front end with careful client-side modeling of current scene state and selected playback scope.

## $API_LAYER

A conventional server framework with REST support is sufficient. Node.js with TypeScript, Python with FastAPI, or a similar predictable stack all fit. The important point is typed contracts and stable async job handling.

## $DATA_LAYER

PostgreSQL is the correct default. It supports relational normalization, JSONB for flexible snapshots, and stable transactional semantics for version creation.

## $ASYNC_LAYER

A queue-backed worker system is required for render jobs. Even if the initial volume is low, render generation should not block request-response cycles.

## $ASSET_LAYER

Rendered audio and derived waveform assets should be stored in object storage with signed access where appropriate.

## $OBSERVABILITY_LAYER

Structured application logs, audit events, and product telemetry should be present from the first alpha. This is not premature complexity; it is how product truth is learned.

---

# 7. Product Risks That Should Influence Design Immediately

The first risk is accidental collapse into commodity voice tooling. The only way to prevent that is to preserve the temporal, structural, and revision-aware ontology from the first schema onward.

The second risk is user impatience. Creative revision is fragile. Latency and friction are not minor inconveniences here; they destroy the habit loop.

The third risk is ambiguous state. Writers need to know what they changed, what version they are hearing, and whether a render reflects their current edits.

The fourth risk is interpretive overreach. The system should offer operationally useful structural findings, not pretend to replace dramaturgical judgment.

---

# 8. What Must Be True at the End of Beta

At the end of beta, the product should satisfy six conditions.

A writer can move from text to hearing rapidly.

A writer can revise and rehear multiple times in one session.

A dramaturg can use the diagnostics and timeline to direct attention to specific regions.

A collaborator can receive a share link and understand the scene as a performative artifact.

A version is a trusted immutable object.

The product is clearly perceived as a dialogue-development environment rather than a generic synthetic voice toy.

If those conditions are met, the system has established a real category foothold.

---

# 9. Clean Handoff Summary

The system being built is a browser-first audio-dramaturgical studio with a normalized relational core centered on immutable scene versions, normalized version lines, asynchronous render jobs, lightweight dramaturgical diagnostics, and read-only share artifacts. The alpha sequence should first prove parsing and persistence, then the hearing loop, then revision trust, then diagnostics, and only after that harden for beta retention. The moat depends on preserving dramatic language as a temporal structured object rather than plain text passed through commodity voices.

Next, I can convert this into a **repository blueprint and implementation handoff package** with folder structure, service boundaries, database migration stubs, and endpoint/interface contracts.
