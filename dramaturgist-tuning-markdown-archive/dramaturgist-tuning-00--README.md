# dramaturgist-tuning - Markdown Archive

Flat cleaned Markdown archive for the confirmed `dramaturgist-tuning` ChatGPT project set.

## Contents

- `dramaturgist-tuning-00--full-prompt-response-archive.md`: complete readable Markdown archive.
- `dramaturgist-tuning-00--metadata.tsv`: one row per prompt-response pair with message IDs, counts, hashes, and filenames.
- `dramaturgist-tuning-00--manifest.json`: machine-readable archive manifest.
- `dramaturgist-tuning-NN--conversation-title--MMM-prompt-response.md`: flat per-pair Markdown files.

## Source Boundary

- Project key: `g-p-69c6e425347c81918dfba984fb76206c`
- Source shard: `conversations-019.json`
- Shared anchor: https://chatgpt.com/share/6a04a67e-24c4-83ea-975f-433e6ee42f5a
- Generated UTC: `2026-05-13T16:41:36Z`
- Conversations: `9`
- Prompt-response pairs: `36`

## Conversation Index

| # | Title | Conversation ID | Created UTC | Updated UTC | Pairs |
|---:|---|---|---|---|---:|
| 1 | Theatrical-Musical Composition System | `69c6e4d6-23b4-8328-a4dc-d555365791eb` | 2026-03-27T20:13:41.997401Z | 2026-03-27T22:08:52.246083Z | 2 |
| 2 | Speech-based Performance System | `69c6e938-f0b8-832b-9f51-361505af6b25` | 2026-03-27T20:32:11.495136Z | 2026-03-27T22:07:25.373010Z | 1 |
| 3 | Branch · Speech-based Performance System | `69c6ec6f-164c-8329-ac9c-6734aeda8e5b` | 2026-03-27T20:45:55.928824Z | 2026-03-27T21:48:16.155862Z | 6 |
| 4 | Gap Analysis and Merging | `69c700a2-2b2c-832f-bb09-8a6d069b352b` | 2026-03-27T22:12:08.563109Z | 2026-03-28T03:55:56.332085Z | 4 |
| 5 | Tracker and Ableton Features | `69c75434-4510-832f-aa2d-381db758c106` | 2026-03-28T04:08:45.469842Z | 2026-03-28T11:13:54.872443Z | 2 |
| 6 | Prototype and POC Steps | `69ca687a-0a20-8327-84aa-13ed8f02697f` | 2026-03-30T12:11:56.538255Z | 2026-03-30T22:15:59.661225Z | 3 |
| 7 | Prototype & Proof of Concept | `69caf63d-e7f0-8327-a7d7-f2b9b3b2e634` | 2026-03-30T22:16:48.860984Z | 2026-03-31T03:00:17.426126Z | 8 |
| 8 | Branch · Prototype & Proof of Concept | `69cb38cf-de74-8327-8275-51d20948709e` | 2026-03-31T03:00:37.461552Z | 2026-03-31T03:11:49.354190Z | 9 |
| 9 | Discrepancy Engine Design | `69cb7d8b-a454-8331-8997-a52daa49b92e` | 2026-03-31T07:53:53.883461Z | 2026-03-31T07:55:25.689184Z | 1 |

## Cleaning Rules

- Kept only visible user and assistant messages along each exported conversation path.
- Grouped consecutive visible user messages before a response into one prompt side of the pair.
- Omitted system/tool/hidden context and assistant reasoning/tool-call scaffolding.
- Preserved attachments as Markdown metadata and local links when available.
- Recorded duplicate content hashes because branch conversations retain inherited turns.
