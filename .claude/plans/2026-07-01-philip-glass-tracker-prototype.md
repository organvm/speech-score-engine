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

## Shipped pass 2 — fluid layout + neural voices
- **Fluid layout**: dropped the fixed 9:16 frame; fills the viewport and reflows on resize
  (`clamp()` typography, `minmax(0,1fr)` columns, `overflow-wrap`) so each voice stays in its lane.
- **Real neural voices**: `philip-glass-voices.js` (generated, `window.SSE_VOICES`) — 53 clips, one
  per (character, line), rendered by **Microsoft Edge neural TTS** (`edge-tts`, local/free/no key).
  Four distinct actors: First Woman=en-US-Aria, Second Woman=en-GB-Sonia, Glass=en-US-Andrew,
  Baker=en-GB-Ryan. Loaded via `<script>` tag (works over `file://`; `fetch` is blocked there).
- **Tracker audio engine**: clips play as Web Audio buffers — **polyphonic** (many at once, fixes the
  monophonic Web-Speech limitation) and **zero-latency** (fixes the synth-on-demand lag). Each trigger
  is **humanized** (micro detune, timing jitter, gain/velocity, subtle LFO) and **panned** per channel,
  and leading silence is trimmed at playback. Web Speech / tones remain as fallbacks.
- Generator committed at `tools/render-philip-glass-voices.mjs` (bootstraps its own venv); the 570 KB
  data blob + `tools/` are biome-ignored. Gate: `biome check .` (1.9.4) passes.

## Not yet (follow-ups)
- **Distinct cast from real reference reads** (user's recorded-human vision): swap the source to a
  zero-shot cloning model (e.g. Chatterbox) driven by 4 reference clips he provides/records, so the
  four voices are specific real people. Pipeline + player already support it — only the render source
  changes. (Chatterbox via HF ZeroGPU was rate-limited when attempted anonymously.)
- Port the same logic into the Next App Router route `apps/web/src/app/prototypes/philip-glass-tracker/`
  (shared `core/`), run the full gate matrix (`tsc --noEmit`, `next build`), open PR → merge.
- Phoneme-recomposition tier (granular reassembly of recorded consonants/vowels).
- Do NOT add: version history, diagnostics, share links, screenshot parsing, auth, DB.
