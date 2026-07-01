# 2026-07-01 — Philip Glass Tracker prototype (+ genesis-screenshot provenance)

## What & why
Ship a self-contained, screen-recordable prototype that renders the play as a **living
speech-score**, matching the source Kindle pages. Also fix a root provenance gap: the 7 genesis
screenshots that seeded this repo were only referenced in `dramaturgist-tuning-markdown-archive`
metadata, never committed.

## Shipped this pass
- `apps/web/public/prototypes/philip-glass-tracker.html` — single-file, zero-dependency prototype
  (vanilla JS + Web Audio synth). Four voice-columns `FIRST WOMAN · SECOND WOMAN · GLASS · BAKER`;
  playhead descends; each `$PHRASE_EVENT` illuminates + sounds as it is struck. Arc mirrors the
  play: **Readable → Phase → Fragment → Unison**. Kindle aesthetic (warm serif on dark slate).
  134 rows, 183 events. Opens offline (`file://`); also served by `next build` from `public/`.
- `dramaturgist-tuning-markdown-archive/source-attachments/` — the 7 recovered genesis images
  + `README.md` provenance index. Recovered from the `T7Recovery` transcript backup.

## Design source of truth
The Kindle screenshots (now in `source-attachments/`): David Ives already typesets the climax as a
four-column score that phases and converges to unison. The prototype performs that page.

## Not yet (follow-ups)
- Port the same logic into the Next App Router route `apps/web/src/app/prototypes/philip-glass-tracker/`
  (shared `core/` per the design), then run the gate matrix (`biome check .`, `tsc --noEmit`,
  `next build`) and open PR → merge. Deferred until the standalone look is confirmed.
- Audio arc (user's larger vision): pluggable voice-source layer — synth (shipped) → real samples
  → phoneme-recomposition (recorded consonant/vowel granular reassembly) → neural voice models.
- Do NOT add: version history, diagnostics, share links, screenshot parsing, auth, DB.
