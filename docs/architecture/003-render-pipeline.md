---
title: Render pipeline
authority: derived
derives_from:
  - "docs/product/repository-blueprint-handoff-package.md §4.3, §6, §9.3"
  - "docs/product/audio-dramaturgical-mvp-specification.md"
  - "packages/domain/src/contracts/render-dispatch.service.ts"
  - "packages/domain/src/contracts/voice-provider.adapter.ts"
status: current
last_validated_against_code: "2026-05-13"
---

# Render pipeline

## Lifecycle

```
  user                api                  database              redis              worker            provider
   │ POST /api/v1/versions/                                                                              
   │      {versionId}/renders                                                                              
   ├─────────►                                                                                           
   │          │                                                                                          
   │          ├── verify user owns version ─►                                                            
   │          │◄────────── ok ─────────────                                                              
   │          │                                                                                          
   │          ├── INSERT playback_render                                                                 
   │          │    (render_status='queued')─►                                                            
   │          │◄────── render_id ──────────                                                              
   │          │                                                                                          
   │          ├── queue.add('render-scene',                                                              
   │          │     {render_id})         ────────────────────►                                           
   │          │                                                                                          
   │ 202 {render_id, render_status:queued}                                                               
   │◄─────────                                                                                           
   │                                                                                                     
   │                                              ◄────────── BullMQ Worker.process('render-scene')─────│
   │                                                                                                    │
   │                                              ┌── SELECT scene_version + version_line rows ────────►│
   │                                              ◄────────── version snapshot ──────────────────────── │
   │                                              │                                                     │
   │                                              ├── UPDATE playback_render                            │
   │                                              │    SET render_status='in_progress'                  │
   │                                              │                                                     │
   │                                              ├── voiceProvider.render({lines:[...]})              ─┤
   │                                              ◄──────────── audio bytes + duration_ms ─────────────┤
   │                                              │                                                     │
   │                                              ├── storage.put(audio) ─► audio_uri                   │
   │                                              ├── storage.put(waveform) ─► waveform_uri             │
   │                                              │                                                     │
   │                                              ├── UPDATE playback_render                            │
   │                                              │    SET render_status='completed',                   │
   │                                              │        audio_uri, waveform_uri,                     │
   │                                              │        duration_ms, completed_at = NOW()            │
   │                                              │                                                     │
   │                                              └── INSERT audit_event                                │
   │                                                   (event_type='render.completed')                  │
   │                                                                                                    │
   │ GET /api/v1/renders/{renderId} (polled by web)                                                     │
   ├─────────►                                                                                          │
   │          │                                                                                         │
   │          ├── SELECT playback_render ─►                                                             │
   │          │◄────── row + audio_uri ──                                                               │
   │          │                                                                                         │
   │ 200 {render_status:'completed', audio_uri, ...}                                                    │
   │◄─────────                                                                                          │
```

## Why this shape

### Why asynchronous?

Voice-provider calls are slow (seconds to tens of seconds). HTTP request timeouts are short. Inline rendering would couple API uptime to provider uptime and force the user to keep the request open.

The async-worker shape lets the API respond in milliseconds with a `render_id`, and the worker pulls when ready. Web polls the render-id endpoint for completion. (Later: SSE or WebSocket push.)

See `docs/adr/0003-async-render-worker.md`.

### Why a separate `playback_render` row before the job is queued?

The `render_id` is the user-visible handle. Issuing it before enqueueing means the API can return it immediately and the user can poll without race conditions. If the queue insert fails after the row insert, the row is marked `queued` but never picked up — we'd have a stuck render, which is observable and recoverable. If the row insert fails after the queue insert, the worker will pull a job referencing a non-existent render row and can no-op safely.

### Why does the worker re-fetch the snapshot rather than receiving it in the job payload?

- Job payloads stay small (just `render_id`).
- The snapshot is the authoritative reference. If `playback_render` is ever updated to point at a different version, the worker reads the current binding, not stale data.
- Provider keys + storage bindings are loaded inside the worker, not exposed in the queue.

## Provider adapter boundary

`packages/domain/src/contracts/voice-provider.adapter.ts` declares:

```ts
interface VoiceProviderAdapter {
  render(request: VoiceRenderRequest): Promise<VoiceRenderArtifact>;
}
interface VoiceRenderArtifact {
  audioBuffer: Uint8Array;
  durationMs: number;
}
```

All voice-provider integration goes through this interface. Concrete adapters live in `apps/worker/src/providers/voice/`:

- `mock.adapter.ts` (planned) — deterministic synthetic audio for tests.
- `elevenlabs.adapter.ts` (planned) — example real provider.

`apps/worker/src/providers/storage/` carries the same pattern for blob storage:

- `s3.adapter.ts` (planned) — works against MinIO locally and S3 in production.
- `local-fs.adapter.ts` (planned) — for development without a running MinIO.

## Render scope

Three scopes are supported by the schema (`render_scope` enum):

- `full_scene` — every line in the version.
- `line_range` — `version_line.line_index` between `scope_start_line_index` and `scope_end_line_index` inclusive.
- `single_line` — `scope_start_line_index` only; `scope_end_line_index` should equal it.

The render-dispatch service validates that the scope range is contained within the version's line count.

## Failure handling

| Failure | Recovery |
|---|---|
| Provider returns non-2xx | Worker retries with exponential backoff (BullMQ `attempts` + `backoff`); after final failure, `render_status = 'failed'` + `error_message` set + `render.failed` audit event. |
| Storage upload fails | Same retry pattern; failure marks the render `failed` with error_message indicating storage layer. |
| Worker crashes mid-render | BullMQ re-delivers the job on restart. The render row stays `in_progress` until the worker reaches the terminal state again. (Cleanup job — `cleanup-assets` — sweeps rows stuck `in_progress` past a threshold.) |
| Queue unreachable | API rejects the render request (HTTP 503). User retries. No partial-state in the DB. |

## Test posture

(Per blueprint §14.) Render lifecycle correctness must be testable without a real provider. The `mock.adapter.ts` produces deterministic output of a known duration so integration tests can assert lifecycle transitions and asset attachment without spending money or depending on external APIs.

## Out of scope here

- Audio assembly across multiple lines (line-by-line vs. one big call) — see `apps/worker/src/pipelines/audio-assembly.ts` (planned).
- Waveform generation algorithm — separate from voice render; downstream of the audio bytes.
- Render-versus-rehearsal-mode distinction (different render profiles) — covered by the `render_profile` table; this doc is pipeline-shape only.
