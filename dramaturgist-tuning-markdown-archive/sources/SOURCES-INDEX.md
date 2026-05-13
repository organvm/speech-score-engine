# dramaturgist-tuning — Project Sources Inventory

Source: ChatGPT project "dramaturgist-tuning" → **Sources** tab (screenshot dated 2026-05-13).

All 14 sources visible in the panel are now recoverable. The 2 file uploads (lexicon, Tracker HTML) were reconstructed from inline conversation content. The 12 canvas docs were pulled directly from the authenticated ChatGPT project via its internal `/backend-api/projects/{project_id}/saves` endpoint on 2026-05-13.

## Recovered file uploads (2)

Reconstructed from inline content in `conversations-019.json`. The actual file uploads themselves were not exported as standalone files; their content was preserved inside the conversation messages that referenced them.

| Source | Date | Origin | Output | Bytes | SHA-1 (12) |
|---|---|---|---|---|---|
| Tracker vs Modern DAW - Google Search (3_28_2026 12:07:50 AM).html | Mar 28, 2026 | conv "Tracker and Ableton Features" → msg `1d92dbb9-e29c-44e9-94b8-c344436c8e86` parts[1] (largest of 12 distinct SingleFile HTML captures across the export — selected by byte size) | `Tracker vs Modern DAW - Google Search (3_28_2026 12-07-50 AM).html` (colon replaced with dash for filesystem safety) | 61,427 | `30e90df9aafd` |
| lexicon-and-style-guide.md | Mar 28, 2026 | conv "Gap Analysis and Merging" → msg `a1760d4e-f7a4-4e0a-bdfe-20a9ad430624` content.text (bash heredoc creating `/mnt/data/lexicon-and-style-guide.md`) | `lexicon-and-style-guide.md` | 17,821 | `26c329e4a3c3` |

## Recovered canvas docs (12)

Pulled from the ChatGPT project's `/backend-api/projects/g-p-69c6e425347c81918dfba984fb76206c/saves` endpoint on 2026-05-13 via authenticated browser session (Anthony Padavano <padavano.anthony@gmail.com>, token valid through 2026-08-11). Each save's full canvas content was returned in the response's `preview.text` field (despite the field name, it contains the full text, not a truncated preview). Filenames are kebab-case mirrors of the source titles.

| # | Source title | Date | Output filename | Bytes | SHA-1 (12) | ProjectSave ID | Source conversation |
|---|---|---|---|---|---|---|---|
| 1 | Tracker Ableton speech workstation | Mar 28, 2026 | `tracker-ableton-speech-workstation.md` | 10,595 | `d4ca0c13fb10` | `ProjectSave_2722638f3194819181841819435a497e` | `69c75434-4510-832f-aa2d-381db758c106` (Tracker and Ableton Features) |
| 2 | Speech score terminology charter | Mar 27, 2026 | `speech-score-terminology-charter.md` | 14,841 | `c938bec2eb0c` | `ProjectSave_b998d54ce67c819189cf42e060142ae0` | `69c700a2-2b2c-832f-bb09-8a6d069b352b` (Speech-based Performance System) |
| 3 | Speech score system definition | Mar 27, 2026 | `speech-score-system-definition.md` | 10,594 | `5c7505dd22a1` | `ProjectSave_abe7784cf8e08191afad301df5e8026a` | `69c700a2-2b2c-832f-bb09-8a6d069b352b` (Speech-based Performance System) |
| 4 | Speech score engine system | Mar 27, 2026 | `speech-score-engine-system.md` | 7,574 | `96e52023ca5d` | `ProjectSave_fe00f91143548191856404ec0c392c46` | `69c6e938-f0b8-832b-9f51-361505af6b25` (Theatrical-Musical Composition System) |
| 5 | Repository blueprint handoff package | Mar 27, 2026 | `repository-blueprint-handoff-package.md` | 29,133 | `5b2202b570bf` | (from `ProjectSave_6384200f...`) | `69c6ec6f-164c-8329-ac9c-6734aeda8e5b` (Branch · Speech-based Performance System) |
| 6 | System design package | Mar 27, 2026 | `system-design-package.md` | 36,046 | `4f6d6eec1d8b` | (from `ProjectSave_...`) | `69c6ec6f-164c-8329-ac9c-6734aeda8e5b` (Branch · Speech-based Performance System) |
| 7 | Audio dramaturgical MVP specification | Mar 27, 2026 | `audio-dramaturgical-mvp-specification.md` | 21,607 | `eecc589d7127` | (from `ProjectSave_...`) | (Speech-based Performance System lineage) |
| 8 | Dialogue audio studio architecture | Mar 27, 2026 | `dialogue-audio-studio-architecture.md` | 15,025 | `8a5f2b9f2403` | (from `ProjectSave_...`) | (Speech-based Performance System lineage) |
| 9 | Speech score engine overview | Mar 27, 2026 | `speech-score-engine-overview.md` | 13,133 | `5b0a7299dd0b` | (from `ProjectSave_...`) | (Speech-based Performance System lineage) |
| 10 | Predicting performance engine goals | Mar 27, 2026 | `predicting-performance-engine-goals.md` | 4,759 | `9948dcc8ab07` | (from `ProjectSave_...`) | (Speech-based Performance System lineage) |
| 11 | Dialogue audio workbench pitch | Mar 27, 2026 | `dialogue-audio-workbench-pitch.md` | 7,469 | `51f7a226ca6d` | (from `ProjectSave_...`) | (Speech-based Performance System lineage) |
| 12 | Speech performance engine concept | Mar 27, 2026 | `speech-performance-engine-concept.md` | 7,574 | `96e52023ca5d` | (from `ProjectSave_...`) | `69c6e938-f0b8-832b-9f51-361505af6b25` (Theatrical-Musical Composition System) |

### Notable duplicate

Canvas #4 (`Speech score engine system`) and canvas #12 (`Speech performance engine concept`) are **byte-identical** (both 7,574 bytes, SHA-1 `96e52023ca5d`). Both are saved from the same source message in conversation `69c6e938-f0b8-832b-9f51-361505af6b25`. The project stored two distinct ProjectSave records over the same content, each with a different human-readable title. Either filename is canonical; the other can be treated as an alias.

## Provenance notes

- The ChatGPT export bundle does **not** include the canvas-doc content. The project-sources endpoint that backs the UI's "Sources" tab is separate from the conversation-export endpoint and is not traversed when you click "Export data." Recovery required hitting that endpoint directly through an authenticated session.
- Authentication: bearer token from `/api/auth/session`, attached to requests to `/backend-api/projects/{id}/saves[/{save_id}]`.
- The `preview.text` field name in the API response is misleading — for these canvas saves it contains the **full** canvas content (4,759 to 36,603 source bytes; on disk 4,759 to 36,046 bytes after UTF-8 encoding). Comparison against the gizmo's parallel `files` array showed file sizes within ~30 bytes of preview lengths, consistent with preview being whole-canvas content plus the same content saved separately as a `.txt` attachment to the parent message.
- Filename normalization: source titles → lowercase, spaces → `-`, no other transformation.
- Two file uploads from the chat-side recovery (lexicon, Tracker HTML) were already on disk from the prior session and were left in place; their entries above are reproduced from the previous index.
- Lexicon body length reported by the heredoc's trailing `ls -l` was 17,822 bytes; extracted body is 17,821 bytes. The 1-byte gap is the trailing newline `ls` counts that the heredoc body itself does not include.
- The "Tracker vs Modern DAW" HTML appears in 12 distinct hash variants across `conversations-019.json` (multiple conversations included the SingleFile capture as an attachment). The 61,427-byte version in "Tracker and Ableton Features" was selected as the canonical source because (a) it is the longest, and (b) the source conversation name matches the Sources-panel filename.

## Full parity summary

Screenshot showed 14 sources. All 14 recovered: 2 file uploads + 12 canvas docs.
