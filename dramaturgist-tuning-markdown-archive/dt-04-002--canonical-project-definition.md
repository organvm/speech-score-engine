---
archive_id: "dramaturgist-tuning"
pair_id: "dt-04-002"
global_pair_index: 11
conversation_index: 4
conversation_pair_index: 2
conversation_title: "Gap Analysis and Merging"
conversation_id: "69c700a2-2b2c-832f-bb09-8a6d069b352b"
source_shard: "conversations-019.json"
project_key: "g-p-69c6e425347c81918dfba984fb76206c"
share_anchor_url: ""
conversation_created_utc: "2026-03-27T22:12:08.563109Z"
conversation_updated_utc: "2026-03-28T03:55:56.332085Z"
generated_at_utc: "2026-05-13T16:41:36Z"
prompt_message_ids:
  - "f4436d1c-9cc8-4f09-a14e-19f4c9b7f29b"
response_message_ids:
  - "8e81bb69-bf77-4318-9c5a-29cb5314c949"
  - "84c1c092-a584-4caf-a0ff-2ceb4215736c"
assistant_models:
  - "gpt-5-4-thinking"
attachment_count: 0
omitted_message_counts:
  omitted_user: 1
  omitted_total: 25
  omitted_system: 1
  omitted_tool: 17
  omitted_empty_assistant: 1
  omitted_assistant: 5
content_sha256: "2e80d089d0a563227f02f5db63c59fbc032d0da661322bd558bc42ef42a22ff4"
cleaning: "visible user/assistant path only; system/tool/hidden/reasoning/tool-call scaffolding omitted; private citation glyphs normalized"
---


# dramaturgist-tuning - 04 Gap Analysis and Merging -- 002 Prompt / Response

## Pair Metadata

- Pair ID: `dt-04-002`
- Source: `conversations-019.json` / `69c700a2-2b2c-832f-bb09-8a6d069b352b`
- Conversation created UTC: `2026-03-27T22:12:08.563109Z`
- Conversation updated UTC: `2026-03-28T03:55:56.332085Z`
- Prompt messages: `1`
- Response segments: `2`
- Attachments referenced: `0`
- Omitted non-dialogue messages in this span: `25`

## Prompt

Message ID: `f4436d1c-9cc8-4f09-a14e-19f4c9b7f29b`
Created UTC: `2026-03-28T03:44:32.319000Z`

merged form and turn it into a canonical project definition statement with strict terminology, exclusions, and naming rules.

## Response

##### Response Segment 1

Message ID: `8e81bb69-bf77-4318-9c5a-29cb5314c949`
Created UTC: `2026-03-28T03:44:36.662468Z`
Model: `gpt-5-4-thinking`

I’m aligning the vocabulary against the project materials already in this conversation so the definition does not drift at the naming layer.

##### Response Segment 2

Message ID: `84c1c092-a584-4caf-a0ff-2ceb4215736c`
Created UTC: `2026-03-28T03:44:50.094847Z`
Model: `gpt-5-4-thinking`

#### $CANONICAL_PROJECT_DEFINITION_STATEMENT

**Preferred canonical name:** **$SPEECH_SCORE_ENGINE**.
**Canonical descriptive title:** **Speech-Score Composition System**.
**Permitted secondary designation:** **Post-Script Theatrical Composition Environment**.
This naming is the cleanest convergence of the project materials because it preserves the central claim that language is handled as semantic content, rhythmic material, and executable score, while also preserving the system-level scope across writing, notation, rehearsal, rendering, and live execution. [filecite: turn3file9turn3file17turn3file13]

#### 1. $DEFINITION

**$SPEECH_SCORE_ENGINE := a compositional system for authoring, analyzing, rehearsing, rendering, and performing polyvocal speech works in which text, timing, recurrence, vocal distribution, and spatial notation are interoperable across analog and digital forms.** Its core premise is that a dramatic utterance is never only text on a page; it is also a timed event, a vocal gesture, a positional relation among voices, and a repeatable performance object. [filecite: turn3file9turn3file12]

The system exists to convert language into a scored, repeatable, transformable performance object across page, audio, rehearsal, and live event. Its primary law is not merely that dialogue can be heard, but that meaning can be reorganized through timing, repetition, overlap, silence, redistribution, and recurrence without ceasing to be language. That is why the project is properly defined as a speech-score system rather than a script tool or voice utility. [filecite: turn3file13turn3file6turn3file17]

#### 2. $SYSTEM_SCOPE

Inside the canonical system boundary belong six domains: authorship, notation, analysis, rehearsal, rendering, and execution. Authorship covers the creation and transformation of phrase-events. Notation covers score-encoding of speech. Analysis covers dramaturgical and rhythmic inspection. Rehearsal covers the generation of performer-facing and conductor-facing artifacts. Rendering covers audio, score, and related output views. Execution covers live coordination of voices, cues, and timing states. This scope is explicit in the system materials and should remain stable. [filecite: turn3file12turn3file9]

The commercially accessible surface of the system may present as a **dramaturgical-audio workbench** or **listening-first revision environment for performative text**, but that is the entry layer, not the total ontology. The surface solves the immediate workflow problem of hearing and revising dialogue quickly. The deeper layer remains the polyphonic speech-composition engine. Internal documentation should preserve this two-layer distinction. [filecite: turn3file11turn3file14turn3file19]

#### 3. $STRICT_TERMINOLOGY

**$PHRASE_EVENT** is the primary compositional unit. Do not use “line” as the fundamental ontological term except when referring to imported legacy scripts. A line is a legacy textual presentation. A phrase-event is the actual system object: a bounded utterance or fragment with semantic content, speaker assignment, temporal position, duration behavior, and relational status. [filecite: turn3file12turn3file9]

**$VOICE_CHANNEL** is the canonical term for the speaking carrier in the system. Do not collapse this into “character” except in user-facing simplifications. A character may map to one or more voice-channels, and a voice-channel may carry character, chorus, synthetic, or abstract textual functions. The system therefore distinguishes character identity from voice-channel identity. [filecite: turn3file6turn3file17]

**$TEMPORAL_RELATION** is the primary organizing principle. Do not describe the system as plot-first, script-first, or scene-first at the deep-structure level. Scene remains a user-facing container, but temporal relation governs composition. This includes cue order, overlap, delay, subdivision, recurrence, silence, and relative entry logic. [filecite: turn3file17turn3file6]

**$TIMING_SUBSTRATE** is the canonical term for the temporal kernel. Do not replace it with vague terms like “playback settings” when discussing core architecture. The timing substrate handles clock time, beat time, relative cue time, and elastic time, and is what permits literary timing and compositional timing to coexist in one engine. [filecite: turn3file6]

**$NOTATION_RENDERER** is the canonical output term for score views. Do not refer to these outputs merely as “formatted scripts.” The renderer produces readable script view, rhythmic score view, spatial matrix view, and performer-specific part view. [filecite: turn3file6]

**$REHEARSAL_KERNEL** is the canonical bridge from composition objects to practical rehearsal artifacts. Use this instead of generic phrases like “practice mode” when referring to the system service. It generates cue sheets, click guides, count-ins, stems, and section isolations. [filecite: turn3file6]

**$LIVE_EXECUTION_LAYER** is the canonical term for real-time coordination during performance. Do not reduce this to “presentation mode.” It includes conductor view, countdown view, tempo map, monitor prompts, and rule-bound override behavior. [filecite: turn3file6]

**$ANALYSIS_ENGINE** is the canonical term for dramaturgical diagnostics. Do not call this “AI critique” in core documentation. Its job is narrower and more defensible: identification of pacing drag, weak speaker differentiation, rhythm monotony, broken interruption logic, overlong turns, and related structural issues. [filecite: turn3file6turn3file14]

#### 4. $EXCLUSIONS

The system is **not** canonically defined as text-to-speech software. Synthetic voice is infrastructure within the system, not the category to which the system belongs. Any naming, pitch, or documentation that frames the project primarily as a TTS layer weakens the ontology and collapses the moat. [filecite: turn3file9turn3file8turn3file19]

The system is **not** merely a playwriting app, a podcast maker, a voice generator, a screenplay reader, or a one-off experimental play framework. Those may be adjacent use cases, source materials, or entry surfaces, but the canonical project is the underlying generative framework for an entire class of works in which speech behaves as composed performance. [filecite: turn3file17turn3file13]

The system is **not** a total production-management platform. Costume, scenic design, payroll, ticketing, and unrelated production logistics remain outside the formal boundary unless later integrated as secondary modules. This exclusion should remain explicit in all architectural definitions. [filecite: turn3file12]

For MVP framing, the system is **not yet** defined by full overlap composition, conductor infrastructure, multimodal staging visualization, deep collaboration, or institutional administration. Those belong to later layers, not the canonical proof point. The first proof remains: users can hear and revise dialogue as performed time. [filecite: turn3file10turn3file15]

#### 5. $NAMING_RULES

At the **system level**, use **Title Case** for outward-facing category names and **$UPPER_SNAKE_CASE** for canonical internal entities. Example: “Speech-Score Composition System” in prose; **$SPEECH_SCORE_ENGINE** in specs. This keeps the conceptual name legible while preserving machine-like ontological precision.

At the **object level**, prefer names that indicate function rather than medium artifact. Use **$PHRASE_EVENT**, **$VOICE_CHANNEL**, **$TIMING_SUBSTRATE**, **$NOTATION_RENDERER**, **$REHEARSAL_KERNEL**, and **$LIVE_EXECUTION_LAYER**. Avoid weak nouns such as “block,” “piece,” “thing,” “snippet,” “clip,” or “dialogue chunk” in formal documentation unless they are explicitly mapped as aliases for onboarding.

At the **user-surface level**, permit simplified expressions only where adoption clarity requires them. “Scene,” “speaker,” “readback,” and “dialogue playback” are acceptable UX language, but internal schemas and specifications should always map those terms back to the deeper canonical object model. This preserves the long-term ontology while supporting the commercial wedge of a dramaturgical-audio studio. [filecite: turn3file11turn3file19]

At the **category level**, prefer names that preserve the project’s hybrid ontology. Approved pattern families are: **speech-score**, **polyvocal**, **post-script**, **dramaturgical-audio**, **performance-writing**, and **temporal writing intelligence**. Dispreferred pattern families are: **AI voice**, **script reader**, **podcast engine**, **theatre chatbot**, and **audio toy**, because they either over-trivialize or misclassify the system. [filecite: turn3file19turn3file14turn3file8]

At the **narrative level**, one sentence should always remain stable:

**The system treats language as a dual-aspect object: semantic content and timed performance.**

That sentence is the naming test. If a new label obscures either side of that duality, reject it. This follows directly from the system invariant that language must remain both meaning-bearing and temporally operative. [filecite: turn3file6]

#### 6. $CANONICAL_EXPRESSION_SET

Use this as the stable vocabulary core for future specs.

**Canonical master name:** Speech-Score Composition System.
**Canonical internal identifier:** $SPEECH_SCORE_ENGINE.
**Canonical product-surface descriptor:** Dramaturgical-Audio Workbench.
**Canonical deep-system descriptor:** Polyvocal Speech-Composition Engine.
**Canonical unit:** $PHRASE_EVENT.
**Canonical performer carrier:** $VOICE_CHANNEL.
**Canonical temporal kernel:** $TIMING_SUBSTRATE.
**Canonical score output service:** $NOTATION_RENDERER.
**Canonical rehearsal bridge:** $REHEARSAL_KERNEL.
**Canonical live layer:** $LIVE_EXECUTION_LAYER.
**Canonical diagnostic layer:** $ANALYSIS_ENGINE. [filecite: turn3file9turn3file6turn3file11]

#### 7. $FINAL_CANONICAL_STATEMENT

Here is the clean final form for reuse in future documents:

**$SPEECH_SCORE_ENGINE is a speech-score composition system for authoring, analyzing, rehearsing, rendering, and performing polyvocal works in which language functions simultaneously as meaning and as timed score. Its primary unit is the $PHRASE_EVENT; its primary organizing principle is temporal relation; its core purpose is to preserve translatability across page, audio, rehearsal, and live execution without collapsing the work into either inert prose or mere voice playback.** [filecite: turn3file9turn3file12turn3file6]

Next I can turn this into a **$TERMINOLOGY_CHARTER** with approved terms, forbidden terms, alias mappings, and repo-wide naming conventions.
