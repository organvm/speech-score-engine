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

## Shipped pass 3 — data-driven engine (L1 of ROADMAP.md)
- The score is now **data, not code**: `apps/web/public/prototypes/scores/<id>.js` register
  `window.SSE_SCORES[id]` = `{ lanes[], events[], sections, tempo, total, ... }`. Lanes carry their
  own casting (neural `voice`, `pan`, `gain`, `tone`, `speech`) and a `performer` (`ai` | `human`).
- The engine (`philip-glass-tracker.html`) derives everything — lane count/grid, headers, tone/pan
  maps, section chips, tempo, title — from the selected score. `?score=<id>` + an in-app picker.
  Philip Glass is preserved byte-identical (still 183 events / 4 lanes).
- Proven multi-play: **richard-and-anne** (2-lane Shakespeare stichomythia) and **earnest-duet**
  (Wilde) ship on the same engine. earnest-duet is the first taste of L5: JACK is `performer:'human'`
  (engine leaves it silent + marks it gold) while ALGERNON is the AI actor.
- Generator generalized: `tools/render-voices.mjs` reads every score and renders each AI lane's lines
  in its assigned neural voice → `voices/<id>.js` (human lanes skipped). Voice blobs biome-ignored.
- Gates green: `biome check .` (67 files, clean); engine compiles; all scores/voices coherent.

## Shipped pass 4 — L2→L5 (the full march)
- **L2** — shared engine core (`tracker-engine.js` + `tracker.css`); standalone HTML is now a thin
  shell over it; Next `/tracker` route injects the same file. `src/types/sse.d.ts`, `TrackerClient`.
- **L3** — the arrangement editor at `/editor`: horizontal timeline, drag clips in time / across
  lanes, add/dup/delete clips + lanes, per-lane AI↔human toggle, Import/Export SCORE JSON, ▶ Perform
  through the shared engine.
- **L4 (partial)** — per-lane neural voice casting (`src/lib/voiceCatalog.ts`); generator renders
  editor-exported `scores/*.json` too (editor→neural loop). Cloning from real reads is **hung** →
  `NEEDS-YOU.md`.
- **L5** — live human+AI performance in the shared engine: **Live cue** (Space advances), count-in,
  loop-a-passage (sections), mute a voice (click header). Chris's two-hander idea, made real.
- Gates green each layer: `biome check .` · `tsc --noEmit` · `next build` · http smoke tests.

## Roadmap / hung items
Full plan (L0–L6) in `ROADMAP.md`; anything needing Anthony collected in `NEEDS-YOU.md`.

## Not yet (follow-ups)
- **L4 cloning** — zero-shot clone specific real voices from ~10s reference reads (needs recordings).
- **L6** — waveform/clip audio editing + phoneme recomposition.
- Small: per-lane solo; MIDI/pedal mapping; one-click in-app render; hosting for a shareable URL.
- Do NOT add yet: auth, DB, accounts, collaboration, cloud storage (see ROADMAP non-goals).
