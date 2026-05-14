# Plan: Cluster-route the 20 speech-score-engine root strays into `_agent-ontology`, reframe the CLAUDE.md edit

> **Filename note**: The harness auto-generated `drifting-sprouting-ripple.md`. Per the user's `~/.claude/CLAUDE.md` memory rule #13 ("name by content, never auto-generated random words"), this plan should be **renamed to `2026-05-14-cluster-route-speech-score-strays-into-agent-ontology.md`** and copied into `/Users/4jp/Code/speech-score-engine/.claude/plans/` as part of execution. The home-scope copy can stay (the home CLAUDE.md keeps a global plan history).

## Context

The user undertook a frantic cross-tool search for potentially-deleted plans and transcripts. The search concluded with confirmation: **nothing is missing** from the three active workspaces in scope:

- `/Users/4jp/Workspace/composition-1-2` — Broward College composition-pedagogy workspace (ENC1101 / ENC1102). Has its own CLAUDE.md, manifest.yaml, and `~/.claude/plans/please-digest-100-of-serialized-brook.md` plan history. Not directly involved here.
- `/Users/4jp/Code/_agent-ontology` — **"workbench for mapping, governing, and unifying multi-agent local environments"** (its README's own framing). Holds an 8-phase protocol, cross-provider audit runs (Claude, Gemini, OpenCode, Codex), and **a `STRAY-PLANS-REGISTRY.md` at the root**. Not yet a git repo. This is the cluster's stray-state governance home.
- `/Users/4jp/Code/speech-score-engine` — the dramaturgical-audio workbench we've been working on. Currently has **20 untracked files at root** that look like project drift but are actually cluster-cross-pollination from the search activity.

During the search, the user "brought those in" — pulled artifacts from various tool persistence trees (`~/.local/share/opencode/`, `~/.codex/`, `~/.local/share/gemini/`, `~/Downloads/<chatgpt-export>/`, etc.) into speech-score-engine's root for inspection. Three confirmed facts from Phase 1 forensics:

1. **18 of 20 strays have no byte-identical copy anywhere on the filesystem** (verified by SHA-1 hash sweep across `~/.local/share`, `~/.codex`, `~/.claude`, `~/.cache`, `/tmp`). They were CREATED at speech-score-engine root by tool invocations; they didn't migrate FROM somewhere recoverable.
2. **The 2 inventory duplicates ARE recoverable** — `dramaturgist-tuning-conversation-inventory.{md,tsv}` at speech-score-engine root has byte-identical siblings at `dramaturgist-tuning-markdown-archive/codex-conversation-inventory.{md,tsv}` AND `~/Downloads/0d965e16.../dramaturgist-tuning-conversation-inventory.tsv` (a ChatGPT user-data-export from 2026-04-23 containing 2295 conversation dirs).
3. **The Trash contains `~/.Trash/dramaturgist-tuning-markdown-archive/`** (modified May 13 13:31). At some point that day the archive was deleted; the current archive subdir in the repo is presumably a re-recovery. Not a current loss — surfaces the past deletion event as evidence the user is right to worry about cross-tool deletions going unnoticed.

The CLAUDE.md edit I already shipped (six edits applied in the prior turn) framed these strays as **"working drift at root"** with a `gitignore-by-default` recommendation. **That framing is now wrong.** The strays are research material that has a real home in `_agent-ontology` — the project explicitly built for this purpose. Treating them as drift would (a) lose the connection to the audit work, (b) miss the existing `STRAY-PLANS-REGISTRY.md` convention, and (c) misroute future cluster-cross-pollination.

The intended outcome of this plan: **route the strays to their proper cluster home, correct the speech-score-engine CLAUDE.md framing, and surface the cross-tool recovery instrument as IRF work inside `_agent-ontology`** (where it belongs by scope), building on the predecessor topology survey at `~/.local/share/opencode/plans/2026-05-13-agent-context-directory-research.md`.

## Recommended approach

### Step 1 — Read `_agent-ontology`'s governance state in full

Critical files (read-only; nothing depends on these being writable):

- `/Users/4jp/Code/_agent-ontology/README.md` — 8-phase protocol; section anchors include "Stray-File Registry" and "Audit Runs"
- `/Users/4jp/Code/_agent-ontology/STRAY-PLANS-REGISTRY.md` — confirm the registry's schema (what fields each entry carries; how stray plans/files are tracked)
- `/Users/4jp/Code/_agent-ontology/sessions/` — directory structure; understand what "session" means here (likely the right home for `*-session-atoms-context.json` files)
- `/Users/4jp/Code/_agent-ontology/archives/` — what's currently archived; the precedent for relocating extracted material
- `/Users/4jp/Code/_agent-ontology/conventions/` — any naming/placement rules
- `/Users/4jp/Code/_agent-ontology/.agents/` — audit-run framework

Do not modify any `_agent-ontology` file in this step.

### Step 2 — Classify each of the 20 strays by cluster destination

Source data (SHA-1 hashes verified in Phase 1; preserve as evidence):

| File at speech-score-engine root | SHA-1 | Classification |
|---|---|---|
| `codex-app-schema/` (79 ts-rs generated `.ts`) | (dir) | → `_agent-ontology/archives/codex-cli-protocol-bindings--2026-05-13/app-schema/` |
| `codex-app-schema-json/` (37 JSON Schema) | (dir) | → same parent as above, `app-schema-json/` |
| `codex-app-server*.{ts,json}` (0 bytes each) | empty | **delete** — abortive output stubs |
| `codex-generate-*.{err,out}` (0 bytes each) | empty | **delete** — empty stdout/stderr redirects |
| `codex-models.json` (197 KB) | `3faa6da5...` | → `_agent-ontology/archives/codex-cli-protocol-bindings--2026-05-13/` |
| `codex-prompt-input.json` (67 KB) | `a729b07f...` | → same |
| `codex-prompt-input-after.json` (67 KB) | `f6226888...` | → same |
| `codex-prompt-input-after.err` (0 bytes) | empty | **delete** |
| `codex-session-atoms-context.json` (1.8 KB) | `6053fa00...` | → `_agent-ontology/sessions/2026-05-13/codex-atoms-snapshot.json` |
| `claude-session-atoms-context.json` (1.8 KB) | `6053fa00...` | **byte-identical to codex- version above**; pick one canonical, drop the other. Recommend → `_agent-ontology/sessions/2026-05-13/atoms-snapshot.json` (drop the per-tool prefix since they're the same artifact) |
| `session-atoms-context.json` (0 bytes) | empty | **delete** — aborted write |
| `hooks.pretty.json` (16 KB) | `098c53b0...` | → `_agent-ontology/archives/claude-hooks-snapshot--2026-05-13.json` (note: this is STALE — missing the SessionEnd category present in current `~/.claude/settings.json .hooks`. Archive it as a historical snapshot, don't expect parity with current source.) |
| `sse-ontology-era1.md` (55 KB, covers dt-01 → dt-04) | `247023f8...` | → either `_agent-ontology/archives/dramaturgist-tuning-ontology-extracts/` (if these are domain-ontology research relevant to the agent-ontology workbench) OR `speech-score-engine/dramaturgist-tuning-markdown-archive/derived/` (if these are project-specific archive derivations). **Ask user** — both are defensible. |
| `sse-ontology-era2.md` (40 KB, dt-05 → dt-07) | `91a6e06a...` | same decision as era1 |
| `sse-ontology-era3.md` (38 KB, dt-07-008 → dt-09) | `886ec103...` | same decision as era1 |
| `sse-tokens.txt` (10 KB, 526 `$`-tokens) | `5455ab66...` | same decision as era1 |
| `dramaturgist-tuning-conversation-inventory.md` (2.7 KB) | `651f50ca...` | **delete from root** — byte-identical to `dramaturgist-tuning-markdown-archive/codex-conversation-inventory.md`. Archive is canonical. |
| `dramaturgist-tuning-conversation-inventory.tsv` (13 KB) | `58df1cd6...` | **delete from root** — byte-identical to BOTH the archive copy AND the `~/Downloads/0d965e16.../` ChatGPT export source. Three copies elsewhere; root copy is redundant. |

**Default disposition summary**: ~11 paths to `_agent-ontology/archives/`, 2 to `_agent-ontology/sessions/`, 5 empty files to delete, 2 inventory duplicates to delete. **4 SSE-ontology files** need a user decision on home (agent-ontology vs. dramaturgist-tuning archive).

### Step 3 — Update `_agent-ontology/STRAY-PLANS-REGISTRY.md`

After reading the registry's schema in Step 1, add entries for the relocated material (one entry per file or per logical group). The entries serve as the lineage record — future agents inspecting the cluster know these artifacts came from speech-score-engine's root during the 2026-05-13/14 search activity. Anchor each entry to its original mtime and to this plan file by path.

### Step 4 — Reframe speech-score-engine `CLAUDE.md` — REPLACE the "Untracked working artifacts" section

The current section (just shipped in the prior turn) describes a generic "working drift" pattern and recommends gitignore-by-default. **Replace** with a cluster-aware section:

- One paragraph: the speech-score-engine repo is part of a 3-project cluster (composition-1-2, _agent-ontology, speech-score-engine). When cross-tool artifacts accumulate at this repo's root from search/audit activity, the canonical home is `_agent-ontology` (not gitignore).
- Brief pointer to `_agent-ontology/STRAY-PLANS-REGISTRY.md` as the authoritative registry for stray cluster material.
- Updated etiquette: if you find tool spillover at this root, classify by cluster destination first; gitignore is a last resort.

### Step 5 — File an IRF entry for the cross-tool recovery instrument (durable)

In `_agent-ontology/` (or whichever IRF surface governs that workbench), add an entry that:

- **Names the gap**: the OpenCode topology plan inventoried 514 plans / 53 transcripts / 826 memory files / 521 session snapshots across the tools but did NOT build a recovery/discovery instrument. The cluster has no `agent-context-search <keyword>` surface; deletions are caught only by frantic manual search.
- **Sizes the instrument**: minimum viable is a single CLI that greps content across `~/.claude/projects/*/memory/`, `~/.claude/plans/`, `~/.local/share/{opencode,gemini}/`, `~/.codex/{history.jsonl,logs_2.sqlite,archived_sessions/}`, optionally `~/Downloads/<chatgpt-export>/`. Builds on the topology survey, doesn't duplicate it.
- **Anchors the rationale**: the 2026-05-13/14 frantic-search session is the documented motivation; this plan file is the trigger.

### Step 6 — Optional: `git init` `_agent-ontology/`

The `_agent-ontology` repo has no `.git/`. Files exist locally only — violates Universal Rule #2 ("Nothing local only"). Whether to init-and-track now or defer is the user's call. The README hints at "audit runs" being published; that's only possible once the repo is tracked.

## Critical files

- `/Users/4jp/Code/_agent-ontology/README.md` — read for protocol context
- `/Users/4jp/Code/_agent-ontology/STRAY-PLANS-REGISTRY.md` — registry schema to extend
- `/Users/4jp/Code/_agent-ontology/sessions/` — destination for session-atoms artifacts
- `/Users/4jp/Code/_agent-ontology/archives/` — destination for codex-cli protocol bindings + claude-hooks snapshot
- `/Users/4jp/Code/speech-score-engine/CLAUDE.md` — section to replace (lines 92-104 approximately, the "Untracked working artifacts at root" section I just shipped)
- `~/.local/share/opencode/plans/2026-05-13-agent-context-directory-research.md` — predecessor topology survey to cite
- `~/Downloads/0d965e16...../` — confirmed ChatGPT export source for the inventory duplicates; don't touch
- `~/.Trash/dramaturgist-tuning-markdown-archive/` — past-deletion evidence; leave in place as historical record

## Reused conventions / existing infrastructure

- **`STRAY-PLANS-REGISTRY.md` in `_agent-ontology`** — already exists; new entries follow its schema rather than inventing a new tracking surface.
- **The "archives/" + "sessions/" subdirectory pattern in `_agent-ontology`** — already established; the relocated material slots into existing structure.
- **Speech-score-engine's `dramaturgist-tuning-markdown-archive/derived/` pattern** — implied by my prior CLAUDE.md edit (Option B for sse-ontology files); decision pending.
- **Home-scope `~/.claude/plans/` for cluster-spanning plans** — this file lives there because it spans 2+ projects; per-project copies go in each project's `.claude/plans/`.
- **Cross-agent etiquette in `~/CLAUDE.md`** — the same "read freely, don't delete mid-flight cross-agent state" rule that protected the `bound/.Codex/` tree applies to anything we touch in `_agent-ontology/sessions/` (since that's an active research surface).

## Verification

After execution:

1. **Inventory check**: `cd /Users/4jp/Code/speech-score-engine && git status --short` should show NO codex-*, sse-ontology-*, sse-tokens.txt, *-session-atoms-context.json, hooks.pretty.json, or dramaturgist-tuning-conversation-inventory.{md,tsv} at root.
2. **Destination check**: `ls /Users/4jp/Code/_agent-ontology/archives/codex-cli-protocol-bindings--2026-05-13/` shows the relocated codex-* material. `ls /Users/4jp/Code/_agent-ontology/sessions/2026-05-13/` shows the atoms-snapshot.
3. **Registry check**: `grep -c '^- ' /Users/4jp/Code/_agent-ontology/STRAY-PLANS-REGISTRY.md` count increased by the number of registry entries added.
4. **CLAUDE.md check**: `grep -A2 'Untracked working artifacts' /Users/4jp/Code/speech-score-engine/CLAUDE.md` returns the new cluster-aware section, not the gitignore-by-default framing.
5. **IRF check**: the cross-tool recovery instrument has a tracked IRF entry (or equivalent) inside `_agent-ontology`.
6. **No false deletions**: any of the 4 SSE-ontology files moved to a non-default destination got user approval first.

## Out of scope for this plan

- Building the cross-tool recovery instrument itself (that's IRF work, scoped here only as "file the entry").
- Modifying `composition-1-2` — confirmed clean by user, no action needed.
- `git init` of `_agent-ontology` — flagged as optional; decision deferred to user.
- The dangling git tree `1f21f41f...` in speech-score-engine — Phase 1 inspection showed it's an older snapshot of the same root from before the strays existed. Not a recovery surface. Safe to ignore.
- The 40 archived Codex sessions in `~/.codex/archived_sessions/` (Feb-Mar 2026) — none from the May 13 timeframe; if the live Codex state (history.jsonl, logs_2.sqlite) is the only record of recent Codex work, that's a separate IRF entry (Codex doesn't archive on session-end).
