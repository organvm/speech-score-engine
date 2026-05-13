---
purpose: Client-side application state — three load-bearing scopes that must not blur.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.1 Notes"
status: planned
---

# apps/web/src/state/

## Purpose

The blueprint (§4.1 Notes) calls out three state scopes that must remain **distinct**:

1. **Current editable scene state** — what the user is typing, before persistence.
2. **Selected version context** — which `scene_version` is currently focused for compare / playback / share.
3. **Current playback/render context** — which `playback_render` is playing, paused, scrubbed.

Blurring them produces classic bugs: editing the mutable scene while playback is bound to a version, the user expects the audio to track edits; conversely, jumping playback while editing should not mutate the version that audio is bound to. Each scope has its own ownership rules.

## What goes here

- `scene-draft.store.ts` — Local mutable state for the in-progress scene edit.
- `selected-version.store.ts` — Currently focused version_id + the loaded version object.
- `playback.store.ts` — Currently playing render_id, transport state (play/pause/scrub position).

State library choice TBD (zustand, jotai, or React context + useReducer). Whatever the choice, each scope must be a separate store, not collapsed into one.

## What does NOT go here

- Server state — server state is fetched via `@sse/client-sdk`, optionally cached by a server-state library (TanStack Query / SWR), but not stored here.
- UI state that's component-local (open/closed, hover, focus) — that's `useState` in the component.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.1 Notes`
- Versioning model: `docs/architecture/004-versioning-model.md`
