---
title: System context
authority: derived
derives_from:
  - "docs/product/speech-score-engine-overview.md"
  - "docs/product/speech-score-system-definition.md"
  - "docs/product/dialogue-audio-studio-architecture.md"
  - "docs/product/repository-blueprint-handoff-package.md §1, §6"
status: current
last_validated_against_code: "2026-05-13"
---

# System context

## What the system is

The `$SPEECH_SCORE_ENGINE` is a **dramaturgical-audio workbench**: a compositional system for authoring, analyzing, rehearsing, rendering, and performing polyvocal speech works in which text, timing, recurrence, vocal distribution, and spatial notation are interoperable across analog and digital forms.

It is **not** a text-to-speech wrapper. The primary unit is the `$PHRASE_EVENT` — a bounded utterance with semantic content, speaker assignment, temporal position, duration behavior, and relational status to other phrase-events. Temporal structure is first-class through the entire stack.

## Actors and external systems

```
                  ┌────────────────────────────────────────────────┐
                  │            playwright / dramaturg              │
                  │            director / performer                │
                  │            (the user)                          │
                  └─────────────┬───────────────────┬──────────────┘
                                │                   │
                                │ HTTPS             │ public share URL
                                ▼                   ▼
                          ┌──────────┐         ┌──────────┐
                          │ apps/web │         │ share    │
                          │ Next 15  │         │ viewer   │
                          └─────┬────┘         └────┬─────┘
                                │                   │
                                │ HTTPS (client-sdk)│
                                └─────────┬─────────┘
                                          ▼
                                    ┌──────────┐
                                    │ apps/api │
                                    │ Fastify  │
                                    └────┬─────┘
                            ┌────────────┼─────────────┐
                            │            │             │
                            ▼            ▼             ▼
                       ┌────────┐  ┌──────────┐  ┌──────────┐
                       │ Redis  │  │ Postgres │  │  Object  │
                       │ queue  │  │  16      │  │ storage  │
                       └────┬───┘  └────┬─────┘  │ (MinIO/  │
                            │           │        │  S3)     │
                            ▼           │        └────┬─────┘
                       ┌──────────┐     │             │
                       │apps/work-│     │             │
                       │er  BullMQ│─────┴─────────────┘
                       └────┬─────┘
                            │ HTTPS (provider adapter)
                            ▼
                       ┌──────────┐
                       │  voice   │
                       │ provider │
                       │ (TTS,    │
                       │ later:   │
                       │ cloning) │
                       └──────────┘
```

## Service responsibilities

(Per `docs/product/repository-blueprint-handoff-package.md` §6 — abbreviated here; the blueprint is authoritative.)

| Service | Owns | Does NOT own |
|---|---|---|
| `apps/web` | User interaction, local editing state, playback UI control, optimistic updates, timeline + diagnostics + version-compare rendering. | Authoritative parsing truth, immutable version creation, share-token generation, persistent audit events. |
| `apps/api` | Authentication, authorization, scene persistence, parsing orchestration, version creation, share-link creation, diagnostics triggering, render-job submission. | Long-running audio rendering. |
| `apps/worker` | Asynchronous audio generation and render-artifact persistence. Transforms version snapshot + render profile → audio asset. | Scene mutation, user-facing authorization. |
| `packages/database` | Persistence, transactional integrity, query composition. Atomic version creation. | Business logic above raw SQL/queries. |
| Provider adapters (`apps/worker/providers/voice/*`, `apps/worker/providers/storage/*`) | Abstracting voice providers, blob storage, future waveform services. | Anything above the adapter boundary. |

## What's outside the system

(Per `docs/product/speech-score-engine-overview.md` "System boundary".)

Outside the system, unless later integrated: costume, scenic design, venue ticketing, payroll, unrelated production logistics. The system explicitly avoids becoming "a generic creative-suite product."

## Trust + invariants at the boundary

- **Mutable scene state vs. immutable version snapshots.** A `scene` row holds the working state the user edits live. A `scene_version` row holds a frozen snapshot. The API atomically promotes scene → version (see `004-versioning-model.md`).
- **Renders bind to versions, not scenes.** A render artifact must reference a specific `scene_version.version_id`; render-from-current-mutable-state is not supported. This is what lets renders be reproducible.
- **Share links bind to versions, not scenes.** Same reason. A shared scene is always a specific frozen take.
- **Voice provider data crosses an explicit boundary.** No voice text or audio leaves the worker without going through the provider adapter. The boundary lets us swap providers and audit data exfiltration in one place.

## Out of scope for the current scaffold

- Authentication / sessions / authorization — `auth_session_secret` env var exists but no auth middleware is wired yet.
- Render pipeline — see `003-render-pipeline.md` for the design; no implementation yet.
- Diagnostics generator — interface exists in `@sse/domain/contracts`; no implementation yet.
- Share-link token generation — schema exists; no handler yet.

See `docs/product/repository-blueprint-handoff-package.md` §13 for the order in which these get built.
