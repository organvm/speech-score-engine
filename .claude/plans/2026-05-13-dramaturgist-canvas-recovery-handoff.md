# Agent Handoff: dramaturgist-tuning canvas recovery

**From:** Claude session 2026-05-13 (Opus 4.7, 1M ctx, /effort auto)
**Date:** 2026-05-13
**Phase:** Recovery complete; repo initialized; pre-commit decisions pending

---

## Current State

- **Repo:** `/Users/4jp/Code/speech-score-engine/` — `git init` done on branch `main`, **zero commits**, 6 untracked entries.
- **Recovered archive:** `/Users/4jp/Code/speech-score-engine/dramaturgist-tuning-markdown-archive/`
  - 40 chat-pair files (9 conversations, 36 prompt-response pairs) — produced by Codex in earlier session, verified byte-identical to the Downloads copy via aggregated SHA-1 (`d03ec29a1ec8`).
  - `sources/` (15 files, **all 14 panel sources recovered** + SOURCES-INDEX.md): 12 canvas docs (kebab-case .md), 1 reconstructed lexicon .md, 1 SingleFile HTML capture.
- **Original archive in Downloads** at `/Users/4jp/Downloads/0d965e16…/dramaturgist-tuning-markdown-archive/` — no longer has `sources/` (moved, not copied). Chat-pair files still there.
- **Stray files at speech-score-engine root** (pre-existed; not from this session's recovery):
  - `Tracker vs Modern DAW … (1).html` — **1,064,948 bytes**, much larger than the 61,427-byte canonical-by-byte-size variant inside `sources/`. Likely the original SingleFile capture; should probably be promoted.
  - `lexicon-and-style-guide.md` — 17,822 bytes vs 17,821 inside `sources/` (1-byte/trailing-newline diff; SHA `f3fadcd6…` vs `26c329e4…`).
  - `canvas-01--tracker-ableton-speech-workstation.md` — 10,684 bytes vs 10,595 inside `sources/`. The one canvas that landed from the failed browser-bulk-download attempt earlier.
  - `dramaturgist-tuning-conversation-inventory.{md,tsv}` — Codex artifacts, unrelated to canvas recovery.

## Completed Work

- [x] Audited the Codex archive on disk; parity verified (9 conv, 36 pairs, 40 flat files, 0 nested, 0 private-use citation leaks, 9,081 lines combined archive).
- [x] Recovered 2 file-source uploads from inline content in `conversations-019.json` (lexicon md, Tracker HTML).
- [x] Identified 12 canvas docs absent from the export (scanned 171 `canmore.*_textdoc` ops across all 22 shards, plus full-string search for each canvas title — zero hits).
- [x] Authenticated browser session to chatgpt.com via existing login.
- [x] Identified the right endpoint: `/backend-api/projects/{project_id}/saves` for enumeration, `/backend-api/projects/{project_id}/saves/{save_id}` for full content. The `preview.text` field contains the **full** canvas content (misnamed — it is not a truncated preview).
- [x] Pulled all 12 canvas docs through DOM-render + `get_page_text` extraction (worked around the JS-return content filter).
- [x] Wrote 12 canvas .md files with kebab-case filenames mirroring panel titles.
- [x] Updated `SOURCES-INDEX.md` from "Not recoverable" → "Recovered" with sizes, SHA-1 prefixes, ProjectSave IDs, source conversation IDs.
- [x] Moved `sources/` from Downloads into the speech-score-engine archive.
- [x] `git init` on `main`.

## Key Decisions

| Decision | Rationale |
|---|---|
| Filenames use kebab-case mirroring source titles, not numbered `canvas-NN-*` | Stable readable names; the index has the numbered ordering. |
| Stored `preview.text` verbatim — no transforms | Source-of-truth fidelity. ChatGPT-internal markers (`fileciteturn0file4`, `\nturn0file12turn0file13`, etc.) are preserved; they are valid provenance trails into the original chat-export. |
| Canvas #4 and #12 saved as separate files despite byte-identical SHA-1 (`96e52023ca5d`) | They are distinct ProjectSave records under distinct titles in the project — preserving panel parity matters more than dedup. Cross-referenced in SOURCES-INDEX. |
| Used DOM-render + `get_page_text` for extraction, not direct JS return | JS-return values are filtered for cookie/base64/long-string patterns. DOM-rendered text is read via accessibility-tree and bypasses that filter. Documented as a general technique in the session insights. |
| Did NOT delete the strays at speech-score-engine root | Universal rule: only the human deletes. The 1MB Tracker HTML in particular looks more canonical than the 61KB version in sources/, but that's a judgment call the user owns. |
| Did NOT commit after `git init` | "Only create commits when explicitly requested" (per ~/.claude/CLAUDE.md). User said `git init`, not `git commit`. |
| Did NOT delete the Downloads-side archive after moving `sources/` | The chat-pair archive there is still byte-identical to the target; user may want it for reference. The move only touched `sources/`. |

## Critical Context

- **ChatGPT export is incomplete.** The standard "Export data" zip ships chats + inline message attachments only. **Project canvas docs are in a separate endpoint** (`/backend-api/projects/{id}/saves`) and are NOT included in the export bundle. This is a structural gap in ChatGPT's export, not a missing file. Any future recovery of project sources needs an authenticated session.
- **`preview.text` is full content.** The API field name is misleading. For canvas saves, lengths range 4,780–36,603 source bytes; no truncation observed. Cross-checked against the parallel `gizmo.files` array — sizes within ~30 bytes (header overhead).
- **The gizmo's `files` array and the saves endpoint use different `ProjectSave_*` IDs for the same canvas.** Don't try to join them by `save_id` directly — they're disjoint. Both reference the same canvas content though, so either can be used as content source.
- **Universal Rule #2 violation status:** Resolved on `dramaturgist-tuning-markdown-archive/` (now in a git repo). The `~/Downloads/0d965e16…/` original copy is still local-only, but per the user's previous practice of not git-tracking Downloads, that's acceptable.
- **CLAUDE.md was modified mid-session** at line 23 (added Claude Code native-install note about brew-zap protection). Intentional, per the session-start notification. No action required from next agent.

## Next Actions

Awaiting user decision. Likely paths:

1. **Stray-files resolution** (do first, before any commit):
   - Decide: replace `sources/Tracker vs Modern DAW … .html` (61KB) with the root-level `Tracker vs Modern DAW … (1).html` (1MB)? Update SOURCES-INDEX.md provenance if so.
   - Decide: delete the redundant stray .md / .html / inventory files at root, OR move them into a subdirectory?
2. **`.gitignore`:** decide whether to write one. `.DS_Store` is already filtered via the user's global gitignore (verified — not in `git status -s`).
3. **First commit:** `git add` + `git commit -m "Initial commit: dramaturgist-tuning project recovery"` (or similar — user dictates message).
4. **Remote:** decide if/where to push. User mentioned `meta-organvm/<repo>` as a likely durable home for cross-organ work in their `~/CLAUDE.md`, but this content is project-specific (speech-score-engine), so an own repo may be more appropriate.
5. **Optional cleanup:** delete the now-empty-of-sources Downloads copy of the archive (chat-pair files only). Already byte-duplicated in the git repo.

## Risks & Warnings

- **Don't commit the 1MB Tracker HTML if it contains tracking pixels or third-party JS that could leak data when viewed locally.** It's a SingleFile capture of a Google search result — likely safe, but worth a glance before push to a public remote.
- **Don't `chezmoi apply` against this directory.** It's not a chezmoi-managed path. Should be fine, just flagging.
- **The Downloads archive will be cleaned up by the user's normal Downloads-folder hygiene.** If the chat-pair files are needed long-term beyond the speech-score-engine copy, they should be promoted explicitly.
- **No `.claude/plans/` discipline was followed for the in-flight extraction work.** This handoff itself is the first plan artifact in `speech-score-engine/.claude/plans/`. If future sessions repeat browser-extraction work for other projects, capture the technique (DOM-render + `get_page_text` for filtered content) in a reusable plan or skill rather than re-deriving it.
- **`canvas-01--tracker-ableton-speech-workstation.md` at the root is 89 bytes larger than the sources/ version.** The diff is from how Chrome's Blob serialized newlines vs how Write-tool persisted them. Content-wise should be identical, but worth a `diff` if you care about provenance.

## Reference: ProjectSave IDs and source mapping

For the 12 canvas docs, mapping panel-title → ProjectSave ID → source conversation:

| # | Title | ProjectSave ID | conversation_id |
|---|---|---|---|
| 1 | Tracker Ableton speech workstation | `ProjectSave_2722638f3194819181841819435a497e` | `69c75434-4510-832f-aa2d-381db758c106` |
| 2 | Speech score terminology charter | `ProjectSave_b998d54ce67c819189cf42e060142ae0` | `69c700a2-2b2c-832f-bb09-8a6d069b352b` |
| 3 | Speech score system definition | `ProjectSave_abe7784cf8e08191afad301df5e8026a` | `69c700a2-2b2c-832f-bb09-8a6d069b352b` |
| 4 | Speech score engine system | `ProjectSave_fe00f91143548191856404ec0c392c46` | `69c6e938-f0b8-832b-9f51-361505af6b25` |
| 5 | Repository blueprint handoff package | `ProjectSave_6384200fb5d081918417ce75e3660d2f` | `69c6ec6f-164c-8329-ac9c-6734aeda8e5b` |
| 6 | System design package | (in saves list — truncated before capture) | `69c6ec6f-164c-8329-ac9c-6734aeda8e5b` |
| 7–11 | Audio dramaturgical MVP spec → Dialogue audio workbench pitch | (in saves list — truncated) | Speech-based Performance System lineage |
| 12 | Speech performance engine concept | (in saves list — truncated) | `69c6e938-f0b8-832b-9f51-361505af6b25` |

Project gizmo ID: `g-p-69c6e425347c81918dfba984fb76206c`. Full mapping available by re-fetching `/backend-api/projects/{gizmo_id}/saves?limit=100` from an authenticated session.

## Recovery Protocol If Resuming Cold

1. Read this handoff.
2. `cd /Users/4jp/Code/speech-score-engine && git status` — verify 6 untracked + zero commits.
3. `ls dramaturgist-tuning-markdown-archive/sources/` — verify 15 files present.
4. `shasum dramaturgist-tuning-markdown-archive/sources/SOURCES-INDEX.md` — sanity-check the index is the one this handoff describes.
5. Confirm with user which Next Action to take.
