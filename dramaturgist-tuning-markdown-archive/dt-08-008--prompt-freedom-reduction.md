---
archive_id: "dramaturgist-tuning"
pair_id: "dt-08-008"
global_pair_index: 34
conversation_index: 8
conversation_pair_index: 8
conversation_title: "Branch · Prototype & Proof of Concept"
conversation_id: "69cb38cf-de74-8327-8275-51d20948709e"
source_shard: "conversations-019.json"
project_key: "g-p-69c6e425347c81918dfba984fb76206c"
share_anchor_url: ""
conversation_created_utc: "2026-03-31T03:00:37.461552Z"
conversation_updated_utc: "2026-03-31T03:11:49.354190Z"
generated_at_utc: "2026-05-13T16:41:36Z"
prompt_message_ids:
  - "90988b45-2ab9-43e2-908b-4814504f7258"
response_message_ids:
  - "0b9e19ab-ac10-46fd-8cdb-06864c36280d"
  - "0d43cd66-1de1-406c-bb09-b9a6d35732d8"
assistant_models:
  - "gpt-5-4-thinking"
attachment_count: 0
omitted_message_counts:
  omitted_system: 2
  omitted_total: 4
  omitted_assistant: 2
content_sha256: "8d340eb6d926f846dfa786fe5a9c9b453cb2a46164cb7a6c4a3574d86ae4c425"
cleaning: "visible user/assistant path only; system/tool/hidden/reasoning/tool-call scaffolding omitted; private citation glyphs normalized"
---


# dramaturgist-tuning - 08 Branch · Prototype & Proof of Concept -- 008 Prompt / Response

## Pair Metadata

- Pair ID: `dt-08-008`
- Source: `conversations-019.json` / `69cb38cf-de74-8327-8275-51d20948709e`
- Conversation created UTC: `2026-03-31T03:00:37.461552Z`
- Conversation updated UTC: `2026-03-31T03:11:49.354190Z`
- Prompt messages: `1`
- Response segments: `2`
- Attachments referenced: `0`
- Omitted non-dialogue messages in this span: `4`

## Prompt

Message ID: `90988b45-2ab9-43e2-908b-4814504f7258`
Created UTC: `2026-03-31T03:00:35.831000Z`

reduce prompt freedom, increase system preparation, and make every prompt land inside pre-built ontology, contracts, events, and tests.

## Response

##### Response Segment 1

Message ID: `0b9e19ab-ac10-46fd-8cdb-06864c36280d`
Created UTC: `2026-03-31T03:00:37.200307Z`
Model: `gpt-5-4-thinking`

I’m pulling the exact architectural hooks for this so the answer lands as a concrete operating rule, not just a slogan.

##### Response Segment 2

Message ID: `0d43cd66-1de1-406c-bb09-b9a6d35732d8`
Created UTC: `2026-03-31T03:00:57.195983Z`
Model: `gpt-5-4-thinking`

#### Yes

That is the correct direction.

The system should become **less prompt-driven and more model-driven**. Prompts should not be allowed to define the ontology on the fly. They should only select from, populate, and transform **predeclared system objects** inside the canonical architecture. That is already consistent with your terminology charter, which makes the ontology prior to UI convenience and requires canonical internal terms to remain stable across schema, contracts, architecture, and code. [filecite: turn1file0] [filecite: turn1file4] [filecite: turn1file3]

#### The governing rule

Use this as the rule:

```text id="6c1gsu"
$PROMPT_FREEDOM=low
$SYSTEM_PREPARATION=high
$PROMPT_ROLE=selector-and-instantiator
$ONTOLOGY_SOURCE=prebuilt
$CONTRACT_SOURCE=prebuilt
$EVENT_SOURCE=prebuilt
$TEST_SOURCE=prebuilt
```

In plain terms: the prompt should not invent what the system is. The system already knows what a `$PHRASE_EVENT`, `$VOICE_CHANNEL`, `$TIMING_SUBSTRATE`, `$ANALYSIS_ENGINE`, and `$REHEARSAL_KERNEL` are. The prompt only chooses which of those objects to create, update, compare, render, or analyze. [filecite: turn1file4]

#### The architectural consequence

The prompt should enter the system **after** ontology, contracts, and events already exist.

So the flow becomes:

```text id="0j2z7x"
user_intent
-> canonical_term_resolution
-> contract_validation
-> domain_action
-> event_emission
-> invariant_checks
-> test_execution
-> state_commit
-> render_or_share
```

That is exactly the shape implied by the repo package layout: canonical schemas and value objects in `packages/domain/`, explicit `events/` and `contracts/`, SQL-backed persistence, typed API boundaries, and a CI path that checks shared contract drift, parsing trust, version integrity, and render lifecycle correctness. [filecite: turn1file6] [filecite: turn1file10]

#### The design law

A good formulation would be:

> **Prompts are not miniature product specifications. Prompts are bounded requests against a prepared speech-score system.**

Or more formally:

> **Every prompt must resolve into an allowed operation over canonical objects, validated by typed contracts, recorded as domain events, and checked against invariants and tests before trusted state changes occur.**

That is the strongest version of what you are asking for. It also aligns with the style guide’s requirement that architecture documents be declarative, explicit about boundaries and invariants, and system-first rather than hand-wavy or improvisational. [filecite: turn1file3]

#### What this means operationally

A prompt should never be allowed to say, in effect, “make up whatever structure seems useful.”

Instead, it should be forced to land in one of a finite set of prepared domains such as:

`$SCENE_PARSE_REQUEST`
`$VERSION_CREATE_REQUEST`
`$RENDER_REQUEST`
`$DIAGNOSTIC_REQUEST`
`$SHARE_CREATE_REQUEST`
`$PATTERN_EDIT_REQUEST`
`$SESSION_LAUNCH_REQUEST`
`$ARRANGEMENT_EDIT_REQUEST`

That same discipline already appears in your event model. The system does not just “do render stuff”; it emits `render.requested`, `render.queued`, `render.processing`, `render.completed`, and `render.failed`. It does not just “save work”; it emits `version.created`, `version.restored`, and `version.compared`. That is the correct pattern: prompts map into prepared eventful operations, not fuzzy magic. [filecite: turn1file1]

#### The trust consequence

This matters because trust in your system depends on **deterministic state and bounded meaning**, not on clever prompting.

Your own implementation notes already identify the core trust zones as parsing trust, version integrity, and render lifecycle correctness. The repo is supposed to encode these in tests across parsing, versioning, rendering, and the end-to-end scene-hearing loop. That means prompts must be subordinated to those trust zones, not allowed to bypass them. [filecite: turn1file10]

The most important example is the split between mutable `scene` and immutable `scene_version`. A prompt should not directly mutate trusted history. It should mutate working state, then pass through version creation rules if the result is to become a stable artifact. That immutability boundary is one of the system’s strongest architectural moves. [filecite: turn1file8]

#### The product consequence

This also protects the product from collapsing into commodity voice tooling.

If prompts remain too free, the system starts behaving like an undifferentiated LLM wrapper with speech output. If prompts are instead forced through a prepared ontology of temporal dramatic language, the moat stays where it belongs: in the structured data model, the revision loop, the diagnostics layer, and the score-execution architecture. [filecite: turn1file16] [filecite: turn1file14]

#### The sentence to keep

Use this internally:

> **Reduce prompt freedom. Increase system preparation. Require every prompt to terminate in canonical ontology, typed contracts, explicit domain events, and passing tests.**

Or even tighter:

```text id="f8qlsr"
$PROMPTS_SHALL_NOT_DEFINE_THE_SYSTEM
$PROMPTS_SHALL_SELECT_WITHIN_THE_SYSTEM
```

#### The clean implementation doctrine

If you want the doctrine in strict repo language, it should read like this:

```text id="t8wt42"
All prompt-handling surfaces shall resolve user input into canonical domain objects and approved operations only. No prompt may introduce ad hoc ontology, bypass typed contracts, skip event emission, or mutate trusted state without passing invariant checks and the relevant test path. Prompt interpretation is a front-door convenience layer; ontology, contracts, events, and tests remain the real system.
```

That is the right move. It makes the prompt thin and the system thick.

[filecite: turn1file0] [filecite: turn1file6] [filecite: turn1file10]

If you want, I can turn that next into a formal **`$PROMPT_GOVERNANCE_CHARTER`** artifact in the same repo style.
