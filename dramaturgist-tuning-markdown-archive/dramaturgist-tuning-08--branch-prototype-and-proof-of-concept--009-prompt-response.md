---
archive_id: "dramaturgist-tuning"
pair_id: "dt-08-009"
global_pair_index: 35
conversation_index: 8
conversation_pair_index: 9
conversation_title: "Branch · Prototype & Proof of Concept"
conversation_id: "69cb38cf-de74-8327-8275-51d20948709e"
source_shard: "conversations-019.json"
project_key: "g-p-69c6e425347c81918dfba984fb76206c"
share_anchor_url: ""
conversation_created_utc: "2026-03-31T03:00:37.461552Z"
conversation_updated_utc: "2026-03-31T03:11:49.354190Z"
generated_at_utc: "2026-05-13T16:41:36Z"
prompt_message_ids:
  - "4a2d0b64-926f-44de-8297-5fb3a01251ed"
response_message_ids:
  - "95cef750-b590-4c3d-8dc6-d6183011d064"
assistant_models:
  - "gpt-5-4-thinking"
attachment_count: 0
omitted_message_counts:
  omitted_system: 5
  omitted_total: 47
  omitted_user: 1
  omitted_tool: 34
  omitted_empty_assistant: 1
  omitted_assistant: 6
content_sha256: "85be884bda30030cf2367c6ddb15e3ec42cd4f320d866ec6dbe5552794ca7f7a"
cleaning: "visible user/assistant path only; system/tool/hidden/reasoning/tool-call scaffolding omitted; private citation glyphs normalized"
---


# dramaturgist-tuning - 08 Branch · Prototype & Proof of Concept -- 009 Prompt / Response

## Pair Metadata

- Pair ID: `dt-08-009`
- Source: `conversations-019.json` / `69cb38cf-de74-8327-8275-51d20948709e`
- Conversation created UTC: `2026-03-31T03:00:37.461552Z`
- Conversation updated UTC: `2026-03-31T03:11:49.354190Z`
- Prompt messages: `1`
- Response segments: `1`
- Attachments referenced: `0`
- Omitted non-dialogue messages in this span: `47`

## Prompt

Message ID: `4a2d0b64-926f-44de-8297-5fb3a01251ed`
Created UTC: `2026-03-31T03:05:21.522000Z`

PROMPT_GOVERNANCE_CHARTER

## Response

Message ID: `95cef750-b590-4c3d-8dc6-d6183011d064`
Created UTC: `2026-03-31T03:05:26.704870Z`
Model: `gpt-5-4-thinking`

```md
---
title: Prompt Governance Charter
document_id: speech-score-engine_prompt-governance-charter_20260330
doc_type: architecture
doc_path: docs/architecture/prompt-governance-charter.md
status: canonical
authority_level: repo-wide
system_id: $SPEECH_SCORE_ENGINE
category: prompt-governance
updated_at: 2026-03-30
owners:
  - architecture
  - product
  - engineering
summary: >-
  Normative governance for all prompt-handling surfaces in the Speech-Score
  Composition System. Defines how user prompts resolve into canonical ontology,
  typed contracts, domain events, invariant checks, and test gates.
---

# Prompt Governance Charter

## 1. Purpose

This charter governs every prompt-handling surface in the repository and product.

Its purpose is to ensure that prompts do not redefine the system, invent ad hoc ontology, bypass domain contracts, or mutate trusted state without passing through explicit events, invariant checks, and tests. The system must remain a Speech-Score Composition System rather than drifting into an improvisational prompt wrapper or commodity voice utility. [filecite: turn2file10] [filecite: turn2file11] [filecite: turn2file7]

This document is normative.

Where prompt behavior conflicts with canonical ontology, schema, API contracts, event definitions, versioning rules, or test gates, this charter governs prompt behavior unless a higher-authority document explicitly supersedes it. Its authority is intended to stand beside the terminology and lexicon governance documents so that prompt convenience never outranks system meaning. [filecite: turn2file10] [filecite: turn2file11]

## 2. Governing Sentence

**Prompts do not define the system. Prompts select and instantiate operations within the system.**

A prompt is a bounded request against prepared ontology, prepared contracts, prepared events, and prepared tests.

If a prompt introduces ungoverned ontology, reject it.
If a prompt bypasses typed contracts, reject it.
If a prompt attempts direct mutation of trusted state without eventful validation, reject it.
If a prompt collapses the system into generic TTS or generic chat behavior, reject it. [filecite: turn2file10] [filecite: turn2file11] [filecite: turn2file3]

## 3. Foundation

The system’s governing semantic law remains unchanged:

**The system treats language as a dual-aspect object: semantic content and timed performance.** Prompt interpretation must preserve both halves of that claim. A prompt may simplify user interaction, but it may not erase temporal structure, collapse `$PHRASE_EVENT` into loose text, or replace `$VOICE_CHANNEL`, `$TEMPORAL_RELATION`, or `$TIMING_SUBSTRATE` with vague convenience nouns in the architectural layer. [filecite: turn2file10] [filecite: turn2file11] [filecite: turn2file8]

The system also retains its two-layer distinction. The commercial surface may operate as a dramaturgical-audio workbench, but the deeper layer remains a polyvocal speech-composition engine. Prompt handling belongs to the surface only as a convenience membrane; the underlying truth remains the canonical system model. [filecite: turn2file8] [filecite: turn2file3]

## 4. Scope

This charter applies to:

`apps/web/` prompt entry points
`apps/api/` prompt-facing routes and orchestration services
`apps/worker/` jobs created from prompt-originating requests
`packages/domain/` prompt resolution schemas and domain actions
`packages/client-sdk/` prompt submission and response contracts
all parsing, generation, diagnostic, render, versioning, and sharing surfaces that accept natural-language input

It also applies to future agentic or assistive surfaces that interpret user intent before converting that intent into domain operations. The same governance must hold whether the user is editing a scene, asking for diagnostics, generating a render, or invoking score-like transformations. [filecite: turn2file7] [filecite: turn2file6]

## 5. Order of Authority

When prompt interpretation conflicts with other system layers, the following order governs:

1. This document’s **Governing Sentence**
2. Canonical system identity and terminology governance
3. Canonical ontology and domain invariants
4. Typed contracts and schema validation
5. Domain event model
6. Test gates and invariant enforcement
7. Local UI convenience behavior
8. Prompt wording itself

A user prompt has real authority over requested work, but not over system ontology. Prompt text may ask for an operation; it may not redefine what kinds of things the system contains. [filecite: turn2file10] [filecite: turn2file11] [filecite: turn2file6]

## 6. Core Policy

### 6.1 `$PROMPT_ROLE`

`$PROMPT_ROLE := selector-and-instantiator`

The prompt chooses among predeclared operations. It does not author the ontology.

### 6.2 `$SYSTEM_PREPARATION_POLICY`

`$SYSTEM_PREPARATION_POLICY := ontology-first`

Ontology, contracts, events, and tests must be prepared before prompt entry.

### 6.3 `$PROMPT_FREEDOM_POLICY`

`$PROMPT_FREEDOM_POLICY := constrained-by-domain`

Natural language is allowed at the boundary, but every accepted prompt must terminate in a finite, declared domain action.

### 6.4 `$STATE_MUTATION_POLICY`

`$STATE_MUTATION_POLICY := eventful-and-validated`

Trusted state changes occur only through approved domain actions, explicit events, invariant checks, and transactionally safe persistence.

### 6.5 `$TEST_GATE_POLICY`

`$TEST_GATE_POLICY := mandatory-for-trusted-effects`

A prompt-originating flow may remain provisional until the relevant contract, invariant, and integration tests pass. [filecite: turn2file6] [filecite: turn2file7]

## 7. Canonical Prompt Resolution Flow

Every prompt-handling path shall follow this shape:

```text
$PROMPT_INPUT
-> $INTENT_RESOLUTION
-> $ALIAS_TO_CANONICAL_TERM_MAPPING
-> $CONTRACT_SELECTION
-> $DOMAIN_ACTION_SELECTION
-> $EVENT_EMISSION
-> $INVARIANT_CHECKS
-> $TEST_GATES
-> $STATE_COMMIT
-> $DERIVED_OUTPUTS
```

This flow is required because the system already separates mutable working state from immutable version state, treats renders as derived artifacts rather than primary truth, and assigns domain responsibility to explicit service boundaries in the repository. Prompt handling must respect those boundaries instead of cutting across them. [filecite: turn2file6] [filecite: turn2file7]

## 8. Canonical Prompt Target Classes

Every accepted prompt must resolve to one of a finite set of prompt target classes.

### 8.1 `$SCENE_PARSE_REQUEST`

Purpose: convert raw user text into structured scene working state.

Valid outputs include speaker detection, line segmentation, stage-direction marking, and creation of provisional scene structure.

Canonical target objects may include `$SCENE`, `$SPEAKER`, and working parsed state. In deeper architecture terms, user-surface “line” may later map to canonical `$PHRASE_EVENT`, but MVP parse flows may preserve the simpler scene/line layer as a constrained entry surface. [filecite: turn2file5] [filecite: turn2file10]

### 8.2 `$SCENE_EDIT_REQUEST`

Purpose: modify mutable working draft state only.

Valid outputs include text edits, pause edits, speaker assignment updates, voice-profile changes, and scene metadata changes.

No `$SCENE_VERSION` may be overwritten by this class.

### 8.3 `$VERSION_CREATE_REQUEST`

Purpose: freeze mutable working state into an immutable revision unit.

This class is the only prompt target permitted to create a new trusted revision artifact. It must snapshot raw text, parsed state, and settings as an atomic operation. [filecite: turn2file5] [filecite: turn2file6]

### 8.4 `$RENDER_REQUEST`

Purpose: generate derived auditory output from a chosen version plus a render profile.

This class may create `$PLAYBACK_RENDER` artifacts only from stable version state and explicit render configuration. Prompt wording cannot force inline long-running render behavior inside the API path if the render flow is defined as asynchronous. [filecite: turn2file6] [filecite: turn2file7]

### 8.5 `$DIAGNOSTIC_REQUEST`

Purpose: generate advisory structural findings.

This class may invoke the `$ANALYSIS_ENGINE`, but findings remain advisory rather than authoritative. Prompt language must never allow diagnostics to be misrepresented as dramaturgical truth. [filecite: turn2file5] [filecite: turn2file8]

### 8.6 `$SHARE_CREATE_REQUEST`

Purpose: expose a chosen version through a controlled read-only share artifact.

This class may only target a specific version and access mode. Share generation must not leak mutable working state by accident. [filecite: turn2file5] [filecite: turn2file6]

### 8.7 `$PATTERN_EDIT_REQUEST`

Purpose: create or modify deeper score-native structures such as row-precise phrase-event grids, command cells, or pattern sequencing.

This class belongs to the deeper engine layer and should remain unavailable until the corresponding canonical views and data models exist. It is included here now so future prompt growth still lands inside declared architecture. [filecite: turn2file13] [filecite: turn2file8]

### 8.8 `$SESSION_LAUNCH_REQUEST`

Purpose: invoke launch-oriented rehearsal or audition behaviors in the Session-style layer.

This class belongs to the deeper launch/recombination model and must remain distinct from arrangement editing. [filecite: turn2file13]

### 8.9 `$ARRANGEMENT_EDIT_REQUEST`

Purpose: modify long-form timeline structure, markers, arrangement ordering, and section-level timing.

This class belongs to the deeper Arrangement-style layer and must be kept distinct from scene parsing and scene playback. [filecite: turn2file13]

## 9. Alias Resolution Rule

User-surface language may remain simple.

A prompt may say “speaker,” “scene,” “line,” “readback,” or “diagnostics.” Internally, those aliases must resolve to canonical system language before domain action selection. Alias handling exists for usability only; it must not silently replace canonical terminology inside schema, contracts, architecture, or event naming. [filecite: turn2file10] [filecite: turn2file11]

For prompt resolution, the following principle applies:

```text
$USER_ALIAS -> $CANONICAL_TERM -> $DOMAIN_ACTION
```

The reverse direction is forbidden. Canonical internal terms may be presented as user-surface aliases in UI, but the system may not allow user wording to replace canonical object language in stored architecture or internal contracts. [filecite: turn2file11]

## 10. Typed Contract Rule

Every prompt target class must map to a declared contract.

A contract must specify:

`$REQUEST_TYPE`
`$ALLOWED_FIELDS`
`$REQUIRED_FIELDS`
`$DEFAULTS`
`$VALIDATION_RULES`
`$FAILURE_CODES`
`$SIDE_EFFECTS`
`$EVENTS_EMITTED`

This rule follows directly from the repository strategy, API modularization, contract-aware service boundaries, and the requirement that domain concepts such as parsing, versioning, renders, diagnostics, and shares be explicit modules rather than vague controller behaviors. [filecite: turn2file7]

## 11. Event Rule

Every accepted prompt that performs work beyond ephemeral UI assistance must emit domain events.

A minimal prompt-originating event family should include:

`scene.parse.requested`
`scene.parse.completed`
`scene.edit.applied`
`version.create.requested`
`version.created`
`render.requested`
`render.queued`
`render.processing`
`render.completed`
`render.failed`
`diagnostic.requested`
`diagnostic.generated`
`share.create.requested`
`share.created`
`prompt.rejected`

The exact event family may evolve, but the principle may not: meaningful prompt-originated work must become legible as system events. This preserves traceability, observability, and downstream testability. [filecite: turn2file6] [filecite: turn2file7]

## 12. Invariant Rule

Prompt resolution must preserve system invariants.

At minimum, the following invariants apply.

### 12.1 `$DUAL_ASPECT_INVARIANT`

No prompt may reduce language to meaning-only text or timing-only abstraction. Stored speech objects must preserve both semantic and temporal dimensions. [filecite: turn2file3] [filecite: turn2file10]

### 12.2 `$ATTRIBUTION_INVARIANT`

No spoken unit may become unattributed in committed state. MVP surfaces may require each spoken line to map to exactly one speaker, while deeper layers may allow more advanced channel logic. [filecite: turn2file3] [filecite: turn2file5]

### 12.3 `$VERSION_IMMUTABILITY_INVARIANT`

No prompt may mutate an existing immutable version. Prompts may modify working scene state or create a new version; they may not silently rewrite history. [filecite: turn2file5] [filecite: turn2file6]

### 12.4 `$DETERMINISTIC_RENDER_INVARIANT`

A saved version with identical settings must resolve to substantially the same playback timing. Prompt creativity may not override deterministic render guarantees. [filecite: turn2file5]

### 12.5 `$DERIVED_ARTIFACT_INVARIANT`

Renders, diagnostics, and share links are derived artifacts. They do not become new domain truth merely because a prompt generated them. [filecite: turn2file6]

### 12.6 `$BOUNDARY_INVARIANT`

No prompt may smuggle unrelated production-management domains into the canonical system boundary. Costume, payroll, ticketing, and unrelated logistics remain outside scope unless explicitly integrated later. [filecite: turn2file3] [filecite: turn2file8]

## 13. Test Gate Rule

Every prompt target class must have a corresponding test path.

At minimum, the repository shall maintain:

contract tests for prompt request/response validation
unit tests for alias-to-canonical resolution
unit tests for domain action selection
integration tests for version creation transactions
integration tests for render job dispatch
integration tests for diagnostic generation contracts
end-to-end tests for “create scene -> hear scene -> revise -> version -> share”

This follows the repository’s explicit separation into apps, packages, integration tests, and end-to-end tests. Prompt handling is not exempt from that discipline; it is one of the places where testability matters most because natural language otherwise invites ambiguous drift. [filecite: turn2file7]

## 14. Rejection Rule

The system shall reject a prompt when any of the following hold:

the prompt cannot be resolved to a declared target class
the prompt requires undeclared ontology
the prompt violates canonical terminology governance in a way that would contaminate stored state
the prompt requests a trusted mutation without a valid contract
the prompt attempts to overwrite immutable version state
the prompt requests a domain outside system scope
the prompt would produce outputs that misclassify the system as generic TTS or generic chat infrastructure

Rejected prompts should return a structured reason and, when possible, a nearest valid operation. Rejection is a feature of governance, not a failure of helpfulness. [filecite: turn2file10] [filecite: turn2file11]

## 15. Audit Rule

Every nontrivial prompt-originated operation shall produce an audit record.

At minimum, the audit record should include:

`$PROMPT_ID`
`$USER_ID`
`$TARGET_CLASS`
`$CANONICAL_OBJECTS_TOUCHED`
`$CONTRACT_ID`
`$EVENT_IDS`
`$TEST_GATE_RESULTS`
`$COMMIT_STATUS`
`$CREATED_AT`

This requirement is consistent with the repository’s explicit observability and audit modules. Prompt behavior must remain inspectable after the fact, especially once the product includes revision trust, sharing, and render pipelines. [filecite: turn2file7]

## 16. Repository Placement

This document should live at:

```text
docs/architecture/prompt-governance-charter.md
```

Supporting implementation should live across:

`packages/domain/` for canonical prompt target classes, value objects, schemas, and domain actions
`apps/api/src/contracts/` for typed request contracts
`apps/api/src/policies/` for prompt governance policy enforcement
`packages/observability/` for audit and telemetry helpers
`test/integration/` and `test/e2e/` for prompt-originating workflow validation

This placement aligns with the existing monorepo shape and preserves prompt governance as architecture, not only UI behavior. [filecite: turn2file7]

## 17. Short Doctrine

Use this doctrine when compressing the charter into implementation guidance:

**Reduce prompt freedom. Increase system preparation. Require every prompt to terminate in canonical ontology, typed contracts, explicit domain events, invariant checks, and passing tests before trusted state changes occur.**

## 18. Enforceable Sentence

Use this as the repo-wide enforceable sentence:

**Prompt interpretation is a front-door convenience layer. Ontology, contracts, events, invariants, and tests remain the real system.** [filecite: turn2file10] [filecite: turn2file6] [filecite: turn2file7]
```

This sits cleanly beside the existing terminology and lexicon governance and follows the same repo-wide normative posture. [filecite: turn2file10] [filecite: turn2file11]
