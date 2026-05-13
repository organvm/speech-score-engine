# Product docs

Verbatim copies of the design canvases from the ChatGPT project "dramaturgist-tuning" (project key `g-p-69c6e425347c81918dfba984fb76206c`, recovered 2026-05-13). The full provenance chain — including the source ProjectSave IDs, source conversation IDs, and SHA-1 hashes for each canvas — lives at `dramaturgist-tuning-markdown-archive/sources/SOURCES-INDEX.md`.

These files are the **canonical reasoning layer behind the code** (blueprint §3). Treat them as durable specification. If the code diverges from a canvas in a way that matters, write an ADR explaining the divergence rather than editing the canvas.

## Read order

For a new engineer onboarding to the implementation, the most useful read order is:

1. **`speech-score-engine-overview.md`** — what the system is and is not.
2. **`speech-score-terminology-charter.md`** — the lexicon: `$PHRASE_EVENT`, `$COMPOSITION_LAYER`, etc.
3. **`speech-score-system-definition.md`** — formal definition + system boundary.
4. **`mvp-spec.md`** — the bounded first version (what we're building first).
5. **`system-design-package.md`** — the architecture in depth.
6. **`repository-blueprint-handoff-package.md`** — repository layout, migrations, contracts. This is the implementation-handoff document; the scaffold tracks it directly.
7. **`dialogue-audio-studio-architecture.md`** — the product surface around the engine.
8. **`tracker-ableton-speech-workstation.md`** — the tracker/Ableton paradigms that inform the interaction model.

The remaining files (`speech-score-engine-system.md`, `speech-performance-engine-concept.md`, `predicting-performance-engine-goals.md`, `dialogue-audio-workbench-pitch.md`, `lexicon-and-style-guide.md`) are earlier or adjacent framings retained for provenance and lateral reference.

## Source-of-truth chain

The canvases here are copies. The SHA-1-tracked originals live at `dramaturgist-tuning-markdown-archive/sources/`. If a discrepancy emerges between a copy here and the original there, the `sources/` version wins and this copy gets re-synced.
