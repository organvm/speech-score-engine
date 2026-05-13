---
purpose: Custom React hooks specific to the speech-score-engine UI.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.1"
status: planned
---

# apps/web/src/hooks/

## Purpose

Custom hooks that encapsulate stateful UI logic — render-status polling, version-list subscription, optimistic scene updates, playback-cursor tracking. Generic React patterns (useDebounce, useThrottle) go through `npm` or `@sse/ui`; this directory holds the domain-specific ones.

## Planned hooks

- `useRenderStatus(renderId)` — polls `GET /api/v1/renders/{renderId}` until terminal state; returns the live `{render_status, audio_uri, error_message}`.
- `useVersionList(sceneId)` — loads version history for a scene; supports optimistic insert on new-version creation.
- `useSceneDraft(sceneId)` — local-state-mirroring hook for the mutable scene, with debounced server persist.
- `usePlaybackCursor(audioRef, versionLines)` — maps audio currentTime to active `line_index`.

## What does NOT go here

- General React utilities — `@sse/ui` or external libraries.
- Server-state libraries' code — if we adopt `@tanstack/react-query`, its setup goes in `lib/` or via a root provider, not as a hook here.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.1`
