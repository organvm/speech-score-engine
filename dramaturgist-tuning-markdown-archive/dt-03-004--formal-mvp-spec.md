---
archive_id: "dramaturgist-tuning"
pair_id: "dt-03-004"
global_pair_index: 7
conversation_index: 3
conversation_pair_index: 4
conversation_title: "Branch · Speech-based Performance System"
conversation_id: "69c6ec6f-164c-8329-ac9c-6734aeda8e5b"
source_shard: "conversations-019.json"
project_key: "g-p-69c6e425347c81918dfba984fb76206c"
share_anchor_url: "https://chatgpt.com/share/6a04a67e-24c4-83ea-975f-433e6ee42f5a"
conversation_created_utc: "2026-03-27T20:45:55.928824Z"
conversation_updated_utc: "2026-03-27T21:48:16.155862Z"
generated_at_utc: "2026-05-13T16:41:36Z"
prompt_message_ids:
  - "bb6f3bbc-0574-4da4-9866-6f69014ccfb2"
response_message_ids:
  - "7e3a2b61-d222-4869-b0d1-892297aa511e"
assistant_models:
  - "gpt-5-4-thinking"
attachment_count: 0
omitted_message_counts:
  omitted_system: 2
  omitted_total: 4
  omitted_assistant: 2
content_sha256: "58751a5d6980f7add07ad1edcf7da14a43d74bbc3b12ee0977542ce1a763e6b5"
cleaning: "visible user/assistant path only; system/tool/hidden/reasoning/tool-call scaffolding omitted; private citation glyphs normalized"
---


# dramaturgist-tuning - 03 Branch · Speech-based Performance System -- 004 Prompt / Response

## Pair Metadata

- Pair ID: `dt-03-004`
- Source: `conversations-019.json` / `69c6ec6f-164c-8329-ac9c-6734aeda8e5b`
- Conversation created UTC: `2026-03-27T20:45:55.928824Z`
- Conversation updated UTC: `2026-03-27T21:48:16.155862Z`
- Prompt messages: `1`
- Response segments: `1`
- Attachments referenced: `0`
- Omitted non-dialogue messages in this span: `4`

## Prompt

Message ID: `bb6f3bbc-0574-4da4-9866-6f69014ccfb2`
Created UTC: `2026-03-27T21:04:34.871000Z`

turn this into a formal MVP spec with system objects, user flows, screens, and functional requirements.

## Response

Message ID: `7e3a2b61-d222-4869-b0d1-892297aa511e`
Created UTC: `2026-03-27T21:04:36.203284Z`
Model: `gpt-5-4-thinking`

### Formal MVP Specification

#### $PRODUCT_ID

**Working title:** Audio-Dramaturgical Studio
**System class:** Listening-first dramatic writing environment
**MVP purpose:** Convert written dialogue into immediately audible, revisable, structurally inspectable performance-time before rehearsal.

---

#### 1. $MVP_INTENT

The MVP exists to prove one narrow proposition:

**Writers and dramaturgs will use and pay for a tool that lets them hear dialogue quickly, inspect its temporal behavior, and revise against sound rather than silent text alone.**

The MVP is not the full theatrical operating system. It is the first stable commercial surface of the larger architecture. It must therefore do one thing exceptionally well: take a scene from page to performed-audio simulation with minimal friction.

The system should allow a user to write or paste a script, detect or assign speakers, generate readable performed audio, expose basic timing and turn-taking structure, support revision, and preserve versions. The experience should feel closer to “auditioning the scene” than “using text-to-speech.”

---

#### 2. $MVP_SCOPE

The MVP includes the minimum set of capabilities required to make dialogue audible, editable, and inspectable.

The MVP includes single-scene authoring and playback, speaker assignment, voice assignment, timing controls for pauses and scene tempo, text-audio synchronization, a basic speaker timeline, lightweight dramaturgical diagnostics, saved versions, and shareable scene outputs.

The MVP excludes advanced polyphony, true overlap composition, live cueing, rehearsal-room synchronization, institutional administration, emotional acting controls, full collaboration layers, and performance-grade conducting infrastructure.

The design rule is simple: anything not required to prove the core listening-and-revision loop is deferred.

---

#### 3. $PRIMARY_USER_TYPES

##### 3.1 $USER_PLAYWRIGHT

The playwright uses the system to hear a draft immediately, detect weaknesses in pace or voice distinction, revise, and rehear. Their main task is drafting and structural refinement.

##### 3.2 $USER_DRAMATURG

The dramaturg uses the system to inspect scene behavior, identify friction points, annotate likely problems, and support development conversations. Their main task is diagnosis and interpretive feedback.

##### 3.3 $USER_DIRECTOR_LIGHT

The director is a secondary MVP user. They use the system to hear the movement of a scene before rehearsal and test alternate timing choices. Full directorial infrastructure is outside MVP scope, but basic interpretive listening is in scope.

##### 3.4 $USER_TEACHER_LIGHT

The teacher uses the system in workshop or classroom settings to move text from page to sound quickly. Class and roster features are out of scope; scene hearing and comparison are in scope.

---

#### 4. $SYSTEM_OBJECTS

The internal model must be designed carefully, because the later moat depends on it. Even in MVP, the system should not treat the script as plain text alone. It should treat it as structured performance-language.

##### 4.1 $OBJECT_USER

Represents an authenticated account holder.

Core fields:
`$USER_ID`
`$DISPLAY_NAME`
`$EMAIL`
`$ACCOUNT_PLAN`
`$CREATED_AT`
`$LAST_ACTIVE_AT`

The user owns projects, scenes, voice preferences, and saved versions.

##### 4.2 $OBJECT_PROJECT

A project is a container for one or more scenes.

Core fields:
`$PROJECT_ID`
`$OWNER_USER_ID`
`$TITLE`
`$DESCRIPTION`
`$CREATED_AT`
`$UPDATED_AT`

The MVP may launch with project support even if single-scene use dominates, because scene versioning becomes cleaner when nested inside a stable project object.

##### 4.3 $OBJECT_SCENE

The scene is the primary authoring unit in the MVP.

Core fields:
`$SCENE_ID`
`$PROJECT_ID`
`$TITLE`
`$RAW_TEXT`
`$PARSED_TEXT`
`$SCENE_STATUS`
`$ESTIMATED_DURATION_MS`
`$CREATED_AT`
`$UPDATED_AT`

`$RAW_TEXT` stores the original pasted or authored text.
`$PARSED_TEXT` stores the structured representation after speaker parsing and line segmentation.

##### 4.4 $OBJECT_SPEAKER

Represents a speaking entity in the scene.

Core fields:
`$SPEAKER_ID`
`$SCENE_ID`
`$DISPLAY_LABEL`
`$SORT_ORDER`
`$VOICE_PROFILE_ID`
`$DEFAULT_PACING_PROFILE_ID`

A speaker may be a character, narrator, chorus unit, or placeholder voice.

##### 4.5 $OBJECT_LINE

Represents a single attributed spoken unit.

Core fields:
`$LINE_ID`
`$SCENE_ID`
`$SPEAKER_ID`
`$LINE_INDEX`
`$TEXT_CONTENT`
`$PAUSE_AFTER_MS`
`$EMPHASIS_HINT`
`$IS_STAGE_DIRECTION`
`$ESTIMATED_DURATION_MS`

The MVP should separate spoken lines from stage directions. Stage directions may be hidden from playback by default or optionally voiced in a neutral narrator voice.

##### 4.6 $OBJECT_VOICE_PROFILE

Represents the selected synthetic or rendered voice characteristics for a speaker.

Core fields:
`$VOICE_PROFILE_ID`
`$VOICE_PROVIDER`
`$VOICE_MODEL_KEY`
`$VOICE_LABEL`
`$VOICE_GENDER_PRESENTATION`
`$VOICE_TIMBRE_CLASS`
`$SPEECH_RATE`
`$PITCH_OFFSET`
`$PAUSE_STYLE_PROFILE`

The voice profile is implementation-specific beneath the surface, but the user-facing layer should remain simple.

##### 4.7 $OBJECT_PLAYBACK_RENDER`

Represents a generated audio rendering of the scene or scene segment.

Core fields:
`$RENDER_ID`
`$SCENE_ID`
`$VERSION_ID`
`$RENDER_SCOPE`
`$AUDIO_URI`
`$DURATION_MS`
`$GENERATED_AT`
`$RENDER_STATUS`

`$RENDER_SCOPE` can be full scene, selected lines, or speaker-isolated segment.

##### 4.8 $OBJECT_DIAGNOSTIC_REPORT

Represents lightweight structural findings.

Core fields:
`$REPORT_ID`
`$SCENE_ID`
`$VERSION_ID`
`$GENERATED_AT`
`$SUMMARY`
`$FLAG_SET`

`$FLAG_SET` may contain findings such as long unbroken speech, low speaker alternation, repetition density, or exposition clustering.

##### 4.9 $OBJECT_VERSION

Represents a saved revision state.

Core fields:
`$VERSION_ID`
`$SCENE_ID`
`$VERSION_LABEL`
`$RAW_TEXT_SNAPSHOT`
`$PARSED_TEXT_SNAPSHOT`
`$SETTINGS_SNAPSHOT`
`$CREATED_AT`

This object is mandatory for revision comparison and trust in the editing workflow.

##### 4.10 $OBJECT_SHARE_LINK

Represents a shareable output for review.

Core fields:
`$SHARE_ID`
`$SCENE_ID`
`$VERSION_ID`
`$ACCESS_MODE`
`$EXPIRES_AT`
`$CREATED_AT`

The shared artifact may include script text, aligned playback, and diagnostic summary.

---

#### 5. $DOMAIN_RULES_AND_INVARIANTS

The MVP should enforce a few invariants from the beginning.

A scene must always have at least one speaker or narrator-equivalent playback assignment before full-scene render.

Each spoken line must map to exactly one speaker in MVP mode. True simultaneous multi-speaker utterance is deferred.

Playback timing must be deterministic for a given version and settings state. The same saved version with identical timing parameters should produce substantially the same line schedule.

User edits should never silently destroy prior versions. Version persistence is a trust-critical feature.

Diagnostic output must be advisory, not authoritative. The product may surface patterns, but it must not pretend to possess final dramaturgical truth.

---

#### 6. $PRIMARY_USER_FLOWS

#### 6.1 $FLOW_CREATE_AND_HEAR_SCENE

The user enters the product and creates a new scene. They paste or write dialogue into the editor. The system parses probable speaker labels and line boundaries. The user confirms or corrects speakers. The system assigns default voices. The user presses play and hears the scene rendered. The text scrolls or highlights in sync with playback. The user now has first-pass auditory externalization.

This is the most important MVP flow. It must be extremely fast.

##### Success condition

From blank state to first scene playback in under a few minutes, ideally much less.

#### 6.2 $FLOW_ADJUST_VOICES_AND_TIMING

After first playback, the user opens speaker settings. They change voice assignments, global pace, or pause-after-line defaults. They replay the scene. The user compares the new result against the prior hearing.

This flow allows the user to test interpretive variation without major friction.

##### Success condition

A user can alter the feel of the scene without rewriting the scene itself.

#### 6.3 $FLOW_REVISE_TEXT_AGAINST_AUDIO

While hearing the scene, the user notices a dead line, awkward repetition, or weak turn. They stop playback, edit the line in place, save a new version, and replay only the affected section or the full scene.

This is the core value loop of the product.

##### Success condition

The revision loop feels tight enough that auditory inspection becomes habitual.

#### 6.4 $FLOW_INSPECT_SCENE_STRUCTURE

The user opens the timeline or diagnostic panel. They inspect speaker balance, monologue length, turn density, and flagged issues. They jump from a flagged area directly to the relevant line in the editor and replay that region.

This shifts the product from passive playback to active dramaturgical inspection.

##### Success condition

The tool helps the user find likely weak points faster than manual rereading alone.

#### 6.5 $FLOW_COMPARE_VERSIONS

The user saves two or more versions of the scene and compares them. They may compare text, duration, or audio render. They determine whether a revision improved the scene.

##### Success condition

The product makes structural revision legible rather than merely accumulative.

#### 6.6 $FLOW_SHARE_FOR_REVIEW

The user generates a share link for a given version. A collaborator opens the shared page and can read the scene, listen to the playback, and inspect the basic diagnostics without needing full editing access.

##### Success condition

The product supports development conversations outside the author’s machine.

---

#### 7. $SCREEN_ARCHITECTURE

The screen design should follow the user’s temporal workflow, not generic document-app conventions.

#### 7.1 $SCREEN_AUTH_AND_ENTRY

This is the entry screen for account access and onboarding. It should provide login, registration, and a concise product value statement. After first login, the user should be moved quickly into project or scene creation.

##### Core elements

Authentication controls, brief explanation of value, and a prominent “new scene” path.

#### 7.2 $SCREEN_DASHBOARD

This is the user’s home screen after authentication. It lists recent projects, recent scenes, recent versions, and an obvious action to create a new scene.

##### Core elements

Project list, scene list, last played scenes, draft status, and quick-create affordances.

The dashboard should not be overloaded. The product’s center of gravity is the scene workspace.

#### 7.3 $SCREEN_NEW_SCENE_IMPORT

This screen lets the user start from blank text or paste/import a script excerpt.

##### Core elements

Title field, text input area, sample formatting hint, import-from-text action, parse action.

The screen should support simple conventions such as:

`CHARACTER: line`

The MVP should parse speaker labels from common script patterns, but should not attempt to support every dramatic manuscript format.

#### 7.4 $SCREEN_SCENE_WORKSPACE

This is the primary screen of the MVP. It combines the script editor, playback controls, speaker panel, and structural inspection views.

The scene workspace should have four primary regions:

A script editor region for the text itself.
A playback region with play, pause, stop, scrub, and section replay.
A speaker/voice region for assignment and quick tuning.
A structural region showing timeline or diagnostics.

##### Core elements

Scene title, editable script, selected speaker chips, playback transport, synchronized line highlighting, save-version control, render status, and diagnostics summary.

This screen is where most user time will be spent.

#### 7.5 $SCREEN_SPEAKER_ASSIGNMENT

This may be a modal or dedicated panel. It allows the user to review parsed speakers, merge duplicates, rename speakers, assign voices, and set per-speaker defaults.

##### Core elements

Speaker list, rename control, default voice chooser, pace adjustment, narrator inclusion toggle.

#### 7.6 $SCREEN_DIAGNOSTIC_PANEL

This screen or side panel displays the scene’s flagged patterns and high-level structural metrics.

##### Core elements

Estimated scene duration, lines per speaker, longest uninterrupted speech block, turn frequency, repeated phrase clusters, dense exposition candidates, and clickable flags.

The language must remain pragmatic, not mystical. The product should say “possible long monologue stretch” rather than “this scene fails dramatically.”

#### 7.7 $SCREEN_VERSION_HISTORY

This screen lists saved versions and allows the user to restore, compare, or share a selected version.

##### Core elements

Version timestamps, version labels, duration deltas, text diffs, selected playback comparison.

#### 7.8 $SCREEN_SHARE_VIEW

This is the read-only external artifact.

##### Core elements

Scene title, playback player, synchronized or static script text, selected diagnostics summary, and optional notes from the sharer.

The share view should be elegant and low-friction.

---

#### 8. $FUNCTIONAL_REQUIREMENTS

#### 8.1 $FR_SCRIPT_INPUT

The system shall allow a user to create a scene by typing or pasting text into a scene editor.

The system shall preserve raw pasted text.

The system shall support common dialogue formatting patterns, especially speaker-prefixed lines.

The system shall permit manual reassignment of speakers when parsing is incorrect.

#### 8.2 $FR_SCRIPT_PARSING

The system shall parse probable speaker labels and line boundaries from user input.

The system shall generate a structured internal representation of the scene.

The system shall distinguish spoken lines from probable stage directions where feasible, while allowing the user to override the classification.

The parser may be heuristic in MVP, but must be transparent and correctable.

#### 8.3 $FR_SPEAKER_MANAGEMENT

The system shall allow creation, renaming, merging, deletion, and ordering of speakers within a scene.

The system shall require each spoken line to map to exactly one speaker.

The system shall maintain stable speaker identity across versions unless the user explicitly changes it.

#### 8.4 $FR_VOICE_ASSIGNMENT

The system shall allow assignment of a voice profile to each speaker.

The system shall provide at least a minimal but usable range of voices sufficient to differentiate speakers.

The system shall allow global and per-speaker speech-rate adjustment.

The system shall allow users to preview an individual voice before applying it scene-wide.

#### 8.5 $FR_PLAYBACK

The system shall generate audio playback for a scene.

The system shall support full-scene playback.

The system shall support playback beginning from a selected line.

The system shall support pause, resume, stop, and scrub operations.

The system shall visually indicate the current line during playback.

The system shall permit replay of a selected region.

#### 8.6 $FR_TIMING_CONTROLS

The system shall allow adjustment of global playback pace.

The system shall allow adjustment of default pause-after-line behavior.

The system may allow lightweight per-line pause override in MVP if implementation cost remains moderate; if not, this may be deferred to post-MVP.

The system shall recalculate estimated duration after timing changes.

#### 8.7 $FR_DIAGNOSTICS

The system shall generate a lightweight diagnostic summary for a scene version.

The diagnostic layer shall include at least some combination of the following:
long uninterrupted speaker runs,
speaker share imbalance,
high repetition density,
probable exposition-heavy passage detection,
and low alternation density.

The system shall allow the user to click from a diagnostic finding to the relevant part of the text.

The system shall present findings as suggestions rather than judgments.

#### 8.8 $FR_VERSIONING

The system shall allow saving a scene as a named or timestamped version.

The system shall preserve prior versions.

The system shall allow version comparison through at least text-delta and playback/duration metadata comparison.

The system shall allow restoring a prior version as the current editable state without destroying history.

#### 8.9 $FR_SHARE

The system shall allow generation of a shareable link for a scene version.

The shareable view shall permit audio playback and text reading.

The owner shall be able to revoke or expire shared links.

Editing access is not required in MVP share mode.

#### 8.10 $FR_PROJECT_ORGANIZATION

The system shall allow grouping of scenes into projects.

The system shall allow scene listing and retrieval from a project view.

The project layer may remain lightweight in MVP, but it should exist to avoid future migration pain.

#### 8.11 $FR_PERSISTENCE

The system shall autosave scene edits or clearly prompt the user to save.

The system shall preserve unsent or partial edits against accidental navigation loss.

The system shall persist user settings relevant to playback defaults.

#### 8.12 $FR_PERFORMANCE_AND_LATENCY

The system shall provide visible feedback during render generation.

Short scenes should render quickly enough that the revision loop remains psychologically continuous.

The product must avoid making each playback request feel like a batch-processing job.

Latency is not merely technical here; it is dramaturgical. Slow turnaround breaks the listening-revision habit.

---

#### 9. $NON_FUNCTIONAL_REQUIREMENTS

The MVP must feel trustworthy, fast, and legible.

The interface should avoid over-aestheticized theatrical metaphors that obscure utility. The user is here to work.

The system must maintain a strong sense of object permanence: scenes, versions, voices, and diagnostics should not feel ephemeral.

The application should be browser-first and responsive enough for laptop and tablet use. Mobile consumption may work for share views, but full authoring can remain desktop-first in MVP.

The product must maintain privacy and access control appropriate to unpublished creative work.

The wording throughout the system should remain precise and domain-aware without becoming pretentious.

---

#### 10. $OUT_OF_SCOPE_FOR_MVP

The following capabilities are explicitly deferred.

True simultaneous overlapping speech composition is deferred.

Visual score editing and spatial layout composition are deferred.

Live rehearsal synchronization and conductor tooling are deferred.

Deep multi-user collaboration with shared editing presence is deferred.

Institutional classroom administration is deferred.

Emotion-engine or acting-style microcontrol is deferred.

Marketplace, discovery, and social publishing features are deferred.

Automated dramaturgical critique beyond lightweight pattern detection is deferred.

These are not rejected; they are sequenced later.

---

#### 11. $SUCCESS_METRICS

The MVP should be judged against behavioral evidence, not abstract excitement.

A successful MVP would show that users can get from blank scene to first playback rapidly, that they replay and revise multiple times in one session, that versioning is used rather than ignored, that diagnostics are opened and acted on, and that shared links generate real review workflows.

The key product indicators are therefore:

time to first playback,
replay frequency per scene,
average revisions per scene session,
diagnostic engagement rate,
share-link creation rate,
return usage across multiple scenes,
and conversion from trial use to sustained drafting behavior.

The decisive question is not “do users think it is interesting?” It is “does it become part of how they develop dialogue?”

---

#### 12. $MVP_RISKS

One risk is that the product could feel like dressed-up TTS if the temporal and diagnostic layer is too weak.

Another risk is that render latency could make revision feel sluggish and break the core loop.

Another is parser brittleness: if script import is unreliable, the first-run experience collapses.

Another is overclaim. If the product sounds like it “understands dramaturgy” but only produces thin insights, users will distrust it. The MVP must promise practical listening assistance first and intelligent structural flags second.

A subtler risk is designing too much for avant-garde polyphony too early. That would compromise the commercial wedge.

---

#### 13. $FOUNDATIONAL_DATA_MODEL_DECISION

The most important implementation decision is that the system must store scenes as structured temporal dialogue objects rather than plain documents.

Even if the UI looks simple, the internal model should preserve:

speaker identity,
line order,
line duration estimate,
pause semantics,
render settings,
and version-bound timing state.

This is what keeps the MVP from becoming a dead-end app. It allows later expansion into overlap, score composition, and live execution without rebuilding the ontology from scratch.

---

#### 14. $MVP_ACCEPTANCE_CRITERIA

The MVP is acceptable when a playwright or dramaturg can create a scene, hear it, inspect its basic temporal structure, revise it, save versions, and share a reviewable artifact without external human performers.

A stronger acceptance threshold would be this:

A serious user chooses the tool over silent rereading for at least part of their drafting workflow.

That is the real test.

---

#### 15. $NEXT_LOGICAL_ARTIFACTS

The next logical artifact after this spec is a product-design and systems package containing:

a normalized object schema,
screen-by-screen annotated wireframe descriptions,
API surface draft,
event model for playback/render/version actions,
and a phased implementation plan from alpha to beta.

I can draft that next as a formal **system design package**.
