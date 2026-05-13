---
purpose: Provider adapters — concrete implementations of external-system integration boundaries (voice, storage, future waveform).
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.3, §6"
status: planned
planned_files:
  - voice/
  - storage/
---

# apps/worker/src/providers/

## Purpose

The single boundary where external systems are integrated. Per blueprint §6 ("Provider Adapters service boundary"): "voice-provider logic must be isolated behind a provider interface so that vendor switching or multi-provider support does not infect the whole system."

Each provider lives in a subdirectory; each subdirectory holds:

- One adapter class per concrete provider, implementing the interface from `@sse/domain/contracts/`.
- A `select-provider.ts` (or similar) that returns the right adapter based on env.

## What goes here

### `voice/`

Implementations of `VoiceProviderAdapter` (from `@sse/domain/contracts/voice-provider.adapter.ts`).

Planned implementations:
- `mock.adapter.ts` — Deterministic synthetic audio for tests. Produces a known short audio buffer with a fixed duration. This is the adapter the test suite uses.
- `elevenlabs.adapter.ts` (example) — A real provider integration.

### `storage/`

Implementations of `StorageAdapter` (interface to be added to `@sse/domain/contracts/storage.adapter.ts` when first implementation lands).

Planned implementations:
- `s3.adapter.ts` — Works against MinIO locally and AWS S3 / S3-compatible in production.
- `local-fs.adapter.ts` — For development without a running MinIO.

## What does NOT go here

- Provider SDK imports outside `providers/`. The whole point of this boundary is one place to find and audit provider-specific code.
- Business logic — adapters are dumb. They convert from the typed contract to the provider's wire format, call, and convert back.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.3, §6`
- Architecture: `docs/architecture/003-render-pipeline.md` (provider adapter boundary section)
- Contracts: `packages/domain/src/contracts/voice-provider.adapter.ts`
