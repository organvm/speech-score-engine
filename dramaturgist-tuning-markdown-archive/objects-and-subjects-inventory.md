---
title: "Objects and Subjects Inventory (raw-transcript derivation)"
purpose: "Single-document inventory of every distinct object and subject named, alluded to, defined, or left undefined across the 36 raw conversation-pair transcripts in dramaturgist-tuning-markdown-archive/."
audience: "Any agent or human reading the design corpus who needs an ontological index complementary to the chat-structure inventories (00-manifest.json, codex-conversation-inventory.{md,tsv}) and the provenance index (sources/SOURCES-INDEX.md)."
authority: provisional
created_at: "2026-05-13"
relates_to: ["00-README.md", "codex-conversation-inventory.md", "sources/SOURCES-INDEX.md"]
---

# Objects and Subjects Inventory (raw-transcript derivation)

## Provenance and method

This file is derived from the **36 raw conversation-pair files** at `dramaturgist-tuning-markdown-archive/dt-NN-MMM--*.md` — the per-pair extractions of the ChatGPT `dramaturgist-tuning` project. The 12 canvas docs in `sources/` are excluded; they are downstream synthesis artifacts, not raw transcripts.

Extraction proceeded in two passes:

**Pass A — Mechanical (`$TOKEN` literals).** A regex sweep (`grep -hoE '\$[A-Z][A-Z0-9_]+'`) over all 36 transcripts yielded 526 distinct `$VARIABLE`-style identifiers. These are the system's literal ontology tokens; the project's `CLAUDE.md` flags them as "domain ontology, not template placeholders." They are listed verbatim in Section 1.

**Pass B — Semantic (named non-token entities).** Three parallel reading agents covered the corpus in chronological eras:
- **Era 1** (definition / formalization): 13 files, dt-01 through dt-04 — 308 entities.
- **Era 2** (tracker / audio / voice-synthesis feasibility): 12 files, dt-05 through dt-07-007 — 232 entities.
- **Era 3** (prompt freedom / governance / discrepancy): 11 files, dt-07-008 through dt-09 — 209 entities.

Each entity was classified as one of:
- **defined** — given an explicit definition, schema, or spelled-out description.
- **mentioned** — named in passing without elaboration.
- **alluded** — referenced indirectly, by metaphor, or implied (technology that becomes explicit only later; a concept whose name precedes its specification).
- **undefined** — flagged as something that should be specified but never gets specified.

Cross-era duplicates are **preserved**, not collapsed — an entity that appears in multiple eras gets one entry per era, because its status and surrounding framing typically shift. Section 5 enumerates the cross-cutting entities.

Sectioned, alphabetized within section. Totals: 526 `$TOKEN` identifiers + 749 semantic entities (with duplicates across eras retained) = **1,275 catalogued items**.

---

## Section 1: $TOKEN identifiers (mechanical regex extraction)

526 distinct `$UPPER_SNAKE_CASE` strings appearing literally in the 36 raw transcripts. Listed alphabetically. Six pairs end in trailing `__` (e.g. `$ACTOR_ID` and `$ACTOR_ID__`); the `__` variants are filename-template artifacts of the regex boundary (the strings `${ACTOR_ID}__${SCRIPT_ID}__...` appear in clip-naming rules) — they reflect the same conceptual token as their unsuffixed counterparts but are preserved as literal string occurrences.

```text
$ACCENT_NOTES
$ACCESS_MODE
$ACCOUNT_PLAN
$ACTION
$ACTOR_ID
$ACTOR_ID__
$ACTOR_NAME
$ACTUAL_DURATION
$ALIAS_MAPPINGS
$ALIAS_TO_CANONICAL_TERM_MAPPING
$ALLOWED_FIELDS
$ANALYSIS_ENGINE
$ANALYTICS_AND_AUDIT_ENDPOINTS
$API_BASE_URL
$API_LAYER
$API_PORT
$API_STYLE
$APP_API
$APP_BASE_URL
$APP_DB
$APP_WEB
$APP_WORKER
$APPLICATION_LAYER
$APPROVED_PATTERN_FAMILIES
$APPROVED_TERMS
$ARCHIVE_AND_EXPORT_LAYER
$ARCHIVE_DRIVE
$ARCHIVE_ROOT
$ARRANGEMENT_EDIT_REQUEST
$ARRANGEMENT_VIEW
$ASSERTION
$ASSET_LAYER
$ASYNC_LAYER
$ATTRIBUTION_INVARIANT
$AUDIO_FORMAT
$AUDIO_URI
$AUTH_ENDPOINTS
$AUTH_SESSION_SECRET
$BIT_DEPTH
$BOUNDARY_INVARIANT
$BRIDGE_PROTOCOL
$CALIBRATION_UPDATE
$CANONICAL_EXPRESSION_SET
$CANONICAL_IDENTITY
$CANONICAL_OBJECTS_TOUCHED
$CANONICAL_PROJECT_DEFINITION_STATEMENT
$CANONICAL_TERM
$CAPTURE_DATE
$CAPTURE_ENGINEER
$CAPTURE_LOCATION
$CAUSE_CLASS
$CHATGPT_CLAIM
$CHECK_RECORD
$CI_CD_BLUEPRINT
$CLAIM
$CLAIM_ID
$CLAIM_PANEL
$CLAIM_SOURCE
$CLAIM_TEXT
$CLAIM_TYPE
$CLIP_FILENAME
$CLUSTER_PASSAGE
$COMMANDS
$COMMIT_STATUS
$COMPANY_ID
$COMPARISON_DIMENSIONS
$COMPOSITION_LAYER
$CONDITIONS
$CONDUCTOR_VIEW
$CONFIDENCE
$CONFIDENCE_GAP
$CONSENT_DATE
$CONSENT_POLICY_VERSION
$CONSENT_STATUS
$CONTRACT_ID
$CONTRACT_SELECTION
$CONTRACT_SOURCE
$CONTRACT_STYLE
$CONTROL_VARS
$CONVENTION_01_SYSTEM_AND_ONTOLOGY_NAMES
$CONVENTION_02_DATABASE_IDENTIFIERS
$CONVENTION_03_TYPESCRIPT_EXPORTED_TYPES
$CONVENTION_04_FILE_AND_DIRECTORY_NAMES
$CONVENTION_05_API_PATHS
$CONVENTION_06_EVENT_NAMES
$CONVENTION_07_ENVIRONMENT_VARIABLES
$CONVENTION_08_DOC_ARTIFACT_IDS
$CORE_DIAGNOSTIC_EVENTS
$CORE_PARSE_EVENTS
$CORE_PLAYBACK_EVENTS
$CORE_RENDER_EVENTS
$CORE_SHARE_EVENTS
$CORE_VERSION_EVENTS
$CREATED_AT
$CSV_HEADERS
$DATA_LAYER
$DATABASE_MIGRATION_STUBS
$DATABASE_URL
$DEFAULT_PACING_PROFILE_ID
$DEFAULT_VOICE_PROFILE_ID
$DEFAULTS
$DEFINITION
$DELIVERY_STATUS
$DERIVED_ARTIFACT_INVARIANT
$DERIVED_OUTPUTS
$DESCRIPTION
$DESIGN_GOALS
$DETAILED_APP_STRUCTURE
$DETERMINISTIC_RENDER_INVARIANT
$DIAGNOSTIC_ENDPOINTS
$DIAGNOSTIC_REQUEST
$DIALOGUE_LISTENING_WORKBENCH
$DIFFERENCE_PANEL
$DIFFERENCE_RECORD
$DIFFERENCE_VECTOR
$DIRECTION
$DISPERSAL_PASSAGE
$DISPLAY_LABEL
$DISPLAY_NAME
$DISPREFERRED_PATTERN_FAMILIES
$DOCUMENT_ID
$DOCUMENT_PURPOSE
$DOMAIN
$DOMAIN_ACTION
$DOMAIN_ACTION_SELECTION
$DOMAIN_RULES_AND_INVARIANTS
$DRAMATURGICAL_MACRO
$DUAL_ASPECT_INVARIANT
$DURATION_MS
$DURATION_RULE
$DURATION_RULES
$EMAIL
$EMPHASIS_HINT
$EMPHASIS_RULE
$END_TC
$ENDPOINT_AND_INTERFACE_CONTRACTS
$ENFORCEMENT_RULE
$ENGINE_TARGET
$ENGINEERING_OWNER
$ENTITY_RELATION_OVERVIEW
$ENTRY_RULES
$ERROR_CLASS
$ESTIMATED_DURATION_MS
$EVENT_EMISSION
$EVENT_IDS
$EVENT_MODEL_PURPOSE
$EVENT_NAMING_PATTERN
$EVENT_SOURCE
$EVENT_STORE_BEHAVIOR
$EVENTS_EMITTED
$EVIDENCE_TYPE
$EXCLUSIONS
$EXPECTED_OUTCOME
$EXPIRES_AT
$FAILURE_CODES
$FALLBACK_VOICE_PROFILE_ID
$FILE_NAMING_STANDARD
$FINAL_CANONICAL_STATEMENT
$FINAL_CHARTER_STATEMENT
$FLAG_SET
$FLOW_ADJUST_VOICES_AND_TIMING
$FLOW_COMPARE_VERSIONS
$FLOW_CREATE_AND_HEAR_SCENE
$FLOW_INSPECT_SCENE_STRUCTURE
$FLOW_REVISE_TEXT_AGAINST_AUDIO
$FLOW_SHARE_FOR_REVIEW
$FOLDER_PURPOSES
$FOLLOWUP_ACTION
$FORBIDDEN_TERMS
$FOUNDATIONAL_DATA_MODEL_DECISION
$FR_DIAGNOSTICS
$FR_PERFORMANCE_AND_LATENCY
$FR_PERSISTENCE
$FR_PLAYBACK
$FR_PROJECT_ORGANIZATION
$FR_SCRIPT_INPUT
$FR_SCRIPT_PARSING
$FR_SHARE
$FR_SPEAKER_MANAGEMENT
$FR_TIMING_CONTROLS
$FR_VERSIONING
$FR_VOICE_ASSIGNMENT
$FUNCTIONAL_REQUIREMENTS
$GENERATED_AT
$GOVERNING_SENTENCE
$HTTP_CONTRACTS
$HYPOTHESIS_DIFFERENCE_ENGINE
$IMPLEMENTATION_HANDOFF_PARAGRAPH
$IMPLEMENTATION_ORDER_INSIDE_THE_REPO
$IMPLEMENTATION_PRINCIPLE
$INTENSITY
$INTENT_RESOLUTION
$INTERNAL_SERVICE_CONTRACTS
$INTERPRETATION
$INVARIANT_CHECKS
$IS_STAGE_DIRECTION
$KINETIC_TEXT_RENDER
$LANGUAGE_CODE
$LAST_ACTIVE_AT
$LEXICON_AND_STYLE_GUIDE
$LINE_ID
$LINE_INDEX
$LITURGICAL_DIALOGUE_SYSTEM
$LIVE_ENGINE
$LIVE_EXECUTION_LAYER
$LIVE_PROMPT_VIEW
$LOCAL_DEVELOPMENT_BOOTSTRAP
$LOG_LEVEL
$LOGOS_AS_SCORE
$MACHINE_SCORE_OBJECT
$MAGNITUDE
$MASTER_CAPTURE_SHEET
$MASTER_CAPTURE_SHEET_HEADERS
$MASTER_CLIP_FILENAME
$MATCH_SCORE
$MIC_ID
$MINIMUM_TESTING_MATRIX
$MOVEMENT
$MVP_ACCEPTANCE_CRITERIA
$MVP_INTENT
$MVP_RISKS
$MVP_SCOPE
$NAMING_RULES
$NAMING_TESTS
$NEXT_CHECK
$NEXT_LOGICAL_ARTIFACT
$NEXT_LOGICAL_ARTIFACTS
$NODE_ENV
$NOISE_STATUS
$NON_FUNCTIONAL_REQUIREMENTS
$NORMALIZATION_COMMENTARY
$NOTATION_RENDERER
$NOTES
$NOUN
$OBJECT_DIAGNOSTIC_REPORT
$OBJECT_LINE
$OBJECT_PLAYBACK_RENDER
$OBJECT_PROJECT
$OBJECT_SCENE
$OBJECT_SHARE_LINK
$OBJECT_SPEAKER
$OBJECT_STORAGE_ACCESS_KEY
$OBJECT_STORAGE_BUCKET
$OBJECT_STORAGE_ENDPOINT
$OBJECT_STORAGE_SECRET_KEY
$OBJECT_STORE_URI
$OBJECT_USER
$OBJECT_VERSION
$OBJECT_VOICE_PROFILE
$OBSERVABILITY_LAYER
$OBSERVATION
$OBSERVED_OUTCOME
$ONTOLOGY_SOURCE
$OUT_OF_SCOPE_FOR_MVP
$OVERLAP_FLAG
$OVERLAP_RULE
$OVERLAP_RULES
$OWNER_USER_ID
$PAN
$PARSE_ENDPOINTS
$PARSED_TEXT
$PARSED_TEXT_SNAPSHOT
$PASSAGE
$PASSAGE_PATTERN
$PATTERN_AGGREGATION
$PATTERN_EDIT_REQUEST
$PATTERN_VIEW
$PAUSE_AFTER_MS
$PAUSE_STYLE_PROFILE
$PER_ACTOR_INTAKE_SHEET
$PERFORMANCE_ENVELOPE
$PHASE_ALPHA_0_FOUNDATION
$PHASE_ALPHA_1_FIRST_HEARING_LOOP
$PHASE_ALPHA_2_REVISION_TRUST
$PHASE_ALPHA_3_DIAGNOSTIC_LAYER
$PHASE_BETA_OPENING
$PHASE_PRIVATE_BETA_1_WORKFLOW_INTEGRATION
$PHASE_PRIVATE_BETA_2_QUALITY_AND_RETAINABILITY
$PHRASE_CLIP
$PHRASE_EVENT
$PHRASE_EVENT_MODEL
$PHRASE_ID
$PITCH_OFFSET
$PLAYBACK_RENDER
$POLYPHONIC_PERFORMANCE_ENGINE
$POLYPHONIC_PLAYWRITING_SYSTEM
$POLYPHONIC_SPEECH_ENGINE
$POST_SCRIPT_PERFORMANCE_OS
$PRIMARY_USER_FLOWS
$PRIMARY_USER_TYPES
$PRODUCT_ID
$PROJECT_ENDPOINTS
$PROJECT_ID
$PROMPT_FREEDOM
$PROMPT_FREEDOM_POLICY
$PROMPT_GOVERNANCE_CHARTER
$PROMPT_ID
$PROMPT_INPUT
$PROMPT_READYNESS_CHECKLIST
$PROMPT_ROLE
$PROMPTS_SHALL_NOT_DEFINE_THE_SYSTEM
$PROMPTS_SHALL_SELECT_WITHIN_THE_SYSTEM
$PROTO_01
$PROTO_02
$PROTO_PLAY_01
$PUBLIC_SHARE_BASE_URL
$PURPOSE
$RATE
$RAW_TEXT
$RAW_TEXT_SNAPSHOT
$READABLE_PASSAGE
$READABLE_SCRIPT
$REALITY_CHECK
$REALITY_CHECK_ENGINE
$REALITY_INPUT
$REALITY_PANEL
$REALITY_SOURCE
$RECOMMENDED_DURATION_PLAN
$RECOMMENDED_ENVIRONMENT_VARIABLES
$RECORDING_PROTOCOL
$REDIS_URL
$REHEARSAL_KERNEL
$REHEARSAL_PACK
$RENDER_ENDPOINTS
$RENDER_ID
$RENDER_REQUEST
$RENDER_SCOPE
$RENDER_STATUS
$RENDER_WORKER
$REPEAT
$REPEAT_RULE
$REPEAT_RULES
$REPO_ROOT
$REPO_WIDE_NAMING_CONVENTIONS
$REPORT_ID
$REPOSITORY_STRATEGY
$REQUEST_TYPE
$REQUIRED_FIELDS
$REVISION
$RHYTHMIC_SCORE
$ROLE_OR_COMPANY_FUNCTION
$ROOM_ID
$ROW
$SAMPLE_RATE
$SCENE
$SCENE_CLIP
$SCENE_EDIT_REQUEST
$SCENE_ENDPOINTS
$SCENE_ID
$SCENE_PARSE_REQUEST
$SCENE_STATUS
$SCENE_VERSION
$SCREEN_01_ENTRY_AND_AUTH
$SCREEN_02_DASHBOARD
$SCREEN_03_NEW_SCENE_IMPORT
$SCREEN_04_PARSE_REVIEW
$SCREEN_05_SCENE_WORKSPACE
$SCREEN_06_SPEAKER_AND_VOICE_PANEL
$SCREEN_07_DIAGNOSTIC_PANEL
$SCREEN_08_VERSION_HISTORY
$SCREEN_09_COMPARE_VERSIONS
$SCREEN_10_SHARE_VIEW
$SCREEN_ARCHITECTURE
$SCREEN_AUTH_AND_ENTRY
$SCREEN_DASHBOARD
$SCREEN_DIAGNOSTIC_PANEL
$SCREEN_NEW_SCENE_IMPORT
$SCREEN_SCENE_WORKSPACE
$SCREEN_SHARE_VIEW
$SCREEN_SPEAKER_ASSIGNMENT
$SCREEN_VERSION_HISTORY
$SCRIPT_CLASS
$SCRIPT_ID
$SCRIPT_ID__
$SCRIPT_REGISTRY
$SCRIPT_REGISTRY_HEADERS
$SCRIPT_TITLE
$SELECTION_STATUS
$SEMANTIC_BOUNDARY_RULES
$SEMANTIC_GAP
$SEMANTIC_TAGS
$SERVICE_01_WEB_CLIENT
$SERVICE_02_APPLICATION_API
$SERVICE_03_RENDER_WORKER
$SERVICE_04_DATABASE_LAYER
$SERVICE_05_PROVIDER_ADAPTERS
$SERVICE_BOUNDARIES
$SESSION_ID
$SESSION_LAUNCH_REQUEST
$SESSION_VIEW
$SETTINGS_SNAPSHOT
$SHARE_CREATE_REQUEST
$SHARE_ENDPOINTS
$SHARE_ID
$SHARE_VIEW
$SHARED_PACKAGE_STRUCTURE
$SHORT_OPERATING_VERSION
$SIDE_EFFECTS
$SORT_ORDER
$SPATIAL_RULE
$SPATIAL_RULES
$SPATIAL_TEXT_SCORE
$SPEAKER
$SPEAKER_ENDPOINTS
$SPEAKER_ID
$SPEECH_COMMAND
$SPEECH_RATE
$SPEECH_SCORE_ENGINE
$START_ROW
$START_RULE
$START_TC
$STATE
$STATE_COMMIT
$STATE_MUTATION_POLICY
$STEMMED_AUDIO_RENDER
$STRICT_TERMINOLOGY
$STRUCTURAL_GAP
$STYLE_CLASS
$STYLE_CLASS__
$SUBJECT
$SUCCESS_METRICS
$SUMMARY
$SYSTEM_OBJECTS
$SYSTEM_PREPARATION
$SYSTEM_PREPARATION_POLICY
$SYSTEM_SCOPE
$TABLE_AUDIT_EVENT
$TABLE_DIAGNOSTIC_REPORT
$TABLE_PLAYBACK_RENDER
$TABLE_PROJECT
$TABLE_READ_AUDIO
$TABLE_RENDER_PROFILE
$TABLE_SCENE
$TABLE_SCENE_VERSION
$TABLE_SHARE_LINK
$TABLE_SPEAKER
$TABLE_USER
$TABLE_VERSION_LINE
$TABLE_VOICE_PROFILE
$TAKE_ID
$TAKE_ID__
$TAKE_LOG
$TAKE_LOG_HEADERS
$TAKE_STATUS
$TAKE_STATUS_CONTROLLED_VALUES
$TARGET_CLASS
$TARGET_DURATION
$TARGET_DURATION_TOTAL
$TEMPORAL_DRAMA_MACHINE
$TEMPORAL_RELATION
$TERMINOLOGY_CHARTER
$TEST_GATE_POLICY
$TEST_GATE_RESULTS
$TEST_GATES
$TEST_SOURCE
$TEXT
$TEXT_CONTENT
$TEXT_OWNER
$THEATRE_AS_NOTATION_PLATFORM
$THEATRE_COMPANY_VOICE_CAPTURE_SHEET
$THEATRICAL_MUSIC_OS
$TIER
$TIER__
$TIME_CONTEXT
$TIME_HORIZON
$TIME_OBSERVED
$TIMING_ENGINE
$TIMING_GAP
$TIMING_SUBSTRATE
$TITLE
$TOP_LEVEL_REPOSITORY_LAYOUT
$TRANSACTIONAL_DATABASE_RULES
$TRANSFORM_RULE
$TRANSFORM_RULES
$TTS_PROVIDER_URI
$UNIT_RULES
$UPDATED_AT
$UPPER_SNAKE_CASE
$USAGE_SCOPE
$USAGE_SCOPE_CONTROLLED_VOCABULARY
$USER_ALIAS
$USER_DIRECTOR_LIGHT
$USER_DRAMATURG
$USER_ID
$USER_PLAYWRIGHT
$USER_TEACHER_LIGHT
$UTTERANCE_ANCHOR
$VALIDATION_RULES
$VERSION_CREATE_REQUEST
$VERSION_ENDPOINTS
$VERSION_ID
$VERSION_IMMUTABILITY_INVARIANT
$VERSION_LABEL
$VOCAL_LIMITATIONS
$VOCAL_RITUAL_SEQUENCER
$VOCAL_SEQUENCER_FOR_THEATRE
$VOICE_BEHAVIOR_RACK
$VOICE_CACHE_DIR
$VOICE_CHANNEL
$VOICE_CHANNEL_01
$VOICE_CHANNEL_01_PROFILE
$VOICE_CHANNEL_02
$VOICE_CHANNEL_02_PROFILE
$VOICE_CHANNEL_03
$VOICE_CHANNEL_03_PROFILE
$VOICE_CHANNEL_04
$VOICE_CHANNEL_04_PROFILE
$VOICE_ENDPOINTS
$VOICE_ENGINE
$VOICE_GENDER_PRESENTATION
$VOICE_ID
$VOICE_LABEL
$VOICE_MODEL_KEY
$VOICE_PROFILE_ID
$VOICE_PROFILE_ID__
$VOICE_PROFILE_ID_NAMING_RULE
$VOICE_PROVIDER
$VOICE_PROVIDER_API_KEY
$VOICE_PROVIDER_ID
$VOICE_PROVIDER_MODE
$VOICE_RENDER_ADAPTER
$VOICE_RULES
$VOICE_TIMBRE_CLASS
$WEB_PORT
$WORK
$WORK_TIMELINE
```

---

## Section 2: Era 1 — Definition / Formalization (dt-01 → dt-04)

Files covered:
- `dt-01-001--predict-system-from-photos.md` / `dt-01-002--formalize-system-concept.md`
- `dt-02-001--predict-system-from-photos.md`
- `dt-03-001--predict-system-from-photos.md` through `dt-03-006--repository-blueprint-handoff.md`
- `dt-04-001--gap-analysis-and-merge.md` through `dt-04-004--lexicon-and-style-guide.md`

Era contour: the formalization arc. The "Audio-Form Problem" surfaces in dt-01-001, the `$SPEECH_SCORE_ENGINE` concept is formalized in dt-01-002 with seven canonical invariants, naming candidates compete and settle through dt-02 and dt-04-002, the MVP boundary draws in dt-03-003, the full Product-Design and Systems Package + Repository Blueprint ship in dt-03-005/006, and the Terminology Charter + Lexicon close dt-04. Status distribution skews to *defined*; *alluded* clusters on technologies the blueprint implies but doesn't name (Next.js via App Router shape, BullMQ via "queue-backed worker," Biome via "lint").


### Components / Services / Modules

- **Analysis Engine** — *defined* — first in `dt-01-002--formalize-system-concept.md` — dramaturgical diagnostic layer for pacing drag, low speaker differentiation, broken interruption logic, rhythm monotony; canonical replacement for "AI critique."
- **Application API** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `apps/api/` Fastify-equivalent service owning auth, scene CRUD, parsing orchestration, version creation, diagnostics, share, render dispatch.
- **Archive and Export Layer** — *defined* — first in `dt-01-002--formalize-system-concept.md` — stores work as human-legible document and machine-readable composition object; exports PDF, audio, JSON, captions.
- **Artifact Storage Service** — *mentioned* — first in `dt-03-006--repository-blueprint-handoff.md` — `apps/worker/src/services/artifact-storage.service.ts`; render output persistence boundary.
- **Audio Assembly Pipeline** — *mentioned* — first in `dt-03-006--repository-blueprint-handoff.md` — worker pipeline (`audio-assembly.ts`) combining rendered voice segments into the final composite asset.
- **Audit Event Scaffolding** — *defined* — first in `dt-03-005--product-design-systems-package.md` — telemetry/event-store table `audit_event` capturing scene, parse, version, render, diagnostic, share actions.
- **Browser Client** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `apps/web/`; owns workspace, dashboard, parse review, diagnostics panel, version history, comparison, share view.
- **Cleanup Assets Job** — *mentioned* — first in `dt-03-006--repository-blueprint-handoff.md` — worker job (`cleanup-assets.job.ts`) for asset retention.
- **Client SDK** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `packages/client-sdk/`; shared API client functions and request/response types preventing endpoint drift.
- **Composition Layer** — *defined* — first in `dt-01-002--formalize-system-concept.md` — authoring environment where users write text, assign voices, fragment lines into phrase-events, declare recurrence rules.
- **Conductor View** — *defined* — first in `dt-01-002--formalize-system-concept.md` — live control output for entries, pulse, holds, branch points.
- **Config Package** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `packages/config/`; env parsing, typed configuration, runtime config logic.
- **Database Package** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `packages/database/`; schema, migrations, ORM/query layer, repository abstractions, seeds, transaction helpers.
- **Diagnostic Panel** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — UI surface exposing scene structure metrics and weak-point candidates.
- **Diagnostics Service** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — TS service contract (`DiagnosticsService.generate`) producing `GenerateDiagnosticsResult` reports.
- **Dialogue Listening Workbench** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — Product Layer One; accessible commercial entry point where a writer pastes a scene and immediately hears it back.
- **Domain Package** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `packages/domain/`; core domain model, schemas, value objects, enums, parsers, event names.
- **Generate Diagnostics Job** — *mentioned* — first in `dt-03-006--repository-blueprint-handoff.md` — worker job (`generate-diagnostics.job.ts`) for async report generation.
- **Kinetic Text Render** — *defined* — first in `dt-01-002--formalize-system-concept.md` — projection or motion-based visual text output for installation/screen forms.
- **Live Execution Layer** — *defined* — first in `dt-01-002--formalize-system-concept.md` — real-time performance coordination with conductor view, countdown, tempo map, monitor prompts.
- **Live Prompt View** — *defined* — first in `dt-01-002--formalize-system-concept.md` — monitor-safe text display for performers during workshop or performance.
- **Machine Score Object** — *defined* — first in `dt-01-002--formalize-system-concept.md` — JSON-like structured score output for software reuse, archival search, recomposition.
- **Notation Renderer** — *defined* — first in `dt-01-002--formalize-system-concept.md` — produces readable script view, rhythmic score view, spatial matrix view, performer-specific part view.
- **Observability Package** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `packages/observability/`; structured logging, audit emitters, telemetry wrappers, tracing.
- **Phrase Event Model** — *defined* — first in `dt-01-002--formalize-system-concept.md` — canonical data structure storing utterances with text, voice, start/duration/repeat/overlap/emphasis/transform/spatial rules and semantic tags.
- **Playback Transport** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `apps/web/src/components/playback-transport/`; first-class architectural unit for transport controls.
- **Polyphonic Performance Engine** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — Product Layer Two; deeper compositional system for layered voices, staggered repetition, score-like works.
- **Provider Adapters Layer** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — abstracts voice providers, blob storage, future waveform-generation services; prevents vendor coupling.
- **Public Share Layer** — *defined* — first in `dt-03-005--product-design-systems-package.md` — read-only external artifact endpoint with playback, text, diagnostics.
- **Readable Script** — *defined* — first in `dt-01-002--formalize-system-concept.md` — literary-readable output view for writers, readers, archives.
- **Reason Tracker** — *alluded* — first in `dt-02-001--predict-system-from-photos.md` — implied by "sequencer" / "voices as tracks" framing of $VOCAL_SEQUENCER_FOR_THEATRE option.
- **Rehearsal Kernel** — *defined* — first in `dt-01-002--formalize-system-concept.md` — translates score objects into cue sheets, click guides, count-ins, practice stems, loop studies, section isolations.
- **Rehearsal Pack** — *defined* — first in `dt-01-002--formalize-system-concept.md` — export bundle containing performer parts, cue sheets, count maps, loop drills.
- **Render Dispatch Service** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — TS contract (`RenderDispatchService.requestRender`) creating queued render jobs.
- **Render Pipeline** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — worker pipeline (`render-pipeline.ts`) converting version snapshots into audio artifacts.
- **Render Scene Job** — *mentioned* — first in `dt-03-006--repository-blueprint-handoff.md` — worker job (`render-scene.job.ts`) consuming render requests.
- **Render Status Service** — *mentioned* — first in `dt-03-006--repository-blueprint-handoff.md` — worker service (`render-status.service.ts`) tracking render lifecycle.
- **Render Worker** — *defined* — first in `dt-03-005--product-design-systems-package.md` — async queue-backed worker for render jobs; `apps/worker/` in repo blueprint.
- **Rhythmic Score** — *defined* — first in `dt-01-002--formalize-system-concept.md` — measure-aligned or beat-aligned notation output for rehearsal and formal composition.
- **Scene Editor Component** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `apps/web/src/components/scene-editor/`; first-class web architectural unit.
- **Scene Parser Service** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — TS contract (`SceneParserService.parse`) producing `ParseSceneResult` from raw text.
- **Share Link Service** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `apps/api/src/services/share-link.service.ts`; share-token generation and revocation.
- **Spatial Text Score** — *defined* — first in `dt-01-002--formalize-system-concept.md` — visual-field output where typography and distribution carry instruction.
- **Speaker Panel** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `apps/web/src/components/speaker-panel/`; first-class component for speaker management.
- **Stemmed Audio Render** — *defined* — first in `dt-01-002--formalize-system-concept.md` — output of isolated voice channels, click track, composite mix.
- **Table Read Audio** — *defined* — first in `dt-01-002--formalize-system-concept.md` — rapid auditory draft for dramaturgical listening; identified as clearest commercial entry point.
- **Timeline Component** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `apps/web/src/components/timeline/`; speaker timeline visualization.
- **Timing Substrate** — *defined* — first in `dt-01-002--formalize-system-concept.md` — temporal kernel supporting clock, beat, relative cue, and elastic time.
- **UI Package** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `packages/ui/`; reusable UI components, transport controls, diagnostics cards, version history widgets.
- **Version History Component** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `apps/web/src/components/version-history/`; revision-states UI.
- **Versioning Service** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — TS contract (`VersioningService.createVersion` / `restoreVersion`) owning atomic version-snapshot transactions.
- **Voice Engine** — *defined* — first in `dt-01-002--formalize-system-concept.md` — manages voice identity; distinguishes character identity from voice-channel identity.
- **Voice Provider Adapter** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — TS contract (`VoiceProviderAdapter.render`) isolating vendor voice APIs.

### Concepts / Frameworks / Theories

- **Adaptation Layer** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — the unnamed conceptual layer the user recognizes in the *Philip Glass* piece's success.
- **Alternation Density** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — diagnostic metric for speaker-turn frequency; used in flag examples (e.g. `0.41`).
- **Analog-Digital Parity** — *defined* — first in `dt-01-002--formalize-system-concept.md` — invariant six: works must remain extractable for analog rehearsal/performance, not require the software.
- **Analog-Digital Symmetry** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — dual-form system principle; analog rehearsal protocol + digital editor/sequencer.
- **Attributability Invariant** — *defined* — first in `dt-01-002--formalize-system-concept.md` — every utterance must have a definite source channel (invariant two).
- **Audio-First Theatre** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — works performable live AND renderable as sound-first artifacts.
- **Audio-Form Problem** — *defined* — first in `dt-01-001--predict-system-from-photos.md` — the user's framing of the source material's central operative problem.
- **Beat Time** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — one of four timing-substrate modes (alongside clock, relative cue, elastic).
- **Canonical Project Definition** — *defined* — first in `dt-04-002--canonical-project-definition.md` — strict formal definition of $SPEECH_SCORE_ENGINE with scope, terminology, exclusions, naming.
- **Choral Grouping** — *mentioned* — first in `dt-03-003--user-types-mvp-boundary.md` — Layer 4 feature; voice-collective composition technique.
- **Choreography of Speech** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — advanced-user practice category.
- **Click Track** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — referenced from WhatsApp exchange; one of the user's framing questions about source material.
- **Clock Time** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — one of four timing-substrate modes.
- **Compositional Timing** — *defined* — first in `dt-01-002--formalize-system-concept.md` — measure-count, subdivision, phase-offset triggering — opposed to literary timing.
- **Controlled Emergence** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — rule-based, semi-independent channels producing patterned-emergence whole.
- **Controlled Indeterminacy Invariant** — *defined* — first in `dt-01-002--formalize-system-concept.md` — variability must be declared as rule, range, or probability envelope (invariant eight).
- **Coordinated Vocal Action** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — what the source-material text becomes when read as notation rather than script.
- **Diagnostic Mode** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — listening mode for surfacing likely weaknesses in scene construction.
- **Dramatic-Audio Dialectic** — *alluded* — first in `dt-03-002--dramaturgical-product-frame.md` — opposition between dramaturgical listening and generic TTS framing.
- **Dramaturgical Composition System** — *defined* — first in `dt-01-001--predict-system-from-photos.md` — earliest formal name for the build target; sits at the intersection of theatre, music, sound poetry, notation, sequencing.
- **Dramaturgical Data Structure** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — Moat Layer 1; structured temporal object composed of speaker identity, turn relation, pause logic, interruption potential, rhythmic profile.
- **Dramaturgical Software** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — proposed commercial category the product can occupy.
- **Dramaturgical-Audio Workbench** — *defined* — first in `dt-01-002--formalize-system-concept.md` — canonical product-surface descriptor; accessible commercial surface.
- **Dual-Aspect Invariant** — *defined* — first in `dt-01-002--formalize-system-concept.md` — language must preserve both semantic meaning and temporal behavior (invariant one).
- **Dual-Aspect Test** — *defined* — first in `dt-04-003--terminology-charter.md` — naming test: term must preserve both meaning and timed performance.
- **Elastic Time** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — one of four timing-substrate modes; free elastic time.
- **Execution Architecture** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — framing of attention as infrastructural rather than literary.
- **Exposition Cluster Detection** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — diagnostic flag for exposition-heavy passages.
- **Feature Ladder** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — progression Layer 1 (auditory utility) → Layer 5 (rehearsal/live execution).
- **First Provisional Names (Option A/B/C)** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — three named candidate forms: $POLYPHONIC_PLAYWRITING_SYSTEM, $VOCAL_SEQUENCER_FOR_THEATRE, $THEATRICAL_MUSIC_OS.
- **Foundational Data Model Decision** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — system must store scenes as structured temporal dialogue objects, not plain documents.
- **Hearing for Realism / Theatricality / Pace / Musicality / Interruption / Repetition / Ensemble Texture** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — seven enumerated listening modes the product must support.
- **Human Override Invariant** — *defined* — first in `dt-01-002--formalize-system-concept.md` — invariant seven: conductor/director/performers can override timing without state failure.
- **Human Sequencing** — *defined* — first in `dt-01-001--predict-system-from-photos.md` — the regime adopted by the dramatic source-material when phrases split into atoms.
- **Hybrid Dramaturgical Manifesto/Spec** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — one of three predicted next-concrete-artifact possibilities.
- **Interruption Modeling** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — Layer 3 performance-modeling feature for interruption logic.
- **Jobs-to-Be-Done** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — six jobs: Functional, Diagnostic, Revision, Interpretive, Collaborative, Compositional.
- **Linguistic Choreography** — *defined* — first in `dt-01-001--predict-system-from-photos.md` — core operation: language reorganized through repetition into pattern/event.
- **Listening-First Software** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — preferred positioning over "AI voices for playwrights."
- **Listening-First Revision Environment** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — sharpest commercial-surface formulation; durable category.
- **Literary Timing** — *defined* — first in `dt-01-002--formalize-system-concept.md` — cue-from-preceding-line triggering; opposed to compositional timing.
- **Long Monologue Run** — *defined* — first in `dt-03-005--product-design-systems-package.md` — diagnostic flag type appearing in `flags[]` payloads.
- **Loop Field** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — one of four passage behaviors (alongside dialogue, counterpoint, dispersive text matrix).
- **MVP Boundary** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — drawn around the listening-and-revision proposition; excludes polyphonic overlap, live cueing, classroom admin, etc.
- **Minimalist Speech-Performance Engine** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — compressed prediction; hybrid analog-digital system where spoken language behaves like composed music.
- **Moat Thesis** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — domain-specific temporal model of dramatic language; five moat layers.
- **Movement (compositional)** — *defined* — first in `dt-01-002--formalize-system-concept.md` — collection of passages; intermediate aggregation level above passage and below work.
- **Non-Commodification Test** — *defined* — first in `dt-04-003--terminology-charter.md` — naming test: avoid collapsing product into commodity voice tooling.
- **Notation Environment for Coordinated Vocal Action** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — what dramatic text becomes when read as voice-distribution matrix and iterative phrase field.
- **Passage** — *defined* — first in `dt-01-002--formalize-system-concept.md` — collection of phrase-events; intermediate aggregation level.
- **Phase Composition** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — minimalist-music framing of how text behaves in the source material.
- **Phrase Event** — *defined* — first in `dt-01-002--formalize-system-concept.md` — primary compositional unit; bounded utterance with semantic, temporal, relational properties.
- **Polyphonic Speech Design** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — Moat Layer 4 expansion from natural dialogue into formal composition.
- **Polyphony Mode** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — listening mode for overlapping or layered structures.
- **Polyvocal Speech-Composition Engine** — *defined* — first in `dt-04-002--canonical-project-definition.md` — canonical deep-system descriptor.
- **Polyvocal Speech Works** — *defined* — first in `dt-01-002--formalize-system-concept.md` — works whose text, timing, recurrence, vocal distribution are interoperable across analog and digital forms.
- **Post-Script Performance OS** — *mentioned* — first in `dt-02-001--predict-system-from-photos.md` — alternative ontological designation; one of seven naming candidates.
- **Post-Script Theatrical Composition Environment** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — strongest prediction of build category; permitted secondary designation per charter.
- **Product Staircase** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — strategy of leading with listening surface and revealing compositional depth from inside.
- **Recurrence (as compositional operation)** — *defined* — first in `dt-01-002--formalize-system-concept.md` — first-class structural operation distinct from accidental duplication.
- **Rehearsal Pack** — *defined* — first in `dt-01-002--formalize-system-concept.md` — see also Components section; conceptually defined here as export bundle.
- **Relative Cue Time** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — one of four timing-substrate modes.
- **Repeatable Form** — *defined* — first in `dt-01-001--predict-system-from-photos.md` — the user's mindset goal contrasted with consuming a one-off work.
- **Repetition First-Class Invariant** — *defined* — first in `dt-01-002--formalize-system-concept.md` — invariant three: repetition has count, spacing, transformation, termination.
- **Revision Intelligence** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — Moat Layer 2; heuristics/models tuned to performability.
- **Rhythm Mode** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — listening mode for timing and pause analysis.
- **Score-Native Theatre System** — *defined* — first in `dt-01-001--predict-system-from-photos.md` — one of three formulation candidates ("speech-music dramaturgy engine"; "compositional environment for micro-plays").
- **Semantic Decay** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — transform-rule mode where repeated phrase decays semantically.
- **Silence Invariant** — *defined* — first in `dt-01-002--formalize-system-concept.md` — invariant four: silence/pauses/holds are encoded objects, not absences.
- **Speech-Music Dramaturgy Engine** — *defined* — first in `dt-01-001--predict-system-from-photos.md` — one of three early formulation candidates.
- **Speech-Performance Operating Environment** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — composable speech-performance OE; "not just a play, not just music, not just software."
- **Speech-Score Composition System** — *defined* — first in `dt-04-001--gap-analysis-and-merge.md` — canonical master name; merged synthesis of "aa" and "ab" takes.
- **Subdivision (timing)** — *mentioned* — first in `dt-02-001--predict-system-from-photos.md` — one of the cue-logic/click-logic/algorithmic-alignment timing primitives.
- **Subtextual Pressure** — *mentioned* — first in `dt-03-002--dramaturgical-product-frame.md` — diagnostic dimension distinguishing system from TTS.
- **Synchronized Line Highlighting** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — text-audio synchronization UI requirement.
- **Table Read Mode** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — listening mode for ordinary dramatic hearing.
- **Temporal Drama Machine** — *mentioned* — first in `dt-02-001--predict-system-from-photos.md` — naming candidate (`$TEMPORAL_DRAMA_MACHINE`).
- **Temporal Grid** — *mentioned* — first in `dt-02-001--predict-system-from-photos.md` — what dramatic text-block becomes under the user's reading regime.
- **Temporal Performance Modeling** — *defined* — first in `dt-03-005--product-design-systems-package.md` — governing principle stated at the head of the system-design package.
- **Temporal Relation** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — primary organizing principle (vs. plot); canonized in `dt-04-002`.
- **Temporal Vocal Event** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — what dialogue actually is: not a visual object but an enacted-time event.
- **Temporal Writing Intelligence** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — moat-positioning term; durable category for dramatic language.
- **Terminology Charter** — *defined* — first in `dt-04-002--canonical-project-definition.md` — foreshadowed; instantiated in `dt-04-003`.
- **Theatre as Rhythmic Machine** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — convergence layer 2: synchronization with musical rigor without becoming musical theatre.
- **Theatrical-Musical Composition System** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — initial high-level naming of the build target.
- **Theatrical Music OS** — *mentioned* — first in `dt-02-001--predict-system-from-photos.md` — Option C in three-candidate set; larger platform unifying writing, notation, cueing, rehearsal, audio, live, archive.
- **Translation Test** — *defined* — first in `dt-04-003--terminology-charter.md` — naming test: term must remain valid across page, audio, rehearsal, live execution.
- **Translatability Invariant** — *defined* — first in `dt-01-002--formalize-system-concept.md` — invariant five: a work must be renderable as readable score, audible mockup, and live-executable structure.
- **Two-Layer Distinction (surface/depth)** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — Product Layer One sells, Product Layer Two becomes the moat.
- **Typographic Dramaturgy** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — layout itself as instruction; layer 1 of the convergence.
- **Visual Score** — *defined* — first in `dt-01-001--predict-system-from-photos.md` — what the dramatic page becomes when spatialized.
- **Vocal Ritual Sequencer** — *mentioned* — first in `dt-02-001--predict-system-from-photos.md` — naming candidate (`$VOCAL_RITUAL_SEQUENCER`).
- **Voice Channel** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — performer-not-only-as-character; canonized in `dt-04-002` as canonical performer carrier.
- **Voice Distribution Matrix** — *mentioned* — first in `dt-02-001--predict-system-from-photos.md` — what the source-material's columns and repeated fragments become under the user's reading regime.

### Tools / Technologies / External Systems

- **Ableton** — *alluded* — first in `dt-02-001--predict-system-from-photos.md` — implied through "sequencer," "tracks," "clips" framing of $VOCAL_SEQUENCER_FOR_THEATRE.
- **BullMQ** — *alluded* — first in `dt-03-005--product-design-systems-package.md` — implied by "queue-backed worker system" recommendation (made explicit later in scaffold).
- **Biome** — *alluded* — first in `dt-03-006--repository-blueprint-handoff.md` — implied via "lint" CI step.
- **Docker Compose** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `infrastructure/docker/` layer for Postgres, Redis, local object storage.
- **FastAPI** — *mentioned* — first in `dt-03-005--product-design-systems-package.md` — listed as Python alternative for `$API_LAYER`.
- **GitHub Actions** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `.github/workflows/ci.yml` CI pipeline.
- **JSONB** — *defined* — first in `dt-03-005--product-design-systems-package.md` — Postgres JSON field used for `parsed_state`, `settings_snapshot`, `structural_tags`, `metrics`, `flags`.
- **Kindle** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — source of photographs containing the spatialized dramatic-text pages.
- **MinIO** — *mentioned* — first in `dt-03-006--repository-blueprint-handoff.md` — implied by `$OBJECT_STORAGE_ENDPOINT=http://localhost:9000` and `minio` credentials.
- **Next.js** — *alluded* — first in `dt-03-006--repository-blueprint-handoff.md` — implied by `apps/web/src/app/` App Router-style directory structure.
- **Node.js** — *mentioned* — first in `dt-03-005--product-design-systems-package.md` — listed as TS-stack option for the API layer.
- **PostgreSQL** — *defined* — first in `dt-03-005--product-design-systems-package.md` — designated correct default DB; relational + JSONB + transactional version creation.
- **React** — *defined* — first in `dt-03-005--product-design-systems-package.md` — recommended browser-first stateful component architecture.
- **Redis** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — local infra (`$REDIS_URL=redis://localhost:6379`); job queue backing.
- **REST API** — *defined* — first in `dt-03-005--product-design-systems-package.md` — chosen API style for MVP; async job semantics for renders.
- **Terraform** — *mentioned* — first in `dt-03-006--repository-blueprint-handoff.md` — `infrastructure/terraform/` directory for production IaC anchor.
- **Turbo / turbo.json** — *mentioned* — first in `dt-03-006--repository-blueprint-handoff.md` — workspace orchestrator at repo root.
- **TypeScript** — *defined* — first in `dt-03-005--product-design-systems-package.md` — typed contracts for API layer; scoped naming convention (`$CONVENTION_03`).
- **UUID** — *defined* — first in `dt-03-005--product-design-systems-package.md` — primary-key type across all tables.
- **WebSocket** — *mentioned* — first in `dt-03-005--product-design-systems-package.md` — flagged as post-MVP option for real-time render progress.
- **WhatsApp** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — source of exchange photos with Christopher; signals attention to timing/synchronization.
- **pnpm workspace** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `pnpm-workspace.yaml` at root; modular monorepo strategy.

### People / Roles / Personas

- **Actor** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — User Type #4; uses product to test cueing, pacing, overlap risk, breath logic, emphasis.
- **Adapter (writer)** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — buyer case: converts prose/essay/archive/theory into performable speech.
- **Christopher** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — interlocutor in WhatsApp exchange about source material; reference person, not a project role.
- **Composer** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — advanced-user category.
- **Conductor** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — implied performance role from "how is this conducted?"
- **David Ives** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — playwright of *Philip Glass Buys a Loaf of Bread*; named source-material author.
- **Devising Ensemble** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — listed among immediate users.
- **Director** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — User Type #3; uses product as pre-rehearsal interpretive environment.
- **Dramaturg** — *defined* — first in `dt-01-002--formalize-system-concept.md` — primary high-value user; canonized as User Type #2 in `dt-03-003`.
- **Experimental Performance Maker** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — User Type #6; uses deep engine for choral language, ritual text, distributed speech events.
- **Installation Artist** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — advanced-user category.
- **Narrator** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — speaker subtype for stage-direction voicing; "narrator-equivalent playback assignment."
- **Philip Glass** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — composer named in source-material work title and `VOICE C = GLASS` example.
- **Playwright** — *defined* — first in `dt-01-002--formalize-system-concept.md` — primary initial user; canonized as User Type #1 in `dt-03-003`.
- **Screenwriter / Narrative Writer** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — User Type #7; later-expansion user concerned with dialogue clarity and pace.
- **Sound Artist** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — advanced-user category.
- **Speaker (system actor)** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$OBJECT_SPEAKER` entity representing speaking entity in the scene (character, narrator, chorus unit).
- **Stage Manager** — *mentioned* — first in `dt-03-003--user-types-mvp-boundary.md` — Layer 5 feature mentions "stage-manager view."
- **Teacher / Workshop Leader** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — User Type #5; institutional buyer in pedagogical settings.

### Document Types / Artifacts

- **ADR (Architecture Decision Record)** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `docs/adr/` directory with numbered records (`0001-monorepo-decision.md` etc.).
- **Annotated Wireframe Description** — *defined* — first in `dt-03-005--product-design-systems-package.md` — screen-by-screen prose specs (sections `$SCREEN_01` … `$SCREEN_10`).
- **API Contracts Doc** — *mentioned* — first in `dt-03-006--repository-blueprint-handoff.md` — `docs/architecture/005-api-contracts.md`.
- **Architecture Doc Series** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — numbered `001-system-context.md` through `005-api-contracts.md`.
- **Audit Event** — *defined* — first in `dt-03-005--product-design-systems-package.md` — domain-event record persisted in `audit_event` table; emitted per scene/parse/version/render/diagnostic/share action.
- **Canvas (ChatGPT)** — *mentioned* — first in `dt-04-001--gap-analysis-and-merge.md` — referenced via project materials and filecite markers in merge response.
- **Click Guide** — *defined* — first in `dt-01-002--formalize-system-concept.md` — practical rehearsal artifact output by `$REHEARSAL_KERNEL`.
- **Compositional Manifesto** — *alluded* — first in `dt-01-001--predict-system-from-photos.md` — "hybrid dramaturgical manifesto/spec defining a new genre."
- **Cue Sheet** — *defined* — first in `dt-01-002--formalize-system-concept.md` — rehearsal artifact output by `$REHEARSAL_KERNEL`.
- **Diagnostic Report** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$OBJECT_DIAGNOSTIC_REPORT` capturing summary + `$FLAG_SET` for a scene version.
- **Diff Highlighting (text)** — *defined* — first in `dt-03-005--product-design-systems-package.md` — feature on `$SCREEN_09_COMPARE_VERSIONS`.
- **Doc Artifact ID** — *defined* — first in `dt-04-003--terminology-charter.md` — `<domain-subject>_<artifact-class>_<YYYYMMDD>` form; matches existing document style.
- **Lexicon and Style Guide** — *defined* — first in `dt-04-003--terminology-charter.md` — repo-document promised at end of terminology charter; instantiated in `dt-04-004`.
- **Migration Stub (SQL)** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — six numbered `.sql` files (`0001_init_users_projects_scenes.sql` … `0006_add_audit_events.sql`).
- **MVP Spec** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — formal MVP specification document with `$PRODUCT_ID`, `$MVP_INTENT`, `$MVP_SCOPE`, etc.
- **Performer Part View** — *defined* — first in `dt-01-002--formalize-system-concept.md` — one of four notation-renderer output views.
- **Playback Render** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$OBJECT_PLAYBACK_RENDER` representing a generated audio rendering of the scene or segment.
- **Product-Design and Systems Package** — *defined* — first in `dt-03-005--product-design-systems-package.md` — formal artifact extending MVP spec into normalized schema, wireframes, API, events, phased plan.
- **ProjectSave** — *alluded* — first in `dt-04-001--gap-analysis-and-merge.md` — ChatGPT project records referenced through filecite turns; not literally named in Era 1 but conceptually adjacent.
- **Render Profile** — *defined* — first in `dt-03-005--product-design-systems-package.md` — packages user-selectable playback behavior (neutral table read, heightened read, rhythm-forward).
- **Repository Blueprint and Handoff Package** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — implementation-ready repo blueprint with service boundaries, migrations, contracts, and handoff paragraph.
- **Scene Version (entity)** — *defined* — first in `dt-03-005--product-design-systems-package.md` — canonical immutable revision unit; `scene_version` table.
- **Share Link** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$OBJECT_SHARE_LINK` shareable read-only review artifact.
- **System Concept Doc** — *defined* — first in `dt-01-002--formalize-system-concept.md` — formal `$SPEECH_SCORE_ENGINE` concept with components, invariants, notation rules, candidate outputs.
- **Tempo Map** — *defined* — first in `dt-01-002--formalize-system-concept.md` — live-execution-layer artifact for performance.
- **Terminology Charter Doc** — *defined* — first in `dt-04-003--terminology-charter.md` — enforceable language policy with approved/forbidden terms, alias mappings, conventions, enforcement order.
- **Timing Map** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — collaborative-job artifact for shared review.
- **Version (entity)** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$OBJECT_VERSION` saved revision state with text snapshot, parsed snapshot, settings snapshot.
- **Version Line** — *defined* — first in `dt-03-005--product-design-systems-package.md` — normalized `version_line` row holding speaker, line_index, text_content, pause, emphasis, duration, structural tags.
- **Voice Profile** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$OBJECT_VOICE_PROFILE` with provider key, model key, label, timbre, gender presentation, speech rate, pitch offset, pause style.
- **Waveform Asset** — *defined* — first in `dt-03-005--product-design-systems-package.md` — derived asset stored alongside audio; `waveform_uri` field on render rows.

### Methodologies / Processes / Workflows

- **Alpha → Beta Phased Implementation Plan** — *defined* — first in `dt-03-005--product-design-systems-package.md` — six phases: $PHASE_ALPHA_0_FOUNDATION → $PHASE_BETA_OPENING.
- **Atomic Version Creation Transaction** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — atomic read → snapshot → normalize → estimate → emit event; lives at `packages/database/src/transactions/create-scene-version.transaction.ts`.
- **CI/CD Blueprint** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — install / typecheck / lint / unit / integration / migration-validation pipeline.
- **Compositional Job Workflow** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — JTBD #6: help me write language as score, not only as dialogue.
- **Diagnostic Job Workflow** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — JTBD #2: help me identify what is failing once heard.
- **Domain Event Naming Convention** — *defined* — first in `dt-03-005--product-design-systems-package.md` — `noun.action.state` pattern (e.g. `version.created`, `render.completed`).
- **Event Model for Playback/Render/Version** — *defined* — first in `dt-03-005--product-design-systems-package.md` — behavioral skeleton; full event catalog with playback, render, version, parse, diagnostic, share families.
- **Flow: Adjust Voices and Timing** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$FLOW_ADJUST_VOICES_AND_TIMING`; alter feel without rewriting scene.
- **Flow: Compare Versions** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$FLOW_COMPARE_VERSIONS`; structural revision legibility.
- **Flow: Create and Hear Scene** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$FLOW_CREATE_AND_HEAR_SCENE`; primary MVP flow.
- **Flow: Inspect Scene Structure** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$FLOW_INSPECT_SCENE_STRUCTURE`; active dramaturgical inspection.
- **Flow: Revise Text Against Audio** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$FLOW_REVISE_TEXT_AGAINST_AUDIO`; core value loop.
- **Flow: Share for Review** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$FLOW_SHARE_FOR_REVIEW`; supports collaborator review without editing access.
- **Functional Requirement Inventory** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — twelve `$FR_*` requirements: script input, parsing, speaker management, voice assignment, playback, timing, diagnostics, versioning, share, project org, persistence, performance.
- **Gap-Analysis Merge Method** — *defined* — first in `dt-04-001--gap-analysis-and-merge.md` — isolate overlap, isolate delta, collapse into tighter unified statement; explicit method note in segment 1.
- **Implementation Order (build sequence)** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — schema/contracts → web flows → version creation → render → diagnostics → share/compare.
- **Listening-and-Revision Loop** — *defined* — first in `dt-03-005--product-design-systems-package.md` — implementation-principle sequencing law: prove this loop before expanding to sophisticated theatrical composition.
- **Minimum Testing Matrix** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — parsing trust + version integrity + render lifecycle correctness; layout `test/integration/parsing/`, `versioning/`, `rendering/`, `e2e/scene-hearing-loop/`.
- **Modular Monorepo Strategy** — *defined* — first in `dt-03-006--repository-blueprint-handoff.md` — `$REPOSITORY_STRATEGY`; chosen because layers evolve together early.
- **Naming Tests (4-test gate)** — *defined* — first in `dt-04-003--terminology-charter.md` — Dual-aspect, Depth, Non-commodification, Translation tests for new terms.
- **PR Review Checklist** — *alluded* — first in `dt-04-004--lexicon-and-style-guide.md` — promised as section in the Lexicon and Style Guide repo document.
- **Phased Implementation Plan** — *defined* — first in `dt-03-005--product-design-systems-package.md` — see Alpha → Beta entry.
- **Premortem (Risk Inventory)** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — $MVP_RISKS section: dressed-up TTS, render latency, parser brittleness, overclaim, premature avant-garde.
- **Scene Parsing Workflow** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$FR_SCRIPT_PARSING`; heuristic, transparent, correctable.
- **Strict-Terminology Enforcement Rule** — *defined* — first in `dt-04-003--terminology-charter.md` — priority order: $GOVERNING_SENTENCE → $CANONICAL_IDENTITY → $APPROVED_TERMS → $ALIAS_MAPPINGS → product-surface simplifications.
- **Success-Metrics Framework** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — time-to-first-playback, replay frequency, revisions/session, diagnostic engagement, share-link creation, return usage.
- **Voice Preview Workflow** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `$FR_VOICE_ASSIGNMENT`: preview individual voice before applying scene-wide.

### Anything else (open category)

- **Account Plan** — *defined* — first in `dt-03-005--product-design-systems-package.md` — `account_plan` column on `app_user`; supports pricing controls, render quotas, collaboration gating.
- **Acceptance Threshold (per-phase)** — *defined* — first in `dt-03-005--product-design-systems-package.md` — each $PHASE_* defines a concrete acceptance condition.
- **Accumulate (transform rule)** — *defined* — first in `dt-01-002--formalize-system-concept.md` — `ACCUMULATE(<new_material>)` repeat-rule mode.
- **Alpha 0 Foundation** — *defined* — first in `dt-03-005--product-design-systems-package.md` — $PHASE_ALPHA_0_FOUNDATION; app shell, persistence, auth, scene model, parse pipeline.
- **Alpha 1 First Hearing Loop** — *defined* — first in `dt-03-005--product-design-systems-package.md` — $PHASE_ALPHA_1_FIRST_HEARING_LOOP; voice assign, version, render, playback.
- **Alpha 2 Revision Trust** — *defined* — first in `dt-03-005--product-design-systems-package.md` — $PHASE_ALPHA_2_REVISION_TRUST; version history, restore, compare.
- **Alpha 3 Diagnostic Layer** — *defined* — first in `dt-03-005--product-design-systems-package.md` — $PHASE_ALPHA_3_DIAGNOSTIC_LAYER; lightweight dramaturgical inspection.
- **Approved Pattern Families** — *defined* — first in `dt-04-002--canonical-project-definition.md` — speech-score, polyvocal, post-script, dramaturgical-audio, performance-writing, temporal writing intelligence.
- **Branch (process)** — *mentioned* — first in `dt-03-001--predict-system-from-photos.md` — conversation title prefix "Branch · …"; ChatGPT branching mechanism.
- **Canonical Expression Set** — *defined* — first in `dt-04-002--canonical-project-definition.md` — stable vocabulary core listing master name, identifier, descriptors, units.
- **Canonical Identity Table** — *defined* — first in `dt-04-003--terminology-charter.md` — layered table mapping master system name, internal identifier, product-surface descriptor, etc.
- **Canonical Pattern Families** — *defined* — first in `dt-04-002--canonical-project-definition.md` — see Approved Pattern Families.
- **Convention #1–#8 (repo-wide)** — *defined* — first in `dt-04-003--terminology-charter.md` — eight naming conventions: system/ontology names, DB identifiers, TS types, file/dir, API paths, event names, env vars, doc artifact IDs.
- **Counterpoint (compositional)** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — one of four passage behaviors.
- **Density Field** — *mentioned* — first in `dt-02-001--predict-system-from-photos.md` — what text can become per the text-as-notation layer.
- **Depth Test** — *defined* — first in `dt-04-003--terminology-charter.md` — naming test: term must scale to deeper system, not just MVP.
- **Dispersive Text Matrix** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — one of four passage behaviors.
- **Disprefered Pattern Families** — *defined* — first in `dt-04-002--canonical-project-definition.md` — AI voice, script reader, podcast engine, theatre chatbot, audio toy.
- **Drift (ontological)** — *defined* — first in `dt-04-002--canonical-project-definition.md` — language drift to be prevented by canonical naming.
- **Duration Rule Modes** — *defined* — first in `dt-01-002--formalize-system-concept.md` — `FREE_SPEECH`, `COUNTED(beats)`, `STRETCH(range)`, `RAPID_FIRE`, `SUSTAINED`, `CUT_SHORT_ON_NEXT_ENTRY`.
- **Entry Rule Modes** — *defined* — first in `dt-01-002--formalize-system-concept.md` — `ON_CUE`, `AT_BEAT`, `AFTER`, `WITH`, `WHEN_COMPLETE`, `ON_CONDUCTOR_MARK`.
- **Final Charter Statement** — *defined* — first in `dt-04-003--terminology-charter.md` — closing canonical statement of the charter.
- **Flag Set** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — diagnostic-report field holding findings tied to line ranges.
- **Forbidden Terms** — *defined* — first in `dt-04-003--terminology-charter.md` — table of rejected terms (TTS tool, voice generator, script reader, podcast engine, etc.) with replacements.
- **Governing Sentence** — *defined* — first in `dt-04-003--terminology-charter.md` — "The system treats language as a dual-aspect object: semantic content and timed performance."
- **Mythic Compression** — *mentioned* — first in `dt-04-001--gap-analysis-and-merge.md` — "text becomes music without ceasing to be language; theatre becomes programmable without ceasing to be live."
- **N/A is a Vacuum** — *alluded* — first in `dt-04-001--gap-analysis-and-merge.md` — implicit in the gap-analysis impulse (every absence becomes a named item).
- **Notation Rule Categories** — *defined* — first in `dt-01-002--formalize-system-concept.md` — `$UNIT_RULES`, `$VOICE_RULES`, `$ENTRY_RULES`, `$DURATION_RULES`, `$REPEAT_RULES`, `$OVERLAP_RULES`, `$TRANSFORM_RULES`, `$SPATIAL_RULES`.
- **Object-Permanence Principle** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — non-functional requirement that scenes/versions/voices/diagnostics not feel ephemeral.
- **One-Sentence Moat Thesis** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — "domain-specific temporal model of dramatic language that turns scripts into analyzable, revisable performance objects."
- **Out-of-Scope (MVP)** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — explicit deferral list: overlap, score editing, conductor tooling, deep collab, classroom admin, emotion engine, marketplace.
- **Overlap Rule Modes** — *defined* — first in `dt-01-002--formalize-system-concept.md` — `NO_OVERLAP`, `CAN_OVERLAP`, `MUST_OVERLAP_WITH(voice)`, `PHASE_SHIFT(offset)`, `INTERRUPT(phrase_id)`.
- **Parse Trust** — *defined* — first in `dt-03-005--product-design-systems-package.md` — foundational, made visible through parse-events; if users repeatedly correct parser, operational fact becomes visible.
- **Performance-Writing Software** — *defined* — first in `dt-03-002--dramaturgical-product-frame.md` — alternative commercial-category name (alongside "dramaturgical software").
- **Phase Marker** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — one of the audio-form primitives (alongside click track, pulse, stems, voice-layer timing maps).
- **Phase Shift** — *defined* — first in `dt-01-002--formalize-system-concept.md` — `PHASE_SHIFT(<offset>)` overlap-rule mode.
- **Philip Glass Buys a Loaf of Bread** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — David Ives play; source material whose form exposes the "powerful seam."
- **Phrase ID** — *defined* — first in `dt-01-002--formalize-system-concept.md` — `$PHRASE_ID` field on phrase-event model.
- **Polyphonic Playwriting System** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — Option A in three-candidate set; smallest version.
- **Private Beta 1 Workflow Integration** — *defined* — first in `dt-03-005--product-design-systems-package.md` — recruits small cohort of real users.
- **Private Beta 2 Quality and Retainability** — *defined* — first in `dt-03-005--product-design-systems-package.md` — refines product from "interesting and usable" to "retainable and recommendable."
- **Public Beta Opening** — *defined* — first in `dt-03-005--product-design-systems-package.md` — $PHASE_BETA_OPENING; broader availability with pricing.
- **Pulse** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — one of the audio-form primitives.
- **Recommended Initial Wedge** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — playwrights/dramaturgs developing new work needing instant readback + diagnostics.
- **Repeat Rule Modes** — *defined* — first in `dt-01-002--formalize-system-concept.md` — `REPEAT(count)`, `LOOP_UNTIL(event)`, `OSTINATO(count, spacing)`, `ACCUMULATE`, `DIMINISH`.
- **Score Object** — *mentioned* — first in `dt-01-002--formalize-system-concept.md` — generic compositional object the system stores/exports.
- **Semantic Boundary Rules** — *defined* — first in `dt-04-003--terminology-charter.md` — system named from inside out; ontology vs. product wedge vs. infrastructure language layers.
- **Spatial Rule Modes** — *defined* — first in `dt-01-002--formalize-system-concept.md` — `COLUMN(n)`, `X_POS`, `Y_FLOW`, `STACK_WITH`, `DISPERSE`, `CONVERGE`.
- **Stage Direction** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — `is_stage_direction` flag on line; default-hidden from playback, optionally voiced via narrator.
- **Stem (audio)** — *defined* — first in `dt-01-002--formalize-system-concept.md` — isolated voice channel as render output; listed in $STEMMED_AUDIO_RENDER.
- **Strategic Positioning** — *defined* — first in `dt-03-003--user-types-mvp-boundary.md` — "listening-first software for dramatic writing"; "platform for modeling language as performance."
- **Structural Intensification** — *defined* — first in `dt-02-001--predict-system-from-photos.md` — repetition reframed as structural intensification, not redundancy.
- **Structural Tags** — *defined* — first in `dt-03-005--product-design-systems-package.md` — `structural_tags` JSONB column flagging refrain / monologue_run / exposition_candidate / interruptive_energy_high.
- **Tempo** — *mentioned* — first in `dt-02-001--predict-system-from-photos.md` — primitive in the timing substrate.
- **Three-Pane Workspace** — *defined* — first in `dt-03-005--product-design-systems-package.md` — `$SCREEN_05_SCENE_WORKSPACE` layout: script editor / playback+sync / contextual tools.
- **Transform Rule Modes** — *defined* — first in `dt-01-002--formalize-system-concept.md` — `TEXT_CONST`, `DROP_WORD_EACH_REPEAT`, `ADD_WORD_EACH_REPEAT`, `CHANGE_STRESS`, `SPLIT_ACROSS_VOICES`, `SCATTER_BY_WORD`, `SEMANTIC_DECAY`.
- **Two-Faces Synthesis** — *defined* — first in `dt-04-001--gap-analysis-and-merge.md` — artistic/ontological face + productive/practical face; merged-form claim.
- **Voice-Layer Timing Map** — *mentioned* — first in `dt-01-001--predict-system-from-photos.md` — audio-form primitive.
- **Voice Rules (declaration)** — *defined* — first in `dt-01-002--formalize-system-concept.md` — voices declared separately from character names; example `VOICE A = FIRST_WOMAN`.
- **Voice Toy** — *alluded* — first in `dt-03-005--product-design-systems-package.md` — anti-pattern; product must not appear as "generic synthetic voice toy."
- **Working Title** — *defined* — first in `dt-03-004--formal-mvp-spec.md` — "Audio-Dramaturgical Studio" given as `$PRODUCT_ID` working title.
- **Workshop Mode** — *mentioned* — first in `dt-03-003--user-types-mvp-boundary.md` — Teacher persona uses product in workshop or classroom settings.

---

## Section 3: Era 2 — Tracker / Audio / Voice Synthesis Feasibility (dt-05 → dt-07-007)

Files covered:
- `dt-05-001--tracker-ableton-features.md` / `dt-05-002--pattern-session-arrangement-screens.md`
- `dt-06-001--prototype-and-poc-path.md` through `dt-06-003--tracker-time-sequences-essential.md`
- `dt-07-001--prototype-and-poc-path.md` through `dt-07-007--theatre-voice-capture-sheet.md`

Era contour: the architectural fusion arc. dt-05-001/002 establishes the three canonical views (`$PATTERN_VIEW` / `$SESSION_VIEW` / `$ARRANGEMENT_VIEW`), the "tracker-brained and Ableton-bodied" slogan, the global application shell, and the full speech-commands table (PA / PR / RP / RT / OV / CU / EM / DN / PN / BR / ST / GL / MX / LK / HU / MT / TR). dt-06 locks the four-screen POC and the load-bearing `scene` vs. `scene_version` split; dt-06-003 hardens "tracker time" as a non-negotiable timing-model requirement (not interface-layer). dt-07-002 introduces the Max/SuperCollider/Web tri-layer architecture (`$TIMING_ENGINE`, `$LIVE_ENGINE`, `$APP_WEB`, `$RENDER_WORKER`, `$BRIDGE_PROTOCOL`). dt-07-004 establishes the voice-render-adapter pattern with three provider modes (sample_cache, live_tts, hybrid). dt-07-007 is the densest single file in the open category — almost the entire controlled-vocabulary section (style classes, tiers, take statuses, usage scopes, noise/delivery/selection statuses) originates there. Provider names (ElevenLabs, Cartesia, Resemble) appear only as feasibility data points, not as system dependencies.


### Components / Services / Modules
- **Analysis Engine** — *alluded* — first in `dt-05-002--pattern-session-arrangement-screens.md` — cross-cutting diagnostics layer tied to actual compositional work across all three views (referenced as `$ANALYSIS_ENGINE`)
- **Async render worker** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — non-blocking job processor for audio rendering, so render jobs do not block the request cycle
- **Bottom console** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — shell region for render jobs, diagnostics, event log, warnings, and version notes
- **Bottom detail editor** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Arrangement-view region for selected region/anchor/envelope or timing edit
- **Bottom phrase editor** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Pattern-view region for expanded text editing of selected event without leaving timing context
- **Bridge protocol** — *mentioned* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — OSC or WebSocket bridge between layers (referenced as `$BRIDGE_PROTOCOL`)
- **Center workspace** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — shell region holding the active view canvas
- **Command lanes** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Pattern-view per-row command cells adjacent to phrase-event cells
- **Compositional infrastructure** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — what the system becomes once per-cell speech commands are first-class
- **Diagnostic report** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — minimum POC object capturing analysis output
- **Diagnostics summary** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — compact analytical readout included on the read-only share page
- **Envelope lanes** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Arrangement-view lanes for density, emphasis, spatialization, pace drift
- **Launch cells** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Session-view playable passage references (user-surface object)
- **Left structure rail** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — shell region holding work tree: project → work → movement → passage
- **Live engine** — *defined* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — Max/MSP layer for cueing, routing, triggering, rehearsal, and performance control (`$LIVE_ENGINE`)
- **Live execution layer** — *mentioned* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — deferred deeper-engine layer for live performance (`$LIVE_EXECUTION_LAYER`)
- **Locator strip** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Arrangement-view named anchors for rehearsal and export
- **Master launch controls** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Session-view region for quantization, trigger mode, stop-all, return-to-anchor
- **Mini overview rail** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Pattern-view compressed density map of the passage for fast navigation
- **Mixer** — *mentioned* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — Max patch component handling per-channel routing and pan
- **Monitoring strip** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Session-view region showing currently active passages, elapsed time, queued launches
- **Movement lanes** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Arrangement-view high-level structural blocks defining major formal zones
- **Object storage** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — storage layer for generated audio in the recommended POC stack
- **Parse Review screen** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — POC Screen 2 showing raw text vs parsed speakers/line groupings with rename/merge controls; designated a "trust screen"
- **Pattern editor** — *mentioned* — first in `dt-05-001--tracker-ableton-features.md` — Renoise's UI built around entering events top-to-bottom and sequencing patterns
- **Pattern header** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Pattern-view region with passage name, row resolution, loop length, swing/subdivision controls
- **Pattern View** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — micro-compositional core tracker layer; `$PATTERN_VIEW` (rows=time, columns=voice-channels, cells=phrase-events+commands)
- **Phrase-event grid** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Pattern-view row-addressed event matrix; central authoring surface
- **PostgreSQL** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — relational store recommended for the POC stack
- **Render worker** — *mentioned* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — `$RENDER_WORKER` async pipeline for table-read exports
- **REST API** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — simple back-end API layer for the POC
- **Right inspector** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — shell region for context-sensitive properties of selected object
- **Scene Workspace screen** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — POC Screen 3 with script editor (left), playback (center), diagnostics/speaker controls (right) plus pace and replay-region controls
- **Selection inspector** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Pattern-view right-side editor for phrase text, entry rule, duration rule, repeat rule, overlap rule, emphasis, spatial rule
- **Session scene strip** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Session-view vertical stack of launchable rows
- **Session View** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — launch grid for phrases/passages/scenes (`$SESSION_VIEW`)
- **Share View screen** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — POC Screen 4 read-only artifact with scene title, audio player, text, speaker labels, optional diagnostics summary
- **Speech renderer** — *mentioned* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — per-channel TTS/audio output component in the Max patch architecture
- **Timeline ruler** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Arrangement-view ruler with clock time, beat time, locator markers; switchable display modes
- **Timing engine** — *defined* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — `$TIMING_ENGINE` SuperCollider layer for row-precise scheduling and recurrence
- **Top command bar** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — shell region with project title, save state, render state, transport, tempo, meter, current version
- **Variant panel** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Session-view region for alternate render behaviors per launch state (neutral, heightened, rhythm-forward, diagnostic)
- **Voice-channel column strip** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Pattern-view reorderable, color-coded one-column-per-voice strip
- **Voice-channel lanes** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Session-view horizontal lanes holding launchable passage states
- **Voice-channel tracks** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Arrangement-view stacked horizontal timeline tracks holding scheduled passage/phrase-event material
- **Voice render adapter** — *defined* — first in `dt-07-004--voice-synthesis-injectability.md` — injectable layer between phrase-event and audio output (`$VOICE_RENDER_ADAPTER`)

### Concepts / Frameworks / Theories
- **Ableton-bodied** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — half of the product framing: Ableton governs macro-form and performance navigation
- **Audio-dramaturgical studio** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — the clearer product surface layer (vs. "full theatrical operating system")
- **Authoring-analysis-rendering environment** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — what the system actually is, beyond mere editor
- **Behavioral thesis** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — the listening-and-revision loop as the documented core behavior the product must prove
- **Browser-first product surface** — *defined* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — the adoptable wedge layer of the system; what Max/SuperCollider should NOT be
- **Cluster families** — *defined* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — three-level decomposition (full-line, phrase clusters, atomized fragments) for tracker content
- **Commercial promise** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — "hear, inspect, and revise dialogue as performed time before rehearsal"
- **Composition-and-execution proof** — *defined* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — what the Max demo proves, distinct from the listening-first workbench
- **Compositional precision** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — score-editor side of the dual product requirement
- **Cross-view workflow** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — workflow stages spanning Pattern→Session→Arrangement views as one intelligible motion
- **DAW analogy** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — descriptive (not ontological) framing used for explanation; must not displace canonical ontology
- **Diagnostics placement** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — design rule: diagnostics must be cross-cutting across all three views, not one screen
- **Dramatic-audio dialectic** — *alluded* — first in `dt-05-001--tracker-ableton-features.md` — implicit dual structure of speech as both semantic content and timed performance
- **Dramaturgical-audio workbench** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — the product surface descriptor (vs. internal "polyvocal speech-composition engine")
- **Dual-aspect object** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — governing rule: language carries both semantic content and timed performance
- **Event grammar** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — what Pattern View governs (per final design rule §10)
- **Exploratory relation** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — what Session View governs (per final design rule §10)
- **First-class score operations** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — speech commands as score primitives, not loose annotations
- **Formal order** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — what Arrangement View governs (per final design rule §10)
- **Formal timing engine** — *defined* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — deterministic scheduling, recurrence, phase offsets, generative transformation (SuperCollider's strong domain)
- **Hybrid of tracker precision and Ableton-style launch/arrangement control** — *defined* — first in `dt-07-001--prototype-and-poc-path.md` — the architectural fusion thesis
- **Injectable infrastructure** — *defined* — first in `dt-07-004--voice-synthesis-injectability.md` — voice synthesis treated as pluggable backend, not baked into score model
- **Internal contract** — *defined* — first in `dt-07-004--voice-synthesis-injectability.md` — the JSON shape each tracker cell resolves to (phrase_id, voice_channel, text, voice_profile_id, etc.)
- **Listening-and-revision loop** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — core behavioral thesis: hear dialogue quickly, inspect, revise, save, share
- **Listening-first revision environment for performative text** — *defined* — first in `dt-07-001--prototype-and-poc-path.md` — the adoptable-wedge framing of the product
- **Live plasticity** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — rehearsal/performance side of dual product requirement
- **Minimum object set** — *mentioned* — first in `dt-06-002--poc-build-spec-four-screens.md` — formal subset of data objects required for POC
- **Polyvocal speech-composition engine** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — internal system identity (vs. product-surface descriptor "dramaturgical-audio workbench")
- **Product surface vs. deeper engine** — *defined* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — architectural split between browser-first shareable face and SuperCollider/Max engine layers
- **Row-precise event grid** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — tracker paradigm contributed to the product
- **Score-encoding of speech** — *defined* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — translation of literary line into `$PHRASE_EVENT` with temporal-relation context
- **Score-player patch** — *defined* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — Max-patch type for the demo: single-purpose tracker surface, not "the app"
- **Score-like distribution** — *alluded* — first in `dt-06-001--prototype-and-poc-path.md` — what the bakery scene exemplifies (transition from ordinary dialogue to patterned distribution)
- **Scene-versus-version split** — *defined* — first in `dt-07-001--prototype-and-poc-path.md` — mutable `scene` vs. immutable `scene_version` as load-bearing architecture
- **Seed demonstration work** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — single canonical demo scene that proves the product (the Philip Glass bakery material)
- **Showable instrument problem** — *defined* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — class of problem (vs. product-surface problem) suited to Max-first demonstration
- **Speech-score composition system** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — full system name; the umbrella ontology under which the three views operate
- **Speech-score grid** — *mentioned* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — visible grid of voices and trigger matrix
- **Speech-score ontology** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — the canonical naming/typing system: phrase-events, voice-channels, temporal-relation, timing-substrate
- **Speech-score workstation** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — product framing (vs. generic "DAW for theatre")
- **Structural promise** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — "compose speech as score across writing, notation, rehearsal, rendering, and execution"
- **Structured temporal dialogue objects** — *defined* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — scene storage rule (not plain documents)
- **Tracker-brained and Ableton-bodied** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — slogan for the hybrid product paradigm
- **Tracker-compatible temporal data model** — *defined* — first in `dt-06-003--tracker-time-sequences-essential.md` — required architecture: ordered timed events from day one (not "script text plus playback")
- **Tracker-score dataset** — *defined* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — hardcoded data structure containing the play as tracker events for the Max demo
- **Tracker time** — *defined* — first in `dt-06-003--tracker-time-sequences-essential.md` — essential timing model: bounded events, deterministic order, phrase-loop replay
- **Trust screen** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — Parse Review screen role: building user confidence in speaker parsing
- **Two-layer distinction** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — commercial promise vs. structural promise; must remain explicit in the spec
- **Vertical sequencer** — *defined* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — clean, slow, legible grid: voice-channels across top, rows down left, tempo/controls at bottom

### Tools / Technologies / External Systems
- **Ableton (Ableton Live)** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — DAW providing Session View / Arrangement View / Warp / Racks / Macros paradigms inherited by the system
- **Ableton Arrangement View** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — linear timeline with locators, automation lanes, section launching
- **Ableton Clip/Warp model** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — Live's clip warping that keeps audio aligned to tempo via markers
- **Ableton Racks / Macros** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — Live's grouped-parameter encapsulation system
- **Ableton Session View** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — Live's random-access clip-launch grid
- **Airtable** — *mentioned* — first in `dt-07-007--theatre-voice-capture-sheet.md` — destination for CSV import of voice-capture sheets
- **Apple Speech (OS speech)** — *mentioned* — first in `dt-07-004--voice-synthesis-injectability.md` — example backend the voice adapter should be pluggable against
- **Cartesia** — *defined* — first in `dt-07-005--voice-clone-audio-requirements.md` — voice-cloning provider; 5-second high-similarity, 30+ minute pro
- **Cloud speech** — *mentioned* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — real-time remote synthesis (recommended against for first demo)
- **`coll`** — *defined* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — Max object for storing score rows
- **`counter`** — *mentioned* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — Max object tracking current row
- **`dict`** — *defined* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — Max object alternative to `coll` for storing score data
- **ElevenLabs** — *defined* — first in `dt-07-004--voice-synthesis-injectability.md` — voice-cloning provider; instant requires consent; pro limited to verified own voice
- **Figma** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — static mockup tool explicitly rejected as the prototype form
- **Google Sheets** — *mentioned* — first in `dt-07-007--theatre-voice-capture-sheet.md` — destination for TSV import of voice-capture sheets
- **HTTP** — *mentioned* — first in `dt-07-004--voice-synthesis-injectability.md` — transport for synthesis adapter calls from Max
- **`js` (Max object)** — *mentioned* — first in `dt-07-004--voice-synthesis-injectability.md` — Max scripting object usable as a synthesis-adapter bridge
- **Jitter display** — *mentioned* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — custom grid UI option in Max
- **Local synthesis** — *mentioned* — first in `dt-07-004--voice-synthesis-injectability.md` — on-device speech generation as an injectable backend
- **`matrixctrl`** — *mentioned* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — Max object option for grid UI
- **Max/MSP** — *defined* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — visual patching environment; "live-performance body" of the architecture
- **`metro`** — *mentioned* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — Max object driving row advance
- **Node for Max** — *mentioned* — first in `dt-07-004--voice-synthesis-injectability.md` — Node.js runtime inside Max usable as synthesis bridge
- **Notion** — *mentioned* — first in `dt-07-007--theatre-voice-capture-sheet.md` — destination for database import of voice-capture sheets
- **OSC** — *mentioned* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — Open Sound Control as bridge between Max/SuperCollider/Web layers
- **Prerecorded WAVs** — *mentioned* — first in `dt-07-004--voice-synthesis-injectability.md` — sampled audio as an injectable backend mode
- **React** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — example stateful-front-end choice for the POC workspace
- **Renoise** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — concrete tracker reference; pattern editor and phrase-trigger logic cited
- **Renoise phrase** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — Renoise feature: notes trigger reusable embedded structures
- **Resemble** — *defined* — first in `dt-07-005--voice-clone-audio-requirements.md` — voice-cloning provider; 10-second rapid clone; 10-25+ minute professional
- **`route`** — *mentioned* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — Max object routing by voice-channel
- **SuperCollider** — *defined* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — audio language; "tracker-brain" of the architecture
- **Tracker (the genre)** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — interaction-model class providing event-grid paradigm; contributes pattern editor and per-step effect commands
- **`transport` (Max master clock)** — *mentioned* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — Max master timing clock object
- **TTS (text-to-speech)** — *mentioned* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — generic class of synthesis providers behind `$TTS_PROVIDER_URI`
- **WebSocket** — *mentioned* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — alternative bridge protocol between Max/SuperCollider/web
- **`$APP_API`** — *defined* — first in `dt-07-001--prototype-and-poc-path.md` — typed API service in the minimum infrastructure
- **`$APP_DB`** — *defined* — first in `dt-07-001--prototype-and-poc-path.md` — relational storage component
- **`$APP_WEB`** — *defined* — first in `dt-07-001--prototype-and-poc-path.md` — browser editor / versions / diagnostics / share-links surface
- **`$APP_WORKER`** — *defined* — first in `dt-07-001--prototype-and-poc-path.md` — queue-backed render worker

### People / Roles / Personas
- **Actor** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — performer named in `$ACTOR_ID`, `$ACTOR_NAME`, subject of consent and capture flow
- **BAKER** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — named voice-channel for the bakery demo scene
- **Capture engineer** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — role recording the actor; tracked via `$CAPTURE_ENGINEER`, `$ENGINEERING_OWNER`
- **Collaborator** — *defined* — first in `dt-07-001--prototype-and-poc-path.md` — non-editing recipient of a read-only share artifact
- **Conductor** — *alluded* — first in `dt-05-001--tracker-ableton-features.md` — "live conductor view" deferred to later phases; conductor logic central to live performance
- **Director** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — listed audience of the convincing shareable POC
- **Dramaturg** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — listed audience for the convincing shareable POC
- **FIRST_WOMAN** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — named voice-channel for the bakery demo scene
- **GLASS** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — named voice-channel (Philip Glass) for the bakery demo
- **Narrator (neutral)** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — optional voice for stage directions
- **Performer (the speaker)** — *defined* — first in `dt-07-006--theatre-company-voice-on-travel.md` — company member whose voice is captured for cloning
- **Philip Glass** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — referenced composer whose bakery material seeds the demo
- **Playwright** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — listed audience of the POC and acceptance-test subject
- **SECOND_WOMAN** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — named voice-channel for the bakery demo scene
- **Speaker (UI-surface alias)** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — usability-facing alias for `$VOICE_CHANNEL`
- **Stakeholder** — *mentioned* — first in `dt-06-002--poc-build-spec-four-screens.md` — recipient role for the POC walkthrough sequence; "named project stakeholders" in client-demo scope
- **Teacher** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — listed audience for the convincing shareable POC
- **Text owner** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — entity holding rights to script content (tracked in `$TEXT_OWNER`)
- **Theatre company** — *defined* — first in `dt-07-006--theatre-company-voice-on-travel.md` — organizational unit owning the voice library; identified via `$COMPANY_ID`

### Document Types / Artifacts
- **Bakery sample (demo content)** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — pre-modeled canonical demo scene used to seed the POC
- **Build handoff** — *defined* — first in `dt-06-002--poc-build-spec-four-screens.md` — POC build spec functioning as an executable handoff rather than concept note
- **Canvas (ChatGPT artifact)** — *mentioned* — first in `dt-06-002--poc-build-spec-four-screens.md` — drafting surface inside ChatGPT ("I drafted it in canvas")
- **Clickable wireframe package** — *mentioned* — first in `dt-06-002--poc-build-spec-four-screens.md` — possible next deliverable
- **Clip filename** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — `$ACTOR_ID__$SCRIPT_ID__$TAKE_ID__$CAPTURE_DATE.$AUDIO_FORMAT` (`$CLIP_FILENAME`)
- **Company voice library** — *defined* — first in `dt-07-006--theatre-company-voice-on-travel.md` — internal archive of approved performer clones with consent metadata
- **Consent policy** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — versioned policy under `$CONSENT_POLICY_VERSION`
- **CSV headers (master capture sheet)** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — explicit CSV schema for import into Sheets/Airtable/Notion
- **Demo states** — *defined* — first in `dt-06-002--poc-build-spec-four-screens.md` — versioned ones pre-modeled into POC demo content
- **Diagnostics summary (share artifact)** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — compact readout included on the read-only share view
- **Google Sheets-ready TSV** — *mentioned* — first in `dt-07-007--theatre-voice-capture-sheet.md` — output format option for the capture sheet
- **House dataset** — *defined* — first in `dt-07-006--theatre-company-voice-on-travel.md` — 10-30+ minute per-actor durable archive
- **Master clip filename** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — `$VOICE_PROFILE_ID__master.$AUDIO_FORMAT` (`$MASTER_CLIP_FILENAME`)
- **Notion database schema** — *mentioned* — first in `dt-07-007--theatre-voice-capture-sheet.md` — alternate output format option for the capture sheet
- **Playback render** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — minimum POC object: audio rendered from a scene_version
- **Read-only review page** — *defined* — first in `dt-07-001--prototype-and-poc-path.md` — public-facing share artifact: playback, text, speaker labels, diagnostics
- **Read-only share link** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — single private URL produced from a scene version
- **Rehearsal pack** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — performer-facing exported output (`$REHEARSAL_PACK`)
- **Renderable output** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — Arrangement-view export from stable work
- **Row event (Max JSON schema)** — *defined* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — JSON shape per tracker row: row, voice, text, mode, pause_after_ms, repeat, pan, rate
- **Scene (mutable)** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — minimum POC object: working draft state
- **Scene_version (immutable)** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — minimum POC object: frozen renderable shareable analyzable artifact
- **Script registry** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — stable reusable pool of script-IDs with class/duration/text-owner metadata
- **Share link** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — minimum POC object: stable revocable URL
- **Speaker (POC object)** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — minimum POC object distinct from `$VOICE_CHANNEL` at user surface
- **Stakeholder walkthrough sequence** — *defined* — first in `dt-06-002--poc-build-spec-four-screens.md` — guided demo flow included in POC build spec
- **Table-read audio** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — rapid auditory draft (`$TABLE_READ_AUDIO`)
- **Theatre-company voice capture sheet** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — full operating sheet with 12 sections including control vars, master capture, take log, script registry
- **Travel pack (voice clones)** — *defined* — first in `dt-07-006--theatre-company-voice-on-travel.md` — approved-cloned voice bundle for rehearsal/travel use
- **Versioned demo states** — *defined* — first in `dt-06-002--poc-build-spec-four-screens.md` — frozen demo content tied to immutable scene_version objects
- **Voice cache directory** — *defined* — first in `dt-07-004--voice-synthesis-injectability.md` — `$VOICE_CACHE_DIR` filesystem path holding pre-rendered phrase files
- **Voice pack** — *defined* — first in `dt-07-006--theatre-company-voice-on-travel.md` — exported bundle of approved voice clones for use with the tracker patch

### Methodologies / Processes / Workflows
- **Acceptance criteria** — *mentioned* — first in `dt-06-002--poc-build-spec-four-screens.md` — formal check-list included in the POC build spec
- **Acceptance test** — *defined* — first in `dt-07-001--prototype-and-poc-path.md` — playwright/dramaturg can create-hear-revise-save-share without other performers
- **Adoption wedge** — *defined* — first in `dt-07-001--prototype-and-poc-path.md` — narrow commercially-legible product layer to enter market with
- **Authoring loop** — *defined* — first in `dt-07-001--prototype-and-poc-path.md` — second-pass build: paste, parse, assign, play, revise, version, compare, share
- **Build order (3-pass)** — *defined* — first in `dt-07-001--prototype-and-poc-path.md` — thin coded alpha → core authoring loop → tracker-native features
- **Cached renderer mode** — *defined* — first in `dt-07-004--voice-synthesis-injectability.md` — voice-adapter strategy resolving cells to pre-rendered files
- **Capture protocol** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — `$RECORDING_PROTOCOL`: before-capture, during-capture, after-capture rules
- **Capture target (two-tier)** — *defined* — first in `dt-07-006--theatre-company-voice-on-travel.md` — travel-tier (1-3 min per performer) and house-tier (10-30 min)
- **Demonstration thesis** — *alluded* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — the formal idea you communicate to the friend via three-mode demo
- **File naming standard** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — strict filename format tying clip to actor/script/take/date
- **Hybrid voice-provider mode** — *defined* — first in `dt-07-004--voice-synthesis-injectability.md` — fall back to live TTS when phrase not cached, then cache the result
- **Listening-revision workflow** — *defined* — first in `dt-07-002--max-msp-supercollider-feasibility.md` — browser-first workflow: paste/assign/hear/revise/save/share
- **Live-TTS voice-provider mode** — *defined* — first in `dt-07-004--voice-synthesis-injectability.md` — patch sends text to synthesis adapter and receives audio back
- **Master capture sheet** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — main operating spreadsheet of captures with consent/usage/profile metadata
- **Milestone sequence (A-D)** — *defined* — first in `dt-06-001--prototype-and-poc-path.md` — Milestone A (hard-coded sample playback) → B (parse/speakers/pace) → C (versions/diagnostic/timeline) → D (read-only share)
- **MVP boundary** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — explicit scope-cut per view: what is in vs. deferred
- **MVP statement (revised)** — *defined* — first in `dt-05-002--pattern-session-arrangement-screens.md` — formal restatement of MVP after view-spec revision
- **Per-actor intake sheet** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — one form per performer with consent, voice-profile-id, role, accent, vocal limitations
- **Recording spec** — *defined* — first in `dt-07-006--theatre-company-voice-on-travel.md` — cleanliness/consistency rules: one speaker, quiet room, no reverb, no long silences
- **Sample-cache voice-provider mode** — *defined* — first in `dt-07-004--voice-synthesis-injectability.md` — pre-rendered phrase files triggered like samples (safest for demos)
- **Section block (A/B/C demo mapping)** — *defined* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — three-phase translation of script: recognizable → cluster buildup → distributed dispersal
- **Take log** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — recording-session table with status, filename, timecode, selection
- **Three-mode demo (READABLE/CLUSTER/DISPERSAL)** — *defined* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — `$READABLE_PASSAGE`, `$CLUSTER_PASSAGE`, `$DISPERSAL_PASSAGE` for the Max demo
- **Travel-training tier** — *defined* — first in `dt-07-006--theatre-company-voice-on-travel.md` — quality tier for short captures used in transit / rehearsal
- **Usage-scope controlled vocabulary** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — enum of allowed `$USAGE_SCOPE` values (internal-training-only, client-demo-restricted, etc.)
- **Voice profile ID naming rule** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — `$ACTOR_ID__$STYLE_CLASS__$TIER__$REVISION` format

### Anything else (open category)
- **Bit depth** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — `$BIT_DEPTH` capture metadata (e.g., 24)
- **`bad-noise` / `clean` / `minor-noise`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — controlled `$NOISE_STATUS` values
- **`client-demo-restricted`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — usage-scope value
- **Cluster code** — *mentioned* — first in `dt-07-003--dialogue-cluster-tracker-demo.md` — short compact identifier displayed in a tracker cell
- **`flat` / `usable` / `strong` / `too-acted` / `inconsistent`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — controlled `$DELIVERY_STATUS` values
- **`heightened-stage`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — style-class value (stronger dramatic coloration)
- **House-tier** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — quality tier label (fuller company library)
- **Humanization range** — *mentioned* — first in `dt-05-001--tracker-ableton-features.md` — `HU` command parameter
- **`internal-demo-only` / `internal-production-dev` / `internal-training-only`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — usage-scope values
- **`measured-stage`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — style-class value (controlled theatrical energy)
- **Mic ID** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — `$MIC_ID` metadata field (e.g., `mkh416`)
- **`narration-clean`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — style-class value
- **`neutral-rehearsal`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — style-class value (flat, clean, low-expression capture)
- **`production-tier`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — quality tier label
- **`public-release-approved` / `public-release-prohibited`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — usage-scope values
- **`pending` / `recorded` / `selected` / `rejected` / `needs-retake` / `processed` / `trained` / `verified`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — controlled `$TAKE_STATUS` values
- **`research-only`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — usage-scope value
- **Room ID** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — `$ROOM_ID` capture metadata
- **Sample rate** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — `$SAMPLE_RATE` capture metadata (e.g., 48000)
- **`select` / `hold` / `reject` / `retake`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — controlled `$SELECTION_STATUS` values
- **Speech commands (PA/PR/RP/RT/OV/CU/EM/DN/PN/BR/ST/GL/MX/LK/HU/MT/TR)** — *defined* — first in `dt-05-001--tracker-ableton-features.md` — full table of tracker-derived command tokens with functions
- **Stage directions** — *mentioned* — first in `dt-06-001--prototype-and-poc-path.md` — script content optionally voiced by neutral narrator or hidden
- **Style class** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — `$STYLE_CLASS` controlled vocabulary attached to voice profiles
- **Tier** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — `$TIER` capture quality dimension (travel/house/production)
- **`tracker-shortform`** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — style-class value (short clusters/fragments for sequencer triggering)
- **Travel-tier** — *defined* — first in `dt-07-007--theatre-voice-capture-sheet.md` — quality tier label

---

## Section 4: Era 3 — Prompt Freedom / Governance / Discrepancy (dt-07-008 → dt-09)

Files covered:
- `dt-07-008--preconsidered-prompt-readiness.md`
- `dt-08-001--prototype-and-poc-path.md` through `dt-08-009--prompt-governance-charter.md`
- `dt-09-001--discrepancy-engine-design.md`

Era contour: the governance and meta-architecture arc. dt-07-008 introduces the "prepared-structure-selection" prompt posture. dt-08 re-traverses prototype / Max-MSP / dialogue-cluster / voice-synthesis / voice-clone / theatre-company-voice / capture-sheet territory with sharper precision than Era 2 covered. dt-08-008/009 deliver the **Prompt Governance Charter** — the largest single-document concentration: 9 named invariants, 9 prompt-target classes (`$SCENE_PARSE_REQUEST` through `$ARRANGEMENT_EDIT_REQUEST`), 5 policy variables (`$PROMPT_ROLE`, `$SYSTEM_PREPARATION_POLICY`, `$PROMPT_FREEDOM_POLICY`, `$STATE_MUTATION_POLICY`, `$TEST_GATE_POLICY`), and a full event family (`scene.parse.requested` → `prompt.rejected`). dt-09-001 introduces an entirely parallel system — the **Discrepancy / Reality Check Engine** — with its own check-record schema, 14-class error taxonomy, 7-type claim taxonomy, and three-panel workbench shape.


### Components / Services / Modules
- **Alias resolution** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Maps user-surface vocabulary (speaker/scene/line) to canonical internal terms before domain action selection; one-directional only.
- **Analysis Engine** — *mentioned* — first in `dt-08-009--prompt-governance-charter.md` — Invoked by `$DIAGNOSTIC_REQUEST`; emits advisory structural findings, never authoritative truth.
- **Audit record / audit module** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Per-prompt-operation record carrying prompt id, user, target class, canonical objects touched, contract id, event ids, test gate results, commit status, timestamps.
- **`[coll]` / `[dict]` (Max objects)** — *mentioned* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Max objects for storing row score data.
- **`[counter]` (Max object)** — *mentioned* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Max object tracking current row.
- **Contract** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Typed declaration: request type, allowed/required fields, defaults, validation rules, failure codes, side effects, events emitted.
- **Discrepancy engine / Reality Check Engine / Hypothesis Difference Engine** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — System that compares modeled claims against observed reality, classifies divergences, aggregates patterns; the headline construct of dt-09.
- **Domain action** — *defined* — first in `dt-08-008--prompt-freedom-reduction.md` — Finite declared operation prompts terminate in; sits in `packages/domain/`.
- **Domain event model / Event family** — *defined* — first in `dt-08-008--prompt-freedom-reduction.md` — Includes scene.parse.requested, version.created, render.requested/queued/processing/completed/failed, share.created, prompt.rejected.
- **Live engine (Max/MSP role)** — *defined* — first in `dt-08-002--max-msp-supercollider-feasibility.md` — Max-hosted live cueing/routing/triggering/rehearsal layer.
- **Master timing clock** — *mentioned* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Single source-of-truth clock for the Max patch.
- **`[matrixctrl]` (Max grid UI)** — *mentioned* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Candidate grid UI primitive for tracker display.
- **`[metro]` (Max object)** — *mentioned* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Drives row advance in the Max tracker.
- **Mixer / per-channel pan** — *mentioned* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Audio routing primitive in the Max patch.
- **Object storage** — *mentioned* — first in `dt-08-001--prototype-and-poc-path.md` — Holds audio render artifacts; named via `$OBJECT_STORE_URI`.
- **Polyvocal speech-composition engine (deeper layer)** — *alluded* — first in `dt-08-009--prompt-governance-charter.md` — The underlying engine beneath the dramaturgical-audio workbench surface.
- **Prompt resolution flow** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Pipeline: input → intent resolution → alias-to-canonical mapping → contract selection → domain action selection → event emission → invariant checks → test gates → state commit → derived outputs.
- **Pattern View (cluster-level)** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Discrepancy-engine surface where repeated checks accumulate into clusters (distinct from the tracker `$PATTERN_VIEW`).
- **Queue-backed render worker / render pipeline** — *mentioned* — first in `dt-08-001--prototype-and-poc-path.md` — Async render worker; `$APP_WORKER` / `$RENDER_WORKER`.
- **Relational core / relational storage** — *mentioned* — first in `dt-07-008--preconsidered-prompt-readiness.md` — Normalized DB layer holding mutable scene and immutable scene_version.
- **Rehearsal kernel** — *mentioned* — first in `dt-07-008--preconsidered-prompt-readiness.md` — Canonical subsystem referenced in the prompt-governance ontology.
- **`[route]` (Max object)** — *mentioned* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Routes events by voice-channel inside the Max patch.
- **Score-player patch** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Single-purpose Max patch realizing the play as tracker triggers (the friend-demo artifact).
- **Speech renderer per channel** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — One TTS/sample renderer per voice-channel in the Max patch.
- **Timing engine (SuperCollider role)** — *defined* — first in `dt-08-002--max-msp-supercollider-feasibility.md` — SuperCollider as deterministic row-precise scheduling/recurrence engine.
- **Typed API boundary** — *mentioned* — first in `dt-08-001--prototype-and-poc-path.md` — The Fastify-style typed API surface envisioned for the prototype.
- **Voice cache** — *defined* — first in `dt-08-004--voice-synthesis-injectability.md` — Local store of pre-rendered phrase audio referenced via `$VOICE_CACHE_DIR`.
- **Voice render adapter** — *defined* — first in `dt-08-004--voice-synthesis-injectability.md` — Pluggable layer between `$PHRASE_EVENT` and audio output; selects sample/live/hybrid backend.
- **`[transport]` (Max object)** — *mentioned* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Max's master transport primitive.

### Concepts / Frameworks / Theories
- **Acceptance test (POC success criterion)** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — Proof works when a playwright/dramaturg creates, hears, inspects, revises, versions, and shares a scene without other human performers.
- **Adoptable wedge** — *mentioned* — first in `dt-08-001--prototype-and-poc-path.md` — The commercially legible first product surface (listening-first revision environment).
- **Behavioral loop (over spectacle)** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — Repeatable scene→playback→revise→version→share loop as the proof point.
- **Calibration instrument for reasoning** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Full-strength form of the discrepancy engine: general epistemic machine applied to hypotheses, predictions, intuitions.
- **Canonical prompt target class** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Finite set of allowed prompt landing zones (`$SCENE_PARSE_REQUEST`, `$VERSION_CREATE_REQUEST`, etc.).
- **Category-collapse (error class)** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Discrepancy-engine error type: predicted higher-order use collapses to commodity use.
- **Checkable claim** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Unit of the discrepancy engine; replaces "fact" as the comparable atom.
- **Claim types** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Taxonomy: factual, behavioral, predictive, interpretive, design, causal, strategic.
- **Cluster Passage mode** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Second tracker mode: dialogue clusters begin to repeat and redistribute.
- **Cluster unit / dialogue cluster** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Small grouping of utterance events triggered as a unit.
- **Commercial wedge** — *mentioned* — first in `dt-08-002--max-msp-supercollider-feasibility.md` — The browser-first adoptable surface differentiated from engine layers.
- **Company voice library** — *defined* — first in `dt-08-006--theatre-company-voice-on-travel.md` — Centrally-recorded, consent-bounded archive of company performer voices.
- **Composition-and-execution proof (vs. workbench proof)** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Demo class focused on the engine/score idea, not the listening-revision product.
- **Compositional infrastructure (vs. script playback)** — *alluded* — first in `dt-08-001--prototype-and-poc-path.md` — Tracker-native cell commands are the line that separates the two.
- **Content bank (three-level)** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Level 1 full-line events, level 2 phrase clusters, level 3 atomized fragments.
- **Dispersal Passage mode** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Third tracker mode: text atomizes and disperses across channels/rows.
- **Dispersion field (output form)** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Spray-of-data output replacing binary verdicts; plots expected vs observed across axes.
- **Distributed repetition field** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Mid-piece zone where dialogue mutates from readable form into recurrent stacked positions.
- **Dramaturgical habit** — *mentioned* — first in `dt-08-001--prototype-and-poc-path.md` — Practitioner workflow disrupted by batch-style playback latency.
- **Dramaturgical-audio workbench** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — The commercial surface form of the system (versus polyvocal speech-composition engine underneath).
- **Dual-aspect language** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Governing semantic law: language is simultaneously semantic content and timed performance.
- **Error taxonomy** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Stable ontology of misses: exact_match, partial_match, directionally_correct, magnitude_error, timing_error, category_error, causal_error, overgeneralization, under-specification, ambiguity-leak, framing-bias, measurement-problem, reality-noise, unknown.
- **Eventful state mutation** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Trusted state changes only through approved domain actions + explicit events + invariant checks + safe persistence.
- **Hearing loop** — *mentioned* — first in `dt-07-008--preconsidered-prompt-readiness.md` — The end-to-end scene-listening loop covered by integration tests.
- **Hybrid architecture (web + SuperCollider + Max + worker + bridge)** — *defined* — first in `dt-08-002--max-msp-supercollider-feasibility.md` — Strongest shape: browser product front, SC timing core, Max live engine, async worker, OSC/WS bridge.
- **Immutability boundary** — *defined* — first in `dt-08-008--prompt-freedom-reduction.md` — The mutable-scene vs immutable-scene_version split that prompts cannot cross silently.
- **Injectable infrastructure (voice synthesis)** — *defined* — first in `dt-08-004--voice-synthesis-injectability.md` — Voice synthesis as pluggable layer reachable via env vars, not baked into score.
- **Instant clone vs professional clone** — *defined* — first in `dt-08-005--voice-clone-audio-requirements.md` — Two voice-clone quality tiers with distinct minimum-audio requirements.
- **Listening-first revision environment** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — The product framing for performative text revision; adoptable wedge form.
- **Listening test** — *mentioned* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Verification step in the take-status workflow.
- **Pattern aggregation layer** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Layer 3 of discrepancy output: what kinds of misses recur.
- **Polyvocal speech (work)** — *alluded* — first in `dt-08-009--prompt-governance-charter.md` — Deeper-layer subject of the engine; underlies the workbench.
- **Prepared-structure-selection (prompt posture)** — *defined* — first in `dt-07-008--preconsidered-prompt-readiness.md` — Prompt-as-selector-and-filler of prepared structures instead of inventor of structure.
- **Prompt freedom (reduction)** — *defined* — first in `dt-08-008--prompt-freedom-reduction.md` — Operating rule: low prompt freedom, high system preparation; prompt is selector/instantiator.
- **Prompt governance** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Normative architecture governing how prompts resolve into ontology/contracts/events/tests.
- **Quality tier (travel vs house vs production)** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Voice library tiering for capture pipeline.
- **Readable Passage mode** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — First tracker mode: conventional order playback as tracker.
- **Render lifecycle correctness** — *defined* — first in `dt-07-008--preconsidered-prompt-readiness.md` — Trust zone enforced via tests over render request → completion path.
- **Rejection-as-feature** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Prompts violating governance are rejected with structured reason + nearest-valid-operation suggestion.
- **Score logic vs cloud dependency** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Demo discipline: prove the score, not the TTS provider chain.
- **Spray map** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — User's preferred output form: dispersed pattern of divergences rather than binary right/wrong.
- **Structural gap** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Difference-vector field measuring missed compositional affordances.
- **Temporal kernel** — *defined* — first in `dt-08-002--max-msp-supercollider-feasibility.md` — Deeper engine layer beneath the browser-first product, hosting timing substrate.
- **Three-pane scene workspace** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — Script editor (L), playback + synchronized focus (C), speakers/diagnostics/versions/share (R).
- **Tracker brain vs live body vs shareable face** — *defined* — first in `dt-08-002--max-msp-supercollider-feasibility.md` — Three-role division: SC tracker, Max live, browser commercial.
- **Tracker precision + Ableton-style launch hybrid** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — Underlying paradigm fusion for the prototype's three canonical views.
- **Trust zones (parsing trust, version integrity, render lifecycle correctness)** — *defined* — first in `dt-08-008--prompt-freedom-reduction.md` — Tripartite framework for what the test matrix must guarantee.

### Tools / Technologies / External Systems
- **Ableton (Live)** — *mentioned* — first in `dt-08-001--prototype-and-poc-path.md` — Inspiration for session/arrangement view metaphors.
- **Airtable** — *mentioned* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Possible target for CSV-paste of capture sheet.
- **Apple speech / OS speech** — *mentioned* — first in `dt-08-004--voice-synthesis-injectability.md` — One example backend the injectable voice layer should support.
- **Cartesia** — *mentioned* — first in `dt-08-005--voice-clone-audio-requirements.md` — TTS/cloning provider; 5-second high-similarity clone reference.
- **ChatGPT** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Designated source of the modeled claim side of every reality check.
- **CI path** — *mentioned* — first in `dt-08-008--prompt-freedom-reduction.md` — Continuous integration enforcing contract drift / parsing trust / version integrity.
- **ElevenLabs** — *defined* — first in `dt-08-004--voice-synthesis-injectability.md` — Voice cloning provider; instant clone 1-2 min, professional 30-180 min, own-voice-only for pro.
- **Google Sheets** — *mentioned* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Target for TSV-ready capture-sheet headers.
- **HTTP (transport for voice adapter)** — *mentioned* — first in `dt-08-004--voice-synthesis-injectability.md` — One protocol candidate between Max and TTS service.
- **`js` (Max object)** — *mentioned* — first in `dt-08-004--voice-synthesis-injectability.md` — Possible Max bridge into JS for the voice adapter.
- **Jitter** — *mentioned* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Max graphics framework, candidate for custom tracker UI display.
- **Local synthesis model** — *mentioned* — first in `dt-08-004--voice-synthesis-injectability.md` — One injectable backend class for the voice adapter.
- **Max/MSP** — *defined* — first in `dt-08-002--max-msp-supercollider-feasibility.md` — Recommended host for live performable prototypes; cue/routing/triggering layer.
- **Music tracker (genre)** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — Time-and-sequence model the user holds as essential; row-precise vertical sequencer.
- **Node for Max** — *mentioned* — first in `dt-08-004--voice-synthesis-injectability.md` — Bridge for invoking JS-based voice adapters from Max.
- **Notion** — *mentioned* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Possible target for the capture sheet (database schema convertible).
- **OSC** — *defined* — first in `dt-08-002--max-msp-supercollider-feasibility.md` — Bridge protocol between SC/Max/web layers.
- **Pre-rendered speech samples / phrase banks** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Conservative demo backend: render once, trigger as samples.
- **Renoise** — *mentioned* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Negative reference: do not build a dense Renoise clone first.
- **Resemble (AI)** — *mentioned* — first in `dt-08-005--voice-clone-audio-requirements.md` — Voice cloning provider; rapid clone 10s-3min, pro clone 10-25min.
- **SuperCollider** — *defined* — first in `dt-08-002--max-msp-supercollider-feasibility.md` — Recommended host for deterministic timing/scheduling/recurrence engine.
- **TSV** — *mentioned* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Target serialization for the capture sheet.
- **WebSocket** — *mentioned* — first in `dt-08-002--max-msp-supercollider-feasibility.md` — Alternate bridge protocol between layers.

### People / Roles / Personas
- **Actor / company performer** — *defined* — first in `dt-08-006--theatre-company-voice-on-travel.md` — Subject of voice capture; `$ACTOR_ID`-keyed entity in the capture sheet.
- **Architecture (owner)** — *mentioned* — first in `dt-08-009--prompt-governance-charter.md` — Charter ownership role.
- **BAKER** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Fourth voice-channel persona in the demo play (`$VOICE_CHANNEL_04`).
- **Capture engineer** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Per-actor intake-sheet role.
- **ChatGPT (as modeled-claim source)** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Treated as a personified output stream against which reality is checked.
- **Client demo stakeholder** — *mentioned* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Named recipient of `client-demo-restricted` voice scope.
- **Director / conductor** — *alluded* — first in `dt-08-002--max-msp-supercollider-feasibility.md` — Implicit operator of "conductor transport" / "conductor logic" in Max prototype.
- **Dramaturg** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — Acceptance-test persona who must be able to run the loop without other performers.
- **Engineering (owner)** — *mentioned* — first in `dt-08-009--prompt-governance-charter.md` — Charter ownership role.
- **Engineering owner** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Capture-sheet control-vars field; per-session ownership.
- **FIRST_WOMAN** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — First voice-channel persona (`$VOICE_CHANNEL_01`).
- **Friend (audience-of-one)** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Demo recipient; sets the showable-instrument-problem framing.
- **GLASS** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Third voice-channel persona (`$VOICE_CHANNEL_03`).
- **Owner (of share artifact)** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — Holder who shares the read-only review page externally; collaborators don't edit there.
- **Playwright** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — Acceptance-test persona alongside dramaturg.
- **Product (owner)** — *mentioned* — first in `dt-08-009--prompt-governance-charter.md` — Charter ownership role.
- **SECOND_WOMAN** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Second voice-channel persona (`$VOICE_CHANNEL_02`).
- **Text owner** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Script-registry field naming ownership of script text.

### Document Types / Artifacts
- **`$ACTOR_INTAKE_SHEET` (per-actor)** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — One-per-performer enrollment sheet.
- **API contract / typed request contract** — *mentioned* — first in `dt-08-009--prompt-governance-charter.md` — Located in `apps/api/src/contracts/`.
- **Audio cache directory** — *defined* — first in `dt-08-004--voice-synthesis-injectability.md` — `$VOICE_CACHE_DIR` filesystem location.
- **Canonical lexicon and naming charter** — *defined* — first in `dt-07-008--preconsidered-prompt-readiness.md` — Pre-prompt prerequisite document locking ontology.
- **Check record** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Unit data row of the discrepancy engine.
- **Clip filename / master clip filename** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Naming convention for raw and processed voice captures.
- **Company voice pack / travel pack** — *defined* — first in `dt-08-006--theatre-company-voice-on-travel.md` — Approved voice-clone bundle for rehearsal/demo on the road.
- **Consent policy** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Versioned governance artifact (`$CONSENT_POLICY_VERSION`).
- **Cluster code** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Compact identifier inside a tracker cell.
- **Difference record** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Persisted output of one check.
- **Diagnostics summary (in share artifact)** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — Compact section of the read-only review page.
- **Domain event** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Named record emitted by every nontrivial prompt-originated operation.
- **Master capture sheet** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Master operating table for the capture session.
- **Master script registry** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Stable reusable pool of recording scripts.
- **Per-cell command (tracker)** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — Cell-level command tokens: pause, repeat, overlap, cue, density, transform.
- **Prompt Governance Charter** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — The artifact produced; lives at `docs/architecture/prompt-governance-charter.md`.
- **Read-only review page / share artifact** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — Public-facing share surface containing player, text, speaker labels, diagnostics summary.
- **Recording protocol** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Before-/during-/after-capture procedural rules.
- **Row event JSON object** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — `{row, voice, text, mode, pause_after_ms, repeat, pan, rate}` payload format for Max tracker cells.
- **Scene metadata** — *mentioned* — first in `dt-08-009--prompt-governance-charter.md` — Editable working-state field group.
- **Share link** — *mentioned* — first in `dt-08-001--prototype-and-poc-path.md` — The public artifact emitted by the share flow.
- **Spec (canonical lexicon, ontology, contracts, events)** — *mentioned* — first in `dt-07-008--preconsidered-prompt-readiness.md` — Body of pre-prompt artifacts.
- **Speech event** — *defined* — first in `dt-08-004--voice-synthesis-injectability.md` — Normalized output of the tracker that the voice-render adapter consumes.
- **Take log** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — In-session log of takes with TC, noise, delivery, selection columns.
- **Tempo / locator markers** — *mentioned* — first in `dt-08-001--prototype-and-poc-path.md` — Tracker-view UI primitives.
- **Theatre Company Voice Capture Sheet** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — The output document with control vars, vocabulary, naming rule, master sheet, intake sheet, take log, file standard, protocol, duration plan, CSV headers, short version.
- **Voice profile** — *defined* — first in `dt-08-004--voice-synthesis-injectability.md` — Per-channel voice assignment with stable id (`$VOICE_PROFILE_ID`).

### Methodologies / Processes / Workflows
- **Alias-to-canonical mapping discipline** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — User aliases → canonical terms, never the reverse.
- **Build order (three-pass prototype)** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — Thin coded alpha → core authoring loop → tracker-native features.
- **Build order (schema → CRUD → versioning → render → diagnostics → share)** — *mentioned* — first in `dt-07-008--preconsidered-prompt-readiness.md` — Engineering sequence inherited from prior docs.
- **Capture target tiering (travel 1-3 min vs house 10-30+ min)** — *defined* — first in `dt-08-006--theatre-company-voice-on-travel.md` — Two-quality-tier capture plan.
- **Charter authority order** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — 8-level precedence: governing sentence → terminology → ontology → contracts → events → tests → UI → prompt text.
- **Compare-as-structured-fields** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Don't compare raw prose; normalize both sides into typed fields first.
- **Difference-vector decomposition** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Direction, magnitude, domain, confidence gap, timing gap, structural gap, semantic gap, cause class.
- **Eventful + validated state mutation** — *defined* — first in `dt-08-008--prompt-freedom-reduction.md` — Required policy for trusted state changes.
- **File naming standard (voice capture)** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — `actor__script__take__date.wav` etc.
- **Four output layers (discrepancy)** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Raw comparison → error typing → pattern aggregation → model correction.
- **Hybrid voice provider mode** — *defined* — first in `dt-08-004--voice-synthesis-injectability.md` — Try cache first; if miss, synth + write-back; reuse next pass.
- **Instances-not-systems prompt rule** — *defined* — first in `dt-07-008--preconsidered-prompt-readiness.md` — Prompts generate object instances inside a pre-built model; never invent the model.
- **Listening loop** — *mentioned* — first in `dt-08-001--prototype-and-poc-path.md` — End-to-end scene-hearing user loop.
- **Loop pipeline (claim → reality → record → aggregation → calibration)** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — The discrepancy-engine outer process.
- **MVP discipline (defer-the-cathedral)** — *defined* — first in `dt-08-001--prototype-and-poc-path.md` — Skip overlap composition, visual score editing, live conductor tooling, deep collaboration, production infrastructure.
- **Pre-prompt artifact set** — *defined* — first in `dt-07-008--preconsidered-prompt-readiness.md` — Lexicon, relational core, event model, service topology, test matrix locked before any serious prompting.
- **Prompt rejection workflow** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Structured rejection with reason + nearest-valid-operation.
- **Reality check protocol** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — User puts claim by ChatGPT, checks against real-life observation, stores divergence.
- **Recording session lifecycle (record-twice/three, mouth-noise abort)** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Per-take procedural rules.
- **Selection-and-instantiator prompt role** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — `$PROMPT_ROLE := selector-and-instantiator` as governing policy.
- **Take selection workflow (select / hold / reject / retake)** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Disambiguated status assignment after every take.
- **Testing matrix (parsing/version/render/hearing)** — *defined* — first in `dt-07-008--preconsidered-prompt-readiness.md` — Minimum test matrix gating the prompting phase.
- **Three-section translation (A/B/C)** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Mapping play screenshots to recognizable / recurrent / distributed sections.
- **Three-tier voice quality plan** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — travel-tier / house-tier / production-tier.
- **TTS latency mitigation via cache** — *defined* — first in `dt-08-004--voice-synthesis-injectability.md` — Sample-cache mode to avoid network delay in live demos.
- **Voice library workflow (record-once-travel-with-pack)** — *defined* — first in `dt-08-006--theatre-company-voice-on-travel.md` — Quiet controlled setting, archive, travel pack, no on-road recording.

### Anything else (open category)
- **`$ARCHIVE_DRIVE` / `$ARCHIVE_ROOT`** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Capture-session control variables locating the company voice library on disk.
- **Audit rule** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Charter §15: every nontrivial prompt operation produces an audit record.
- **Attribution invariant** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — No spoken unit may become unattributed in committed state.
- **Boundary invariant** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — No prompt may smuggle unrelated production-management domains (costume, payroll, ticketing) into system scope.
- **Cluster code** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Compact label form for tracker cell contents.
- **Consent status** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — Capture-sheet column tracking performer permission state.
- **Derived artifact invariant** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Renders, diagnostics, share links do not become domain truth just because a prompt made them.
- **Deterministic render invariant** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Saved version + identical settings → substantially same playback timing.
- **Dual-aspect invariant** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Prompts may not reduce language to meaning-only or timing-only.
- **`EM` (tracker command)** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Emphasis / gain boost cell command.
- **`$ERROR_CLASS`** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Discrepancy-engine field; enumerated taxonomy.
- **Field-to-field comparison** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Structural method ensuring auditability.
- **Framing-bias error** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Error class where user's own framing biases the system before the check.
- **Governing sentence (charter §2)** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — "Prompts do not define the system. Prompts select and instantiate operations within the system."
- **Hardcoded demo dataset** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Pre-baked tracker score for the friend-demo rather than parsed from screenshots.
- **Magnetic policy (constrained-by-domain)** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — `$PROMPT_FREEDOM_POLICY := constrained-by-domain`.
- **Mode selector (tracker)** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — UI control switching between readable/cluster/dispersal passages.
- **Noise status** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — `clean / minor-noise / bad-noise`.
- **`OV` (tracker command)** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Overlap-enable cell command.
- **`PA` (tracker command)** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Pause-after-event cell command.
- **`PN` (tracker command)** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Pan cell command.
- **`$PROMPTS_SHALL_NOT_DEFINE_THE_SYSTEM`** — *defined* — first in `dt-08-008--prompt-freedom-reduction.md` — Codified slogan/policy directive.
- **`$PROMPTS_SHALL_SELECT_WITHIN_THE_SYSTEM`** — *defined* — first in `dt-08-008--prompt-freedom-reduction.md` — Companion codified directive.
- **`$PROMPT_FREEDOM_POLICY`** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Charter §6.3.
- **`$PROMPT_READYNESS_CHECKLIST`** — *undefined* — first in `dt-07-008--preconsidered-prompt-readiness.md` — Flagged as next-step artifact but never specified.
- **`$PROMPT_ROLE`** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Charter §6.1; selector-and-instantiator.
- **`$PROTO_01` (Max)** — *defined* — first in `dt-08-002--max-msp-supercollider-feasibility.md` — Named Max-first proof: four voice channels, tracker grid, phrase triggers, tempo map, repeat commands, conductor transport, TTS/prerecorded speech.
- **`$PROTO_02` (SuperCollider)** — *defined* — first in `dt-08-002--max-msp-supercollider-feasibility.md` — Named SC-first proof: row-based phrase-event sequencer with deterministic timing, pattern repetition, phase displacement.
- **`$PROTO_PLAY_01`** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — The named demo Max patch (four lanes, ~64-128 rows, three section states).
- **`$REALITY_CHECK_ENGINE` canonical definition** — *defined* — first in `dt-09-001--discrepancy-engine-design.md` — Compares modeled claims vs reality, classifies divergences, aggregates patterns.
- **`$REQUEST_TYPE` / `$ALLOWED_FIELDS` / `$REQUIRED_FIELDS` / `$DEFAULTS` / `$VALIDATION_RULES` / `$FAILURE_CODES` / `$SIDE_EFFECTS` / `$EVENTS_EMITTED`** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Charter §10 required contract fields.
- **`RP` (tracker command)** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Repeat-count cell command.
- **`CU` (tracker command)** — *defined* — first in `dt-08-003--dialogue-cluster-tracker-demo.md` — Cue-another-lane cell command.
- **`$STATE_MUTATION_POLICY`** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Charter §6.4; eventful-and-validated.
- **`$SYSTEM_PREPARATION_POLICY`** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Charter §6.2; ontology-first.
- **`$STYLE_CLASS` controlled vocabulary** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — neutral-rehearsal, measured-stage, heightened-stage, narration-clean, tracker-shortform.
- **`$TAKE_STATUS` controlled vocabulary** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — pending, recorded, selected, rejected, needs-retake, processed, trained, verified.
- **`$TEST_GATE_POLICY`** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — Charter §6.5; mandatory-for-trusted-effects.
- **`$TIER` controlled vocabulary** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — travel-tier, house-tier, production-tier.
- **`$USAGE_SCOPE` controlled vocabulary** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — internal-training-only, internal-demo-only, internal-production-dev, client-demo-restricted, public-release-prohibited, public-release-approved, research-only.
- **Version immutability invariant** — *defined* — first in `dt-08-009--prompt-governance-charter.md` — No prompt may mutate an existing immutable version.
- **`$VOICE_PROVIDER_MODE`** — *defined* — first in `dt-08-004--voice-synthesis-injectability.md` — Switch among sample_cache / live_tts / hybrid backends.
- **`$VOICE_PROFILE_ID` naming rule** — *defined* — first in `dt-08-007--theatre-voice-capture-sheet.md` — `actor__styleclass__tier__revision` shape.

---

## Section 5: Cross-era observations

### Entities spanning all three eras

Concepts the corpus carries from formalization through architecture through governance:

- **`$SPEECH_SCORE_ENGINE`** — canonical system name, first defined in dt-01-002, canonical as of dt-04-002.
- **`$PHRASE_EVENT`** — primary compositional unit; defined dt-01-002, schema-realized dt-03-005 (Era 1), tracker-cell-bound dt-05-001 (Era 2), normalized output of voice adapter dt-08-004 (Era 3).
- **`$VOICE_CHANNEL`** — performer-not-only-as-character; defined dt-02-001 (Era 1), surfaced as user-facing alias in dt-05-002 (Era 2), persona-bound in dt-08-003 (Era 3).
- **Polyvocal speech-composition engine** — internal system identity (vs. product-surface descriptor "dramaturgical-audio workbench"). First defined dt-04-002 (Era 1), formalized dt-05-002 (Era 2), referenced as the deeper layer beneath the workbench in dt-08-009 (Era 3).
- **Dramaturgical-audio workbench** — product-surface descriptor. First in dt-01-002 (Era 1), restated dt-05-002 (Era 2), governed by the charter in dt-08-009 (Era 3).
- **Scene-versus-version split** — load-bearing architectural invariant. Implicit dt-03-005 (Era 1), explicit dt-07-001 (Era 2), governance-anchored dt-08-009 (Era 3) as the version-immutability invariant.
- **Voice render adapter** — voice synthesis as injectable infrastructure. Era 2 dt-07-004 / Era 3 dt-08-004.
- **Listening-and-revision loop** — core behavioral thesis. Era 2 dt-06-001 / Era 3 dt-08-001.
- **Analysis Engine** — diagnostic layer. Era 1 dt-01-002 / Era 2 dt-05-002 / Era 3 dt-08-009.

### Naming evolution

- "Dramaturgical Composition System" (dt-01-001) → "Theatrical-Musical Composition System" / "Minimalist Speech-Performance Engine" (dt-02-001) → "Speech-Score Composition System" (dt-04-001 master merge) → **"Polyvocal Speech-Composition Engine"** (dt-04-002 canonical, stable thereafter).
- Seven naming candidates in dt-02-001 (`$LOGOS_AS_SCORE`, `$POLYPHONIC_SPEECH_ENGINE`, `$VOCAL_RITUAL_SEQUENCER`, `$TEMPORAL_DRAMA_MACHINE`, `$LITURGICAL_DIALOGUE_SYSTEM`, `$THEATRE_AS_NOTATION_PLATFORM`, `$POST_SCRIPT_PERFORMANCE_OS`) all appear in Section 1 as token literals — none survived to canonical status.

### The one explicit *undefined* item

Out of 749 catalogued semantic entities across 36 transcripts, only one was flagged as explicitly named-but-never-specified:

- **`$PROMPT_READYNESS_CHECKLIST`** — proposed at the end of dt-07-008 as the next-step artifact, never delivered in Era 3 or anywhere else in the corpus.

The corpus's discipline is high: it tends to either define a term completely or leave it as an evocative naming candidate with the candidacy itself made explicit. The single undefined item is therefore signal, not noise — it marks the only unresolved promise the dramaturgist conversation made to itself.

### Voices recurring across eras

Four named voice-channel personae for the bakery demo scene: **FIRST_WOMAN**, **SECOND_WOMAN**, **GLASS**, **BAKER**. First introduced in dt-06-001 (Era 2), persistent through dt-08-003 (Era 3). Each is bound to a `$VOICE_CHANNEL_NN` token in Section 1.

### Tools recurring across eras

Same names, hardening status: **Max/MSP**, **SuperCollider**, **ElevenLabs**, **Resemble**, **Cartesia**, **OSC**, **WebSocket**. Era 2 introduces them as feasibility data points; Era 3 promotes Max/MSP and SuperCollider to "recommended host" status while keeping the cloning providers as adapter-bound data points. Era 1's tools (PostgreSQL, Redis, MinIO, pnpm workspace, Turbo, Biome, etc.) are scaffold-stack rather than runtime-architecture and don't recur in Era 2 or 3 in the same role.

### Status-distribution observations

- **defined** is dominant. The corpus is principally a formalization exercise; most entities receive an explicit definition either at first mention or within the same era.
- **mentioned** clusters around audio/timing primitives surfaced in passing (click track, pulse, stems, voice-layer timing maps), and around external roles (Composer, Devising Ensemble, Sound Artist) who are users but not central personas.
- **alluded** picks up technologies the design implies before naming (Next.js, BullMQ, Biome in Era 1; the Dramatic-Audio Dialectic in Era 2's implicit dual structure), and the rare conceptual entity referenced before it gets its term (Reason Tracker in Era 1's "sequencer / voices as tracks" framing of `$VOCAL_SEQUENCER_FOR_THEATRE`).
- **undefined** is rare — see above.

### Section 1 vs. Pass B overlap

Roughly 200 of the 526 `$TOKEN` identifiers in Section 1 have a corresponding named-entity entry in Sections 2-4 (e.g. `$VOICE_RENDER_ADAPTER` ↔ "Voice render adapter"; `$PHRASE_EVENT` ↔ "Phrase Event"). The remaining ~326 tokens are field-level identifiers (`$CONFIDENCE_GAP`, `$TARGET_DURATION_TOTAL`, `$ACCESS_MODE`), schema column names (`$ESTIMATED_DURATION_MS`, `$SETTINGS_SNAPSHOT`), enum values (`$READABLE_PASSAGE`, `$DISPERSAL_PASSAGE`), env vars (`$AUTH_SESSION_SECRET`, `$VOICE_PROVIDER_API_KEY`), or fine-grained sub-structures that don't rise to standalone entity status in the semantic pass. The two sections complement rather than duplicate — Section 1 is the literal vocabulary of the system, Sections 2-4 are the conceptual entities the vocabulary names.
