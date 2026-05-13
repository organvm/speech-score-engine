---
title: "Speech score terminology charter"
source_path: "dramaturgist-tuning-markdown-archive/sources/speech-score-terminology-charter.md"
source_sha1: "c938bec2eb0c"
project_save_id: "ProjectSave_b998d54ce67c819189cf42e060142ae0"
conversation_id: "69c700a2-2b2c-832f-bb09-8a6d069b352b"
conversation_title: "Gap Analysis and Merging"
canvas_index: 2
date_in_chatgpt: "2026-03-27"
recovered_at: "2026-05-13"
---
# $TERMINOLOGY_CHARTER

## $DOCUMENT_PURPOSE

This charter governs language across product copy, specifications, schema, API contracts, UI labels, repository structure, and implementation handoff. Its job is to prevent ontological drift. The system must remain legible as a speech-score composition system rather than collapsing into the weaker categories of script reader, voice utility, or generic TTS wrapper. fileciteturn5file7 fileciteturn5file19

## $GOVERNING_SENTENCE

**The system treats language as a dual-aspect object: semantic content and timed performance.**
Every naming decision must preserve both sides of that claim. If a term hides either meaning or temporal behavior, reject it. fileciteturn5file7

## $CANONICAL_IDENTITY

| Layer | Canonical term | Status | Usage rule |
|---|---|---:|---|
| Master system name | Speech-Score Composition System | Approved | Use in external prose, formal category language, deck copy, and high-level documentation |
| Internal system identifier | `$SPEECH_SCORE_ENGINE` | Approved | Use in specifications, architecture docs, schemas, and repo-level ontology |
| Product-surface descriptor | Dramaturgical-Audio Workbench | Approved | Use for adoptable commercial surface and user-facing product explanation |
| Deep-system descriptor | Polyvocal Speech-Composition Engine | Approved | Use when distinguishing deeper compositional layer from the initial product wedge |
| Secondary designation | Post-Script Theatrical Composition Environment | Permitted | Use selectively in theoretical or manifesto-style contexts |
| Category shorthand | Speech-score system | Approved | Use when compactness is needed without loss of ontology |

These expressions are the stable vocabulary core and should remain fixed unless the ontology itself changes. fileciteturn5file7 fileciteturn5file9

## $APPROVED_TERMS

| Canonical term | Definition | Preferred scope |
|---|---|---|
| `$PHRASE_EVENT` | Primary compositional unit; a bounded utterance or fragment with semantic, temporal, and relational properties | Data model, theory, architecture, score logic |
| `$VOICE_CHANNEL` | Speaking carrier independent from literary character identity | Data model, rendering, analysis, live execution |
| `$TEMPORAL_RELATION` | Primary organizing principle governing cue order, overlap, delay, recurrence, silence, and entry logic | Theory, architecture, diagnostics |
| `$TIMING_SUBSTRATE` | Temporal kernel supporting clock, beat, cue-relative, and elastic time | Architecture, implementation, timing services |
| `$NOTATION_RENDERER` | Service producing readable script, rhythmic score, spatial matrix, and performer part views | Output layer, rendering subsystem |
| `$REHEARSAL_KERNEL` | Bridge translating composition objects into cue sheets, drills, stems, and count structures | Rehearsal tooling, exports |
| `$LIVE_EXECUTION_LAYER` | Real-time coordination layer for performance control and override | Performance infrastructure |
| `$ANALYSIS_ENGINE` | Dramaturgical diagnostic layer for timing, pacing, speaker differentiation, repetition, and interruption logic | Product diagnostics, analysis subsystem |
| `$COMPOSITION_LAYER` | Authoring environment for phrase-events, recurrence rules, and structural transformations | Product architecture |
| `$PHRASE_EVENT_MODEL` | Canonical structured representation of utterance-level objects | Data modeling, persistence |
| `$READABLE_SCRIPT` | Literary-readable output view | Output naming |
| `$RHYTHMIC_SCORE` | Beat- or measure-oriented output view | Output naming |
| `$SPATIAL_TEXT_SCORE` | Layout-driven score view where typography carries instruction | Output naming |
| `$TABLE_READ_AUDIO` | Rapid auditory draft for dramaturgical listening | Product surface, MVP |
| `$REHEARSAL_PACK` | Export bundle for performers and directors | Output naming |
| `$CONDUCTOR_VIEW` | Control-oriented live view for timing and branching | Later-stage execution layer |
| `$LIVE_PROMPT_VIEW` | Monitor-safe live text display | Later-stage execution layer |
| `$MACHINE_SCORE_OBJECT` | Structured machine-readable score artifact | Export, API, storage |
| `$KINETIC_TEXT_RENDER` | Projection or motion-based visual text output | Advanced output layer |

These terms follow directly from the current conceptual system and output model. fileciteturn5file5 fileciteturn5file6 fileciteturn5file8

## $FORBIDDEN_TERMS

| Forbidden term | Why it is rejected | Replacement |
|---|---|---|
| text-to-speech software | Reduces the system to commodity voice infrastructure | Speech-Score Composition System |
| TTS tool | Flattens ontology and moat | Dramaturgical-Audio Workbench |
| voice generator | Centers the wrong substrate | Table-read audio renderer, voice layer, or render service |
| script reader | Treats the work as inert text | Listening-first revision environment for performative text |
| podcast engine | Misclassifies the medium and excludes live/rehearsal/score dimensions | Speech-score system |
| playwriting app | Too narrow and literature-bound | Dramaturgical-Audio Workbench |
| screenplay reader | Misframes the use case and omits compositional depth | Dialogue revision environment |
| theatre chatbot | Category error | Analysis engine or dramaturgical diagnostic layer |
| audio toy | Trivializing language that weakens institutional seriousness | Product or system term appropriate to layer |
| playback settings | Too vague for the temporal kernel | `$TIMING_SUBSTRATE` |
| formatted script | Too weak for the output model | `$NOTATION_RENDERER` output |
| practice mode | Understates formal rehearsal function | `$REHEARSAL_KERNEL` |
| presentation mode | Understates real-time coordination and override | `$LIVE_EXECUTION_LAYER` |
| AI critique | Overclaims and weakens diagnostic seriousness | `$ANALYSIS_ENGINE` |
| dialogue chunk | Loose and under-specified | `$PHRASE_EVENT` |
| clip | Imports DAW/video baggage and obscures semantic status | `$PHRASE_EVENT` |
| thing / piece / block / snippet | Ontologically weak | Use the precise canonical object term |

These exclusions are not stylistic niceties; they protect the system from being reclassified into commodity categories. fileciteturn5file19 fileciteturn5file17 fileciteturn5file18

## $ALIAS_MAPPINGS

| User-surface term | Internal canonical term | Rule |
|---|---|---|
| scene | `$SCENE` as container, but conceptually subordinate to `$PHRASE_EVENT` and `$TEMPORAL_RELATION` | Allowed in UI; do not treat as deepest unit in specs |
| speaker | `$VOICE_CHANNEL` | Allowed in UI and onboarding; map back internally |
| character | `$VOICE_CHANNEL` or character-to-channel mapping | Allowed only when referring to literary source identity |
| line | `$PHRASE_EVENT` | Allowed for imported scripts and simple editing views; avoid in core ontology |
| readback | `$TABLE_READ_AUDIO` or render playback | Allowed in product copy; avoid in architectural docs |
| dialogue playback | `$TABLE_READ_AUDIO` on the surface, `$TIMING_SUBSTRATE` + render flow underneath | Allowed in product copy |
| script view | `$READABLE_SCRIPT` | Prefer canonical output name in docs |
| score view | `$RHYTHMIC_SCORE` or `$SPATIAL_TEXT_SCORE` | Use precise output name when known |
| voice | voice profile or `$VOICE_CHANNEL`, depending context | Distinguish synthetic voice profile from compositional carrier |
| rehearsal export | `$REHEARSAL_PACK` | Prefer canonical form in docs |
| live mode | `$LIVE_EXECUTION_LAYER` | UI shorthand only |
| diagnostics | `$ANALYSIS_ENGINE` output | Use “diagnostics” in UI; use engine name in architecture |

This preserves adoption-friendly language at the interface while keeping the deeper ontology intact in code and specification. fileciteturn5file16 fileciteturn5file18

## $APPROVED_PATTERN_FAMILIES

| Pattern family | Status | Notes |
|---|---:|---|
| speech-score | Approved | Best high-level hybrid descriptor |
| polyvocal | Approved | Best descriptor for distributed voice architecture |
| post-script | Approved | Strong theoretical framing |
| dramaturgical-audio | Approved | Best product-surface framing |
| performance-writing | Approved | Good bridge term for general audiences |
| temporal writing intelligence | Approved | Strong positioning term for moat language |

## $DISPREFERRED_PATTERN_FAMILIES

| Pattern family | Status | Notes |
|---|---:|---|
| AI voice | Rejected | Centers commodity infrastructure |
| script reader | Rejected | Literature-bound reduction |
| podcast engine | Rejected | Category narrowing |
| theatre chatbot | Rejected | Nonsensical framing |
| audio toy | Rejected | Trivializing and unserious |

These pattern families were already implicit in the prior naming rules and product-surface strategy. fileciteturn5file16 fileciteturn5file18

## $REPO_WIDE_NAMING_CONVENTIONS

### $CONVENTION_01_SYSTEM_AND_ONTOLOGY_NAMES

External category names use **Title Case**. Internal ontological entities use **`$UPPER_SNAKE_CASE`**. This rule is already established and should be universal across specifications, ADRs, architecture notes, and formal schemas. fileciteturn5file16

Examples:

```text id="ik2six"
Speech-Score Composition System
Dramaturgical-Audio Workbench
Polyvocal Speech-Composition Engine

$SPEECH_SCORE_ENGINE
$PHRASE_EVENT
$VOICE_CHANNEL
$TIMING_SUBSTRATE
$ANALYSIS_ENGINE
```

### $CONVENTION_02_DATABASE_IDENTIFIERS

Database tables, columns, and SQL artifacts use **lowercase snake_case** without `$` prefixes. This follows the existing repository blueprint and migration stubs. fileciteturn5file13

Examples:

```sql id="z4e8y5"
app_user
scene
scene_version
version_line
playback_render
diagnostic_report
share_link
created_at
estimated_duration_ms
```

### $CONVENTION_03_TYPESCRIPT_EXPORTED_TYPES

Exported interfaces, types, classes, React components, and service contracts use **PascalCase**. Internal field names use **camelCase**. This follows the implementation handoff package and interface contracts. fileciteturn5file15

Examples:

```ts id="zdl5s6"
ParseSceneResult
CreateSceneVersionInput
RenderDispatchService
VoiceProviderAdapter

sceneId
versionId
renderScope
estimatedDurationMs
```

### $CONVENTION_04_FILE_AND_DIRECTORY_NAMES

Files and directories use **kebab-case** for human-legible artifact names and workflow modules, except where framework conventions require otherwise. Domain module directories should reflect ontology, not generic utilities. This follows the repo blueprint’s modular structure. fileciteturn5file13

Examples:

```text id="a1m3sk"
docs/architecture/002-domain-model.md
apps/api/src/services/render-dispatch.service.ts
packages/domain/src/parsing/parse-scene-input.ts
packages/database/migrations/0003_add_scene_versions_version_lines.sql
```

### $CONVENTION_05_API_PATHS

HTTP routes use **lowercase plural resource nouns** and stable version prefixes. Do not place theoretical vocabulary directly into public API paths unless the concept is truly public-facing. API surface should remain operationally legible. fileciteturn5file15

Examples:

```text id="3kzyru"
/api/v1/projects
/api/v1/scenes/{scene_id}
/api/v1/versions/{version_id}/renders
/api/v1/versions/{version_id}/diagnostics/latest
```

### $CONVENTION_06_EVENT_NAMES

Domain events use **noun.action.state** in lowercase dot notation. This convention is already proposed for render, parse, playback, version, and share flows and should be enforced universally. fileciteturn5file13

Examples:

```text id="7ljb1o"
scene.parse.requested
scene.parse.committed
version.created
render.completed
playback.started
diagnostic.viewed
share.revoked
```

### $CONVENTION_07_ENVIRONMENT_VARIABLES

Environment variables remain **`$UPPER_SNAKE_CASE`** and environment-first configuration remains mandatory. This is already aligned with the implementation package. fileciteturn5file15

Examples:

```bash id="d9mnio"
$DATABASE_URL
$REDIS_URL
$VOICE_PROVIDER_API_KEY
$APP_BASE_URL
$PUBLIC_SHARE_BASE_URL
$LOG_LEVEL
```

### $CONVENTION_08_DOC_ARTIFACT_IDS

Formal documents should continue using stable IDs in the form:

```text id="398x9k"
<domain-subject>_<artifact-class>_<YYYYMMDD>
```

Examples:

```text id="061noz"
audio-dramaturgical-studio_mvp-system-design-package_20260327
audio-dramaturgical-studio_repository-blueprint-and-handoff_20260327
```

This matches the current document style and preserves machine-sortable continuity. fileciteturn5file13

## $SEMANTIC_BOUNDARY_RULES

The system must always be named from the inside out.

When referring to the ontology, use composition language.
When referring to the product wedge, use listening-and-revision language.
When referring to infrastructure, use render, provider, storage, queue, and contract language.
Do not let infrastructure names overwrite ontology names.

That means the following distinction must remain permanent:

The system is a **speech-score composition system**.
The product surface is a **dramaturgical-audio workbench**.
The voice layer is only infrastructure. fileciteturn5file7 fileciteturn5file9 fileciteturn5file18

## $NAMING_TESTS

A proposed term is acceptable only if it passes all four tests.

| Test | Question | Pass condition |
|---|---|---|
| Dual-aspect test | Does the term preserve both meaning and timed performance? | Must preserve both |
| Depth test | Does the term fit the deeper system, not only the MVP surface? | Must scale upward |
| Non-commodification test | Does the term avoid collapsing the product into commodity voice tooling? | Must avoid TTS-first framing |
| Translation test | Does the term remain valid across page, audio, rehearsal, and live execution? | Must remain cross-medium valid |

These tests follow directly from the project’s canonical definition and invariants. fileciteturn5file6 fileciteturn5file7

## $ENFORCEMENT_RULE

In cases of conflict, the order of authority is:

| Priority | Source of truth |
|---|---|
| 1 | `$GOVERNING_SENTENCE` |
| 2 | `$CANONICAL_IDENTITY` |
| 3 | `$APPROVED_TERMS` |
| 4 | `$ALIAS_MAPPINGS` |
| 5 | product-surface simplifications |

If a UI term conflicts with ontology, the UI term stays local to UI only. It must not leak into schema, API contracts, or architectural language.

## $FINAL_CHARTER_STATEMENT

**All repository, product, and documentation language must preserve the system’s identity as a speech-score composition system whose fundamental object is not inert text but structured temporal language. Use adoption-friendly aliases at the surface where useful, but preserve canonical internal terms in schema, contracts, architecture, and code. Do not name the system as a TTS tool, script reader, or voice generator.** fileciteturn5file19 fileciteturn5file9

The next clean artifact is a **`$LEXICON_AND_STYLE_GUIDE.md`** file formatted exactly as a repo document, ready to drop into `docs/architecture/`.
