---
adr_id: "0003"
title: "Render audio asynchronously via a separate worker process, not inline in the API"
status: accepted
date: "2026-05-13"
deciders: ["Anthony Padavano"]
---

# ADR 0003: Render audio asynchronously via a separate worker process, not inline in the API

## Context

The system renders scene-versions into audio artifacts via external voice-provider APIs. Provider call latency is unpredictable — single-line synthesis can take 1–10 seconds; a whole-scene render can take minutes. The API must remain responsive at sub-second timescales, and the user expects to be able to dismiss the "rendering…" UI and come back to a finished artifact.

Three shapes were considered.

## Options considered

### Option A — Inline render in the API request

`POST /api/v1/versions/{versionId}/renders` blocks until the audio is done, then returns the URI.

**Pros:**
- Conceptually simplest. One request, one result.
- No queue infra needed.

**Cons:**
- HTTP request lifetime is bounded by every proxy in the chain. Long renders will be killed by load balancers, reverse proxies, browser timeouts.
- The user cannot leave the page or navigate away without losing the render context.
- The API process holds a connection for the full render duration, consuming a worker slot. Concurrent renders saturate the API's capacity within a handful of users.
- Provider failures or rate-limits become user-facing 500-equivalents.

### Option B — Inline render with API-driven polling

API spawns a background promise on the request handler, returns a render_id immediately, and the same API process resolves it later.

**Pros:**
- No separate worker process.
- API still uses one runtime.

**Cons:**
- The API process is now also doing arbitrarily-long work in the background. Scaling the API independently of render capacity becomes impossible.
- A crash of the API loses in-flight renders unless we persist state — at which point we've reinvented a job queue, badly.
- Memory pressure from many concurrent renders can OOM the API process and take down request-serving.

### Option C — Separate worker process behind a real job queue

API enqueues `{render_id}` on a Redis-backed BullMQ queue and responds with the render_id. A separate Node process (`apps/worker`) consumes from the queue and processes renders. Web polls `GET /api/v1/renders/{renderId}` for status.

**Pros:**
- API stays responsive at sub-second latency regardless of render duration.
- Worker can scale independently of API request volume.
- Crash recovery is BullMQ's job, not ours. Failed renders retry with backoff. Stuck renders are sweepable.
- The API process never holds a provider connection.
- Worker capacity is observable separately (queue depth, processing rate, failure rate).

**Cons:**
- Requires Redis (added infra dependency).
- Two deployable processes instead of one.
- Polling pattern adds web-side complexity (later mitigated by SSE or WebSocket push).

## Decision

**Option C.**

The system has clearly-asynchronous workload that doesn't fit inside an HTTP request. Inline approaches save infra at the cost of correctness; option B saves a process at the cost of operational sanity. The cost of running Redis + a worker process is one Docker service in dev (already present via `infrastructure/docker/compose.yaml`) and a managed-Redis line item in production — well-understood operationally.

## Consequences

### Required infrastructure

- A Redis instance reachable from both API and worker.
- A BullMQ worker process running `apps/worker`.
- A queue-events subscriber for observability.

### Required code patterns

- API render-submission must INSERT `playback_render` with `render_status='queued'` BEFORE enqueueing. This ensures the render_id exists when returned, and the worker can match the queue payload back to the row.
- Worker job handler must be **idempotent at the row level** — picking up a job that's already been processed (e.g., after worker restart) must observe `render_status` and behave correctly.
- Render-status transitions must be the only write path that modifies `playback_render` post-creation. No backdoor writes.

### Required code patterns (worker)

- Each provider call goes through `VoiceProviderAdapter`. Implementations sit in `apps/worker/src/providers/voice/`. The worker never imports a provider SDK directly outside the provider directory.
- Each storage call goes through `StorageAdapter` (planned). Implementations sit in `apps/worker/src/providers/storage/`.

### Polling vs. push

For now, web polls `/api/v1/renders/{renderId}` on an interval. When the system has multiple workers and >5 active renders per user becomes common, replace polling with SSE or WebSocket push from the API.

### Naming the queue

The queue name `render-scene` (declared in `apps/worker/src/queues.ts`) is namespaced flat. Future queues — `generate-diagnostics`, `cleanup-assets` — also live as flat queue names. We do NOT prefix with environment (`prod-render-scene`); environments are isolated via separate Redis databases or instances, not name prefixes.

## Revisit if

- Render latencies become consistently sub-second (e.g., on-prem self-hosted lightweight TTS). At that point, inline rendering would be viable for single-line previews — but the queue path stays for full-scene renders.
- Queue throughput becomes the bottleneck. At that point, queue partitioning by tenant or scene is the next step before changing the worker model.
- The worker grows enough internal logic that its concerns split — e.g., voice synthesis vs. waveform analysis vs. asset cleanup become separate workers, each with their own queue.

## Related

- `docs/architecture/003-render-pipeline.md` — the full lifecycle of a render through this worker model.
- `apps/worker/src/queues.ts` — the named queues this worker subscribes to.
- `apps/worker/src/index.ts` — the worker process boot (current state: queues declared, no processors registered yet).
