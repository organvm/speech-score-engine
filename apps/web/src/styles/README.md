---
purpose: Global stylesheets, design tokens, theme variables.
blueprint_source: "docs/product/repository-blueprint-handoff-package.md §4.1"
status: planned
---

# apps/web/src/styles/

## Purpose

Web-app global styles: CSS variables / design tokens, base resets, typography defaults, theme variables. Per-component styles co-locate with components.

## What goes here

- `globals.css` — Imported by `src/app/layout.tsx`. CSS variables for color tokens, font stacks, spacing scale, motion timings.
- `tokens.css` — (optional) Pure custom-property declarations, separated from `globals.css` for clarity.

## Approach

No CSS-in-JS framework chosen yet. The simplest viable path: CSS Modules per component + a shared `globals.css`. Tailwind is fine if/when adopted; the choice is downstream of the first non-trivial UI implementation.

## What does NOT go here

- Per-component styles — co-locate with the component (`components/scene-editor/scene-editor.module.css`).
- Generic-primitive styles — `@sse/ui`.
