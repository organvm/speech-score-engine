# Source attachments — the genesis screenshots

These are the **7 original images** that seeded this repo: attached to the first prompt of the
ChatGPT project *dramaturgist-tuning* (conversation "Theatrical-Musical Composition System",
2026-03-27), *"Ingest these photos; predict what you think i want to build."*

They were previously **only referenced** in `../00-manifest.json` / the `dt-01-001` pair metadata
(attachment IDs + a share URL), never committed — a provenance gap for a repo that calls itself a
"provenance-preserving design corpus." Recovered 2026-07-01 from the session-transcript backup on
the `T7Recovery` volume and committed here so the root is preserved for good.

The play is David Ives' **"Philip Glass Buys a Loaf of Bread"** (from *All in the Timing*). The
Kindle pages show the piece behaving as a **speech-score**: dialogue starts as prose, becomes a
four-column score (`FIRST WOMAN · SECOND WOMAN · GLASS · BAKER`), phrases repeat and phase, then
fragment into single words, then converge to unison. That structure is the model for the prototype
at `apps/web/public/prototypes/philip-glass-tracker.html`.

| File (stem) | px | bytes | What it shows |
|---|---|---|---|
| `file_00000000a9c871…` | 864×1536 | 228,904 | Kindle p.1 — **opening**: stage directions (italic) + the recognizable exchange (character: line) |
| `file_000000008bd871…` | 864×1536 | 135,108 | Kindle — **phase**: staggered ostinati; each voice repeats its phrase in blocks, then locks |
| `file_00000000ed4871…` | 864×1536 | 141,526 | Kindle — **fragment**: phrases atomize into single words ("Philip"/"a", "think"/"is", "loaf"/"bread") |
| `file_000000001e8471…` | 864×1536 | 142,474 | Kindle — **unison**: all four columns converge on the same word, landing on "loaf of bread" |
| `file_00000000356871…` | 864×1536 | 160,759 | Kindle — **resolution**: back to sparse prose, ends "(A bell rings.)" |
| `file_0000000047ec71…` | 707×1536 | 585,454 | WhatsApp exchange — the timing/coordination/performance discussion (per `dt-01-001`) |
| `file_00000000e82471…` | 707×1536 | 544,529 | WhatsApp exchange (cont.) |

*(Page-order and section labels above are a reading of the images; the WhatsApp pair is identified
from the `dt-01-001` response, which cites "the WhatsApp exchange" as the clearest signal. Filenames
are kept verbatim to match `00-manifest.json`.)*
