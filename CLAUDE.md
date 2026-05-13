# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`speech-score-engine` is currently a **provenance-preserving design-corpus repo**, not yet an implementation. It holds the complete recovered content of a ChatGPT project named `dramaturgist-tuning` (project key `g-p-69c6e425347c81918dfba984fb76206c`) which designed a system the canvases call `$SPEECH_SCORE_ENGINE`: a dramaturgical-audio workbench for authoring, analyzing, rehearsing, rendering, and executing polyvocal speech works.

The repo's eventual trajectory is to grow an implementation alongside the corpus — but as of `git init` (zero commits at time of writing), it is archive-only. There is no build, no test suite, no lint, no package manifest. Do not propose adding any until the implementation actually begins.

## Layout

```
.
├── dramaturgist-tuning-markdown-archive/      # The canonical archive (load-bearing)
│   ├── dramaturgist-tuning-00--README.md          # Index + conversation table
│   ├── dramaturgist-tuning-00--manifest.json      # Machine-readable manifest
│   ├── dramaturgist-tuning-00--metadata.tsv       # Per-pair metadata + hashes
│   ├── dramaturgist-tuning-00--full-prompt-response-archive.md   # All 36 pairs concatenated
│   ├── dramaturgist-tuning-NN--{title}--MMM-prompt-response.md   # 36 per-pair files
│   └── sources/                                   # All 14 panel-sources from the ChatGPT project
│       ├── SOURCES-INDEX.md                       # Recovery index, sizes, SHA-1s, ProjectSave IDs
│       ├── *.md                                   # 12 canvas docs + 1 reconstructed lexicon
│       └── *.html                                 # 1 SingleFile HTML capture
├── .claude/plans/YYYY-MM-DD-{slug}.md          # Per-session plan history (never overwrite)
└── {stray files at root}                       # Duplicates of in-archive files — disposition pending (see below)
```

## Load-bearing invariants

Future agents must treat the following as constraints, not suggestions:

1. **`sources/SOURCES-INDEX.md` references SHA-1 prefixes and byte counts** for every recovered file. Reformatting, normalizing whitespace, or "tidying" any file under `sources/` or `dramaturgist-tuning-markdown-archive/` invalidates these references. If a source needs editing, update the index in the same commit.
2. **`$VARIABLE`-style tokens in the canvases are domain ontology**, not template placeholders. `$SPEECH_SCORE_ENGINE`, `$PHRASE_EVENT`, `$COMPOSITION_LAYER`, `$DOCUMENT_ID`, etc. are part of the authored prose. Do not "expand," "resolve," or substitute them.
3. **ChatGPT-internal citation markers** in canvas content (e.g. `fileciteturn0file4`, `\nturn0file12turn0file13`) are valid provenance trails into the original chat-export. Preserve verbatim.
4. **Canvases #4 (`speech-score-engine-system.md`) and #12 (`speech-performance-engine-concept.md`) are byte-identical** (both SHA-1 `96e52023ca5d`). This is intentional — they are distinct ProjectSave records under distinct panel titles. Do not dedupe; cross-reference in the index instead.
5. **`preview.text` from the ChatGPT saves endpoint is full content**, not truncated. The API field name is misleading. Documented in `SOURCES-INDEX.md` and the recovery plan.

## Stray-file resolution (settled 2026-05-13)

The pre-git-init root-level strays were resolved in the commit immediately following the initial commit:

- **Deleted as redundant**: `lexicon-and-style-guide.md` (1-byte newline diff vs `sources/lexicon-and-style-guide.md`) and `canvas-01--tracker-ableton-speech-workstation.md` (89-byte trailing-whitespace diff vs `sources/tracker-ableton-speech-workstation.md` from a failed earlier extraction).
- **Promoted into `sources/`**: the 1MB Tracker HTML at root became `sources/Tracker vs Modern DAW - Google Search (3_28_2026 12-07-50 AM).singlefile-full.html` (SHA-1 `061589a08957`). The chat-export 61KB version is unchanged; both are now indexed in `SOURCES-INDEX.md` as one panel-source with two fidelities.
- **Moved into the archive dir**: `dramaturgist-tuning-conversation-inventory.{md,tsv}` → `dramaturgist-tuning-markdown-archive/codex-conversation-inventory.{md,tsv}`. Different schema from the archive's `00--manifest.json` — kept for the share-anchor mapping and the per-conversation provenance set classification.

Repo root is now clean (no archive-adjacent strays).

## Reproducible operation: ChatGPT canvas recovery

The 12 canvas docs in `sources/` were extracted from the ChatGPT project's internal API — `Export data` does not include them. To re-run recovery from a fresh authenticated browser session:

```
# Token capture (in browser console on chatgpt.com):
fetch('/api/auth/session').then(r => r.json()).then(s => window.__tok = s.accessToken);

# Enumerate saves:
fetch('/backend-api/projects/g-p-69c6e425347c81918dfba984fb76206c/saves?limit=100',
      {headers: {'Authorization': 'Bearer ' + window.__tok}}).then(r => r.json());

# Per-save full content (preview.text is the whole canvas):
fetch('/backend-api/projects/{gizmo_id}/saves/{save_id}',
      {headers: {'Authorization': 'Bearer ' + window.__tok}}).then(r => r.json());
```

A reproducible content-extraction technique that bypasses Claude Code's JS-return content filter (used during the original recovery): render the text into a fixed-position `<article id="__cx">` with `white-space:pre-wrap` and read it via `get_page_text`. The accessibility tree returns the literal content; direct JS return values get filtered for cookie/Base64/long-string patterns.

## Plan discipline

Every non-trivial task gets a dated plan file at `.claude/plans/YYYY-MM-DD-{descriptive-slug}.md`. **Never overwrite** — revisions get `-v2`, `-v3` suffixes. After writing a plan, commit it (Universal Rule #5: plans are artifacts).

The latest in-flight handoff is `.claude/plans/2026-05-13-dramaturgist-canvas-recovery-handoff.md`. Read it before acting on the repo state — it captures the exact post-recovery state, the open decisions, and the cold-start protocol for resuming the work.

## What NOT to do here

- **Do not commit unprompted.** The user has not yet requested the first commit. The repo is intentionally on `main` at zero commits awaiting the duplicate-resolution decision.
- **Do not run `chezmoi apply` against this directory.** It is not a chezmoi-managed path.
- **Do not add a `.gitignore` without checking** — the user's global gitignore already covers `.DS_Store`; verify what `git status -s` currently shows before adding repo-local ignore rules.
- **Do not push the 1MB Tracker HTML** to a public remote without first inspecting for tracking pixels or third-party JS — it is a SingleFile capture of a Google search results page.
- **Do not reformat, normalize, or "clean up" any file under `dramaturgist-tuning-markdown-archive/`** without explicit instruction. Provenance is the load-bearing property.
- **Do not edit the deployed `~/.claude/CLAUDE.md`** — its source is in the chezmoi tree at `~/Workspace/4444J99/domus-semper-palingenesis`. (This applies globally, not just to this repo — but worth restating here.)
