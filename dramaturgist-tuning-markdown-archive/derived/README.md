---
schema: derived_index
status: archive_derivation
date: 2026-05-13
parent_archive: dramaturgist-tuning-markdown-archive/
origin: speech-score-engine repo root
relocated: 2026-05-14
plan-of-record: .claude/plans/2026-05-14-cluster-route-speech-score-strays-into-agent-ontology.md
---

# Derived ontology — dramaturgist-tuning archive

Curated ontology extractions derived from the canonical archive at `../sources/` and the 36 chat-pair files at `../dt-NN-MMM--*.md`. Each component entry in the era files cites the specific `dt-NN-MMM` canvas file where the concept was first defined or mentioned.

## Contents

| File | SHA-256 | Bytes | Coverage |
|------|---------|-------|----------|
| `sse-ontology-era1.md` | `e38236ba76e9467946a19a6079c0dd7332b2e487bb5b72d22bc1be8a2e253539` | 55156 | dt-01 → dt-04 (Definition / Formalization) — Components, Services, Modules, Concepts, Frameworks |
| `sse-ontology-era2.md` | `f5be5231defac644d8c1750e22b9f837159f0d2e705671d03ed181864d0c7604` | 40102 | dt-05 → dt-07 (Tracker / Audio / Voice Synthesis Feasibility) |
| `sse-ontology-era3.md` | `14805bab476f1066485aad7742361c0d726cba630bea6cef0d69ad19e45c205a` | 38007 | dt-07-008 → dt-09 (Prompt Freedom / Governance / Discrepancy) |
| `sse-tokens.txt` | `faa226c12420e6472f6fb8f20425fa7dc415b03f8c456c8d68afcf91145b7f21` | 9732 | 526 `$`-prefixed domain-ontology tokens extracted from the archive, alphabetical, one per line |

## What these are NOT

- **Not canonical archive content** — that lives in `../sources/` (SHA-1-frozen, byte-locked per `SOURCES-INDEX.md`).
- **Not template placeholders** — the `$`-tokens in `sse-tokens.txt` are domain ontology per the load-bearing invariant in `/Users/4jp/Code/speech-score-engine/CLAUDE.md` (item 2 of "Load-bearing invariants").
- **Not auto-regeneratable** — these are curated extractions with citations; not mechanical output of a script.

## Provenance

Original location (mtime May 13 16:16–16:21):

- `/Users/4jp/Code/speech-score-engine/sse-ontology-era1.md`
- `/Users/4jp/Code/speech-score-engine/sse-ontology-era2.md`
- `/Users/4jp/Code/speech-score-engine/sse-ontology-era3.md`
- `/Users/4jp/Code/speech-score-engine/sse-tokens.txt`

Relocated here 2026-05-14 per the cluster-route execution. SHA-256 verified preservation.

## Why this directory exists

The parent archive (`../`) is byte-frozen for provenance per `SOURCES-INDEX.md`. Derived work — ontology extractions, distillations, cross-canvas indexes — needs a home alongside the canonical sources without polluting them. This `derived/` subdirectory is the convention introduced in the 2026-05-14 cluster-route plan; the speech-score-engine `CLAUDE.md` "Cross-cluster artifact drift" section names it as the destination for archive-derived ontology.

Future additions to this directory should follow the same pattern: a per-file SHA-256 entry in this README, an mtime-anchored provenance line, and a brief description of coverage / what's being derived.
