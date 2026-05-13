---
title: "Speech score engine overview"
source_path: "dramaturgist-tuning-markdown-archive/sources/speech-score-engine-overview.md"
source_sha1: "5b0a7299dd0b"
project_save_id: null  # truncated in saves-list before capture; recovered from gizmo files array
conversation_id: null
conversation_title: "Speech-based Performance System lineage"
canvas_index: 9
date_in_chatgpt: "2026-03-27"
recovered_at: "2026-05-13"
---
# $SPEECH_SCORE_ENGINE

## System concept

This system is a **speech-based performance environment** in which language is treated simultaneously as semantic content, rhythmic material, and executable score. Its governing premise is that a dramatic utterance is never only “text on a page”; it is also a timed event, a vocal gesture, a positional relation among voices, and a repeatable performance object. The system therefore unifies writing, notation, rehearsal, audio rendering, and live execution inside one formal frame. fileciteturn0file0 fileciteturn0file2

At the product surface, the system can present itself as a **dramaturgical-audio workbench**: a place where playwrights, dramaturgs, directors, and performers can hear dialogue, inspect timing, and revise scenes against performance rather than against silent reading alone. Underneath that accessible surface, however, it is a deeper composition engine for polyvocal, rhythmically organized, text-driven works. fileciteturn0file1

The system is not reducible to text-to-speech. Generic TTS reads words. This system models **who speaks, when they enter, how phrases recur, how voices overlap, how silence functions, how layout encodes performance, and how a work migrates across page, audio, rehearsal room, and stage**. fileciteturn0file0 fileciteturn0file1

## Ontological definition

A formal definition is:

**$SPEECH_SCORE_ENGINE := a compositional system for authoring, analyzing, rehearsing, rendering, and performing polyvocal speech works in which text, timing, recurrence, vocal distribution, and spatial notation are interoperable across analog and digital forms.**

Its primary unit is not the “scene” in the ordinary literary sense. Its primary unit is the **$PHRASE_EVENT**: a bounded utterance or fragment with semantic content, speaker assignment, temporal position, duration behavior, and relational status to other phrase-events.

## System boundary

Inside the system belong the following problem domains.

**Authorship.** The creation of phrase-events, speaker assignments, rhythmic structures, repetitions, interruptions, and formal transformations.

**Notation.** The encoding of speech as score, including columns, stagger, loop, overlap, pause, density, and emphasis.

**Analysis.** The inspection of pace, repetition, breathability, turn structure, speaker differentiation, and ensemble coordination.

**Rehearsal.** The generation of performer-facing materials, conductor-facing materials, timing cues, and audio references.

**Rendering.** The production of table-read audio, rhythm studies, score views, and live prompt interfaces.

**Execution.** The real-time coordination of performers, voices, cues, timing grids, and optional audience or conductor inputs.

Outside the system, unless later integrated, are costume, scenic design, venue ticketing, payroll, and unrelated production logistics.

## Core components

### $COMPOSITION_LAYER

This is the authoring environment. The user writes or imports text, assigns voices, fragments lines into phrase-events, declares recurrence rules, and chooses whether the passage behaves as conventional dialogue, counterpoint, loop field, accumulative canon, or dispersive text matrix.

### $PHRASE_EVENT_MODEL

This is the canonical data structure. Every utterance is stored not merely as a line of text but as a structured object with at least these fields:

`$PHRASE_ID`
`$TEXT`
`$VOICE_ID`
`$START_RULE`
`$DURATION_RULE`
`$REPEAT_RULE`
`$OVERLAP_RULE`
`$EMPHASIS_RULE`
`$TRANSFORM_RULE`
`$SPATIAL_RULE`
`$SEMANTIC_TAGS`

This model prevents the script from collapsing back into inert prose.

### $TIMING_SUBSTRATE

This is the temporal kernel. It supports clock time, beat time, relative cue time, and free elastic time. In a conventional mode, phrase-events may trigger from preceding lines. In a more musical mode, they may trigger from measure counts, subdivisions, or phase offsets. The substrate therefore permits both literary timing and compositional timing inside one engine.

### $VOICE_ENGINE

This manages voice identity. A voice may correspond to a character, actor, channel, chorus section, synthetic voice, or abstract speech role. The system distinguishes between **character identity** and **voice-channel identity**, because one character may split across channels and one channel may carry multiple textual functions.

### $NOTATION_RENDERER

This produces score views. It must render at least four views: readable script view, rhythmic score view, spatial matrix view, and performer-specific part view. A line that appears as normal dialogue in one mode may appear as clipped repeating cells in another.

### $ANALYSIS_ENGINE

This is the dramaturgical diagnostic layer. It identifies pacing drag, excessive exposition, low speaker differentiation, broken interruption logic, rhythm monotony, overlong turns, dead pauses, and opportunities for intensification through repetition or redistribution.

### $REHEARSAL_KERNEL

This translates score objects into practical rehearsal artifacts. It generates cue sheets, click guides, optional count-ins, practice stems, loop studies, and section isolations. It should support both conductor-led rehearsal and self-guided rehearsal.

### $LIVE_EXECUTION_LAYER

This coordinates real-time performance. It may present conductor view, countdown view, monitor prompts, tempo map, and conditional branching. In advanced versions it can accommodate performer override, live retiming, or rule-bound indeterminacy.

### $ARCHIVE_AND_EXPORT_LAYER

This stores the work as both human-legible document and machine-readable composition object. It exports PDF scores, audio drafts, rehearsal packs, JSON score objects, subtitle or caption streams, and possibly projection-ready kinetic text.

## Core invariants

The system needs hard invariants. Without them, it degrades into a loose writing toy.

**Invariant one: language remains dual-aspect.** Every textual unit must preserve both semantic meaning and temporal behavior. A phrase-event cannot exist as “meaning only” or “timing only.”

**Invariant two: every utterance is attributable.** Each phrase-event must always have a definite source channel, even if that channel is chorus, split chorus, ambient voice, or algorithmic distribution.

**Invariant three: repetition is first-class.** Repetition is not treated as an accidental duplicate. It is an explicit structural operation with count, spacing, transformation, and termination conditions.

**Invariant four: silence is material.** Pauses, holds, and blank intervals are encoded objects, not absences. Silence can cue, intensify, suspend, or fracture relation.

**Invariant five: page, audio, and performance must remain translatable.** A work authored in the system must be renderable as a readable score, an audible mockup, and a live-executable structure without rewriting the work from scratch.

**Invariant six: analog-digital parity is preserved.** No work should require the software in order to exist. The software may optimize composition and coordination, but the score must be extractable for analog rehearsal and performance.

**Invariant seven: human override remains possible.** In live conditions, conductor, director, or performers must be able to override timing and continue the work without catastrophic state failure.

**Invariant eight: controlled indeterminacy must be explicit.** If the work allows variability, the variability must be declared as rule, range, or probability envelope, not left undefined.

## Notation rules

The notation system should be minimal, rigorous, and extensible.

### $UNIT_RULES

The smallest meaningful object is `$PHRASE_EVENT`. A phrase-event may contain a full sentence, clause, fragment, word, or phonetic residue. It must be discrete enough to be placed, repeated, delayed, layered, or transformed.

A collection of phrase-events forms a `$PASSAGE`. A collection of passages forms a `$MOVEMENT`. A collection of movements forms a `$WORK`.

### $VOICE_RULES

Voices are declared separately from character names. Example:

```text id="scrkl8"
VOICE A = FIRST_WOMAN
VOICE B = SECOND_WOMAN
VOICE C = GLASS
VOICE D = BAKER
```

This lets the system later reassign one text to multiple channels, collapse characters into chorus, or redistribute a role without rewriting the semantic source.

### $ENTRY_RULES

Each phrase-event needs a start rule. Accepted classes should include:

`ON_CUE(<phrase_id>)`
`AT_BEAT(<n>)`
`AFTER(<duration>)`
`WITH(<phrase_id>)`
`WHEN_COMPLETE(<phrase_id>)`
`ON_CONDUCTOR_MARK(<mark_id>)`

### $DURATION_RULES

Each phrase-event needs performance duration behavior. At minimum:

`FREE_SPEECH`
`COUNTED(<beats>)`
`STRETCH(<range>)`
`RAPID_FIRE`
`SUSTAINED`
`CUT_SHORT_ON_NEXT_ENTRY`

### $REPEAT_RULES

Repetition must be explicit. At minimum:

`REPEAT(<count>)`
`LOOP_UNTIL(<event>)`
`OSTINATO(<count>, <spacing>)`
`ACCUMULATE(<new_material>)`
`DIMINISH(<rule>)`

### $OVERLAP_RULES

Overlap is structurally central. At minimum:

`NO_OVERLAP`
`CAN_OVERLAP`
`MUST_OVERLAP_WITH(<voice_id>)`
`PHASE_SHIFT(<offset>)`
`INTERRUPT(<phrase_id>)`

### $TRANSFORM_RULES

A repeated phrase may change. At minimum:

`TEXT_CONST`
`DROP_WORD_EACH_REPEAT`
`ADD_WORD_EACH_REPEAT`
`CHANGE_STRESS(<pattern>)`
`SPLIT_ACROSS_VOICES`
`SCATTER_BY_WORD`
`SEMANTIC_DECAY`

### $SPATIAL_RULES

Layout is part of notation. A phrase-event may declare:

`COLUMN(<n>)`
`X_POS(<value>)`
`Y_FLOW(<value>)`
`STACK_WITH(<phrase_id>)`
`DISPERSE`
`CONVERGE`

This is how the page becomes score rather than transcript.

## Minimal notation example

```text id="cg3tav"
WORK: PHILIP_VARIATION_01

VOICE A = FIRST_WOMAN
VOICE B = SECOND_WOMAN
VOICE C = GLASS
VOICE D = BAKER

P001 { TEXT:"Isn't that Philip Glass?"
VOICE:A
START:AT_BEAT(1)
DURATION:COUNTED(4)
REPEAT:OSTINATO(4, 2 beats)
OVERLAP:CAN_OVERLAP
TRANSFORM:TEXT_CONST
SPATIAL:COLUMN(1) }

P002 { TEXT:"I think it is."
VOICE:B
START:WITH(P001)
DURATION:COUNTED(4)
REPEAT:OSTINATO(4, 2 beats)
OVERLAP:CAN_OVERLAP
SPATIAL:COLUMN(2) }

P003 { TEXT:"Can I help you, sir?"
VOICE:D
START:AFTER(2 beats)
DURATION:COUNTED(4)
REPEAT:OSTINATO(4, 3 beats)
OVERLAP:MUST_OVERLAP_WITH(C)
SPATIAL:COLUMN(4) }
```

This is only one representation. The same object should also render as normal script text, performer parts, and timed audio cues.

## Candidate outputs

The system should emit several distinct output classes.

A **$READABLE_SCRIPT** output gives literary readability for writers, readers, and archives.

A **$RHYTHMIC_SCORE** output gives measure-aligned or beat-aligned notation for rehearsal and formal composition.

A **$SPATIAL_TEXT_SCORE** output gives the visual field version, where typography and distribution carry instructions.

A **$TABLE_READ_AUDIO** output gives a rapid audition of the scene for dramaturgical listening. This is the clearest commercial entry point. fileciteturn0file1

A **$REHEARSAL_PACK** output gives performer parts, cue sheets, count maps, and loop drills.

A **$CONDUCTOR_VIEW** output gives live control of entries, pulse, holds, and branch points.

A **$LIVE_PROMPT_VIEW** output gives monitor-safe text display for performers during workshop or performance.

A **$STEMMED_AUDIO_RENDER** output gives isolated voice channels, click track, and composite mix.

A **$MACHINE_SCORE_OBJECT** output gives JSON or similar structured data for software reuse, archival search, and future recomposition.

A **$KINETIC_TEXT_RENDER** output gives projection, screen, or installation form in which the score becomes visible motion.

## Candidate users

The immediate users are playwrights, dramaturgs, directors, actors, devising ensembles, and teachers. The advanced users are composers, sound artists, choreographers of speech, installation artists, and developers building live text-performance systems. This dual identity follows directly from the fact that the project sits both as a practical dialogue-hearing tool and as a deeper performance-composition engine. fileciteturn0file0 fileciteturn0file1

## Candidate MVP boundary

For a first build, the minimum serious version is:

A text editor for speaker-assigned dialogue.
A phrase-event parser.
A timing model with pauses, overlaps, and repeat counts.
A table-read audio renderer.
A score view.
A rehearsal export.

That MVP is enough to prove the central claim: that writers can revise dialogue more effectively when they hear and inspect it as timed relation rather than as silent text. fileciteturn0file1

## Final compression

The formal concept is this:

**$SPEECH_SCORE_ENGINE is a system that converts dramatic language into a structured, analyzable, rehearseable, and performable temporal object.** It does this by treating phrase-events, not pages, as the fundamental units; by encoding timing, recurrence, overlap, and space directly into notation; and by guaranteeing translation across script, score, audio, and live execution. fileciteturn0file0 fileciteturn0file2

The strongest next move is to formalize this again one level lower as either an **MVP product architecture** or a **full ontology and data schema**.
