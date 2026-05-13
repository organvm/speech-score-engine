# dramaturgist-tuning - Markdown Archive

Flat cleaned Markdown archive for the confirmed `dramaturgist-tuning` ChatGPT project set.

## Contents

- `00-full-archive.md`: complete readable Markdown archive.
- `00-metadata.tsv`: one row per prompt-response pair with message IDs, counts, hashes, and filenames.
- `00-manifest.json`: machine-readable archive manifest.
- `dt-NN-MMM--{topic-slug}.md`: flat per-pair Markdown files.

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

## Naming convention

Files in this directory follow `docs/conventions/naming.md`. Pair-archive files use the pattern `dt-NN-MMM--{topic-slug}.md`:

- `dt-` is the kebab-form of the archive ID (`dramaturgist-tuning`).
- `NN` is the conversation index (`01`–`09`), matching the table above.
- `MMM` is the conversation-pair index (`001`+) within that conversation.
- `{topic-slug}` is a 2–5-token kebab summary of the prompt's subject. It mirrors what the prompt asks the assistant to produce.

The same `dt-NN-MMM` value appears as `pair_id` in every file's YAML frontmatter and in the `pair_id` column of `00-metadata.tsv`.

## Pair Index

Filename → one-line description of the prompt's subject.

### conv 01 — Theatrical-Musical Composition System
- `dt-01-001--predict-system-from-photos.md` — Photos uploaded; predict the system the user wants to build.
- `dt-01-002--formalize-system-concept.md` — Formalize the system as components, invariants, notation rules, candidate outputs.

### conv 02 — Speech-based Performance System
- `dt-02-001--predict-system-from-photos.md` — Same prompt as `dt-01-001`, different conversation (content hash duplicates `dt-03-001`).

### conv 03 — Branch · Speech-based Performance System (the main spec-development branch)
- `dt-03-001--predict-system-from-photos.md` — Branch start; same predict-from-photos prompt as conv 02.
- `dt-03-002--dramaturgical-product-frame.md` — Reframe the system as a product for dramaturgs, playwrights, performers.
- `dt-03-003--user-types-mvp-boundary.md` — User types, jobs-to-be-done, feature ladder, MVP boundary, moat thesis.
- `dt-03-004--formal-mvp-spec.md` — Turn the framing into a formal MVP spec (objects, flows, screens, functional requirements).
- `dt-03-005--product-design-systems-package.md` — Promote the MVP spec into a full product-design / systems package.
- `dt-03-006--repository-blueprint-handoff.md` — Convert into the repository blueprint and implementation handoff package (the canvas the scaffold tracks).

### conv 04 — Gap Analysis and Merging
- `dt-04-001--gap-analysis-and-merge.md` — Find gaps between two takes and merge into a canonical form.
- `dt-04-002--canonical-project-definition.md` — Canonical project definition statement with strict terminology + exclusions.
- `dt-04-003--terminology-charter.md` — Produce `$TERMINOLOGY_CHARTER`: approved terms, forbidden terms, aliases, naming conventions.
- `dt-04-004--lexicon-and-style-guide.md` — Produce `$LEXICON_AND_STYLE_GUIDE.md` ready to drop into `docs/architecture/`.

### conv 05 — Tracker and Ableton Features
- `dt-05-001--tracker-ableton-features.md` — Add tracker + Ableton paradigms to the product surface.
- `dt-05-002--pattern-session-arrangement-screens.md` — Revised product spec with `$PATTERN_VIEW`, `$SESSION_VIEW`, `$ARRANGEMENT_VIEW` screen model.

### conv 06 — Prototype and POC Steps
- `dt-06-001--prototype-and-poc-path.md` — Path to a shareable proof-of-concept.
- `dt-06-002--poc-build-spec-four-screens.md` — Screen-by-screen POC build spec for the four MVP screens, with bakery sample as demo content.
- `dt-06-003--tracker-time-sequences-essential.md` — Tracker-style time/sequence semantics confirmed as essential.

### conv 07 — Prototype & Proof of Concept (inherits from conv 06)
- `dt-07-001--prototype-and-poc-path.md` — Inherits `dt-06-001`'s question.
- `dt-07-002--max-msp-supercollider-feasibility.md` — Would this work in Max/MSP or SuperCollider?
- `dt-07-003--dialogue-cluster-tracker-demo.md` — Demo: friend's play screenshots as a tracker, triggering dialogue clusters.
- `dt-07-004--voice-synthesis-injectability.md` — Is voice synthesis injectable as a provider?
- `dt-07-005--voice-clone-audio-requirements.md` — How much voice audio is needed to clone someone?
- `dt-07-006--theatre-company-voice-on-travel.md` — Use theatre-company voices while away on travel for training.
- `dt-07-007--theatre-voice-capture-sheet.md` — Theatre-company voice capture sheet (`$ACTOR_ID`, `$SCRIPT_ID`, `$TARGET_DURATION`, `$USAGE_SCOPE`, `$VOICE_PROFILE_ID`).
- `dt-07-008--preconsidered-prompt-readiness.md` — Pre-consider every direction so the system is closer to "functioning after prompt."

### conv 08 — Branch · Prototype & Proof of Concept (branches from conv 07)
- `dt-08-001..007` — Inherit `dt-07-001..007` (`duplicate_group` column in `00-metadata.tsv` documents the pairing).
- `dt-08-008--prompt-freedom-reduction.md` — Reduce prompt freedom by pre-building ontology, contracts, events, tests.
- `dt-08-009--prompt-governance-charter.md` — Produce `$PROMPT_GOVERNANCE_CHARTER`.

### conv 09 — Discrepancy Engine Design
- `dt-09-001--discrepancy-engine-design.md` — Tool design for cross-checking AI claims against real-world evidence.
