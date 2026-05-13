---
purpose: First-class architectural UI components for the speech-score-engine surface (scene editor, playback transport, diagnostics, etc.).
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.1"
status: planned
planned_files:
  - scene-editor/
  - playback-transport/
  - diagnostics/
  - speaker-panel/
  - version-history/
  - timeline/
---

# apps/web/src/components/

## Purpose

Domain-specific React components for the speech-score-engine UI. The blueprint (§4.1) emphasizes that these are **first-class architectural units**, not generic UI primitives: `scene-editor`, `playback-transport`, and `diagnostics` are real concepts the design has opinions about.

Generic UI primitives (buttons, inputs, layout) live in `@sse/ui` — they're cross-app and need to stay reusable. The components here are scene-aware, version-aware, render-aware; they don't generalize.

## What goes here

- `scene-editor/` — The polyvocal text editor with speaker assignment, line operations, and live parse preview.
- `playback-transport/` — Transport controls (play/pause/seek/scope), playback-cursor visualization, scrub bar bound to the audio asset.
- `diagnostics/` — Diagnostics card stack, flag visualizations, metric chips.
- `speaker-panel/` — Speaker enumeration, voice-profile assignment, default-pacing editor.
- `version-history/` — Version list, version-compare picker, restore action.
- `timeline/` — Render timeline / waveform display, with line-index alignment to audio time.

Each subdirectory exports its components through an `index.ts`.

## What does NOT go here

- Generic primitives (button, input, dropdown) — `@sse/ui`.
- Application state — `state/`.
- Data fetching — `lib/` or via the `@sse/client-sdk` client.

## References

- Blueprint: `docs/product/repository-blueprint-handoff-package.md §4.1`
- MVP spec: `docs/product/mvp-spec.md`
