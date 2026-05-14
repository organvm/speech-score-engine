---
type: plan
date: 2026-05-13
slug: claudemd-reconcile-and-strays-triage
status: in-progress
scope: repo
authority:
  - "~/.claude/CLAUDE.md (Universal Rule #5: plans are artifacts)"
  - "project CLAUDE.md → Plan discipline section"
generated-by: /multi-agent-workforce-planner
relates-to:
  - "/Users/4jp/Code/speech-score-engine/CLAUDE.md (target of reconcile)"
  - ".claude/plans/2026-05-13-scene-crud-and-parser-slice.md (active §13 plan-of-record)"
  - ".claude/plans/2026-05-13-closeout-v3.md (last shipped Wave 1)"
---

# CLAUDE.md reconcile + root-level strays triage

## Epic

Reconcile `/Users/4jp/Code/speech-score-engine/CLAUDE.md` against verified disk state
(2026-05-13) and classify the 20 untracked root-level artifacts as
`commit` / `.gitignore` / `mv` / `delete` / `keep-local`.

## Verified gaps in current CLAUDE.md (vs. disk, 2026-05-13)

| CLAUDE.md claim | Disk reality | Action |
|---|---|---|
| "Repo root is now clean" | 20 untracked files at root | Replace claim with a working-drift subsection |
| Enumerates 2 of 7 plans | `.claude/plans/` has 7 files | Drop enumeration; instruct to read the dir |
| Implies API has only `/health`, worker has no handlers, no impl | Wave 1 (`packages/domain/src/`) shipped in commit `6074094` | Add §13 progress paragraph |
| No mention of `.serena/` | `.serena/` is tracked (commit `6bbd5dc`) | Add one-line note |
| `pnpm --filter` invocation undocumented | Used internally in root `package.json` | Add command snippet |
| Migration immutability rule implied (ADR 0004), not surfaced | — | Add explicit rule |
| Domain-package import boundary undocumented | `packages/domain/src/` is runtime-neutral | Add boundary rule |
| No mention that no test runner is installed | No Vitest/Playwright in `package.json` | Add brief note |

## Workstreams

### A. Strays Investigation (5 parallel Explore agents — Phase 1)

| ID | Cluster | Files | Output |
|---|---|---|---|
| A1 | `codex-*` (9 paths) | `codex-app-schema/`, `codex-app-schema-json/`, `codex-app-server*.{ts,json}`, `codex-generate-*.err`, `codex-models.json`, `codex-prompt-input*.json`, `codex-session-atoms-context.json` | Origin + per-file disposition |
| A2 | sse-ontology (4 files, ~140 KB) | `sse-ontology-era{1,2,3}.md`, `sse-tokens.txt` | Derivable? Where does it belong? |
| A3 | session-atom snapshots + hooks dump | `session-atoms-context.json` (empty), `claude-session-atoms-context.json`, `codex-session-atoms-context.json`, `hooks.pretty.json` | Diff + provenance + disposition |
| A4 | Inventory duplicate at root | `dramaturgist-tuning-conversation-inventory.{md,tsv}` | Diff vs. in-archive copies; classify |
| A5 | Plan-context survey | All 7 files in `.claude/plans/` | Which strays are accounted for, which are orphaned |

### B. CLAUDE.md additive drafts (composed in C2 — no separate agent)

- B1: §13 slice progress paragraph
- B2: `.serena/` note
- B3: `pnpm --filter` snippet
- B4: Migration immutability rule
- B5: Domain-package import boundary
- B6: "No test runner installed yet"
- B7: Replacement for partial plan enumeration

### C. Synthesis + Edit (sequential, gated on A)

- C1: Classification table for the 20 strays + draft "Untracked working artifacts" subsection (Plan agent)
- C2: One coordinated Edit pass on CLAUDE.md (Edit; main thread)
- C3: **Gated on user approval** — execute classifications (`git add` / append `.gitignore` / `mv` / `rm`). Never auto-commit.

## Dependency graph

```
A1 ┐
A2 ┤
A3 ├──→ C1 (classification + subsection) ──→ C2 (apply all edits) ──→ C3 (gated)
A4 ┤                                            ↑
A5 ┘                                            │
                              B1...B7 ──────────┘ (composed inside C2)
```

## Phases

| Phase | Concurrent | Wall-clock |
|---|---|---|
| 1 | A1-A5 (5 parallel) | ≤ 10 min |
| 2 | C1 | ~ 5 min |
| 3 | C2 (B1-B7 composed inline) | ~ 8 min |
| 4 | C3 (gated) | ~ 3 min |

## Hard rules

- **Do not commit unprompted** (project CLAUDE.md "What NOT to do here").
- **No destructive ops without explicit user approval** of the C1 classification table.
- **Default disposition for inter-agent staging is `.gitignore` + keep-local**, mirroring the `bound/.Codex/` etiquette in `~/CLAUDE.md`. Mid-flight Codex session state must not be deleted.
- **No file under `dramaturgist-tuning-markdown-archive/` is reformatted** — provenance is load-bearing.

## Success criteria

- CLAUDE.md no longer asserts "Repo root is now clean."
- Plan discipline section instructs reading `.claude/plans/` rather than reciting filenames.
- §13 Wave 1 status is discoverable from CLAUDE.md, not just from git log.
- Every root-level stray has a documented disposition.
- No file moved/deleted without user authorization of the classification table.
