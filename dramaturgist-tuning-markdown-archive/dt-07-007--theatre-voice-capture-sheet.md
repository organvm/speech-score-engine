---
archive_id: "dramaturgist-tuning"
pair_id: "dt-07-007"
global_pair_index: 25
conversation_index: 7
conversation_pair_index: 7
conversation_title: "Prototype & Proof of Concept"
conversation_id: "69caf63d-e7f0-8327-a7d7-f2b9b3b2e634"
source_shard: "conversations-019.json"
project_key: "g-p-69c6e425347c81918dfba984fb76206c"
share_anchor_url: ""
conversation_created_utc: "2026-03-30T22:16:48.860984Z"
conversation_updated_utc: "2026-03-31T03:00:17.426126Z"
generated_at_utc: "2026-05-13T16:41:36Z"
prompt_message_ids:
  - "63d2d986-4d1a-4956-8f3c-b995c1d15ce1"
response_message_ids:
  - "924336a5-bfd2-48a1-ad57-db53ee546483"
assistant_models:
  - "gpt-5-4-thinking"
attachment_count: 0
omitted_message_counts:
  omitted_system: 2
  omitted_total: 12
  omitted_assistant: 6
  omitted_tool: 4
content_sha256: "3363ae012cb5b8f02a21a4dab50151c20e9f7048a5497218d0f4b6c5251c53d7"
cleaning: "visible user/assistant path only; system/tool/hidden/reasoning/tool-call scaffolding omitted; private citation glyphs normalized"
---


# dramaturgist-tuning - 07 Prototype & Proof of Concept -- 007 Prompt / Response

## Pair Metadata

- Pair ID: `dt-07-007`
- Source: `conversations-019.json` / `69caf63d-e7f0-8327-a7d7-f2b9b3b2e634`
- Conversation created UTC: `2026-03-30T22:16:48.860984Z`
- Conversation updated UTC: `2026-03-31T03:00:17.426126Z`
- Prompt messages: `1`
- Response segments: `1`
- Attachments referenced: `0`
- Omitted non-dialogue messages in this span: `12`

## Prompt

Message ID: `63d2d986-4d1a-4956-8f3c-b995c1d15ce1`
Created UTC: `2026-03-31T02:51:19.144000Z`

turn this into a theatre-company voice capture sheet with $ACTOR_ID, $SCRIPT_ID, $TARGET_DURATION, $USAGE_SCOPE, and $VOICE_PROFILE_ID fields so you can run the recordings cleanly.

## Response

Message ID: `924336a5-bfd2-48a1-ad57-db53ee546483`
Created UTC: `2026-03-31T02:51:20.297010Z`
Model: `gpt-5-4-thinking`

### $THEATRE_COMPANY_VOICE_CAPTURE_SHEET

#### $DOCUMENT_PURPOSE

This sheet is designed to create a clean, repeatable company voice library for rehearsal, travel training, internal synthesis tests, and tracker-based dialogue playback.

The five required control fields are:

`$ACTOR_ID`
`$SCRIPT_ID`
`$TARGET_DURATION`
`$USAGE_SCOPE`
`$VOICE_PROFILE_ID`

The sheet below keeps those fixed while adding only the minimum supporting fields needed to run sessions cleanly.

---

#### 1. $CONTROL_VARS

```text
$COMPANY_ID=
$PROJECT_ID=
$SESSION_ID=
$CAPTURE_DATE=
$CAPTURE_LOCATION=
$ENGINE_TARGET=
$AUDIO_FORMAT=
$SAMPLE_RATE=
$BIT_DEPTH=
$MIC_ID=
$ROOM_ID=
$ENGINEERING_OWNER=
$ARCHIVE_ROOT=
$CONSENT_POLICY_VERSION=
```

Example:

```text
$COMPANY_ID=omni-dromenon-machina
$PROJECT_ID=speech-score-engine
$SESSION_ID=2026-03-30__company-voice-capture__A
$CAPTURE_DATE=2026-03-30
$CAPTURE_LOCATION=Hoboken-Studio-A
$ENGINE_TARGET=travel-training-clone-pack
$AUDIO_FORMAT=wav
$SAMPLE_RATE=48000
$BIT_DEPTH=24
$MIC_ID=mkh416
$ROOM_ID=booth-A
$ENGINEERING_OWNER=4444j99
$ARCHIVE_ROOT=/Volumes/$ARCHIVE_DRIVE/company-voice-library
$CONSENT_POLICY_VERSION=v1.0.0
```

---

#### 2. $USAGE_SCOPE_CONTROLLED_VOCABULARY

Use one of these exact values in `$USAGE_SCOPE` so the library remains machine-sortable and policy-clean.

| `$USAGE_SCOPE` | Meaning |
|---|---|
| `internal-training-only` | rehearsal, study, timing practice, travel use |
| `internal-demo-only` | private concept demos inside company or invited circle |
| `internal-production-dev` | internal staging, table reads, cue testing |
| `client-demo-restricted` | external demo allowed only for named project stakeholders |
| `public-release-prohibited` | may not be used in public release contexts |
| `public-release-approved` | performer has approved public synthetic usage |
| `research-only` | internal experiments only; no distribution |

For your stated use case, the default should usually be:

```text
$USAGE_SCOPE=internal-training-only
```

---

#### 3. $VOICE_PROFILE_ID_NAMING_RULE

Use a stable ID shape so voices remain portable across engines.

```text
$VOICE_PROFILE_ID=$ACTOR_ID__$STYLE_CLASS__$TIER__$REVISION
```

Example:

```text
$VOICE_PROFILE_ID=actor-001__neutral-rehearsal__travel-tier__v1
$VOICE_PROFILE_ID=actor-002__measured-stage__house-tier__v2
```

Recommended `$STYLE_CLASS` values:

| `$STYLE_CLASS` | Meaning |
|---|---|
| `neutral-rehearsal` | flat, clean, low-expression capture |
| `measured-stage` | controlled theatrical energy |
| `heightened-stage` | stronger dramatic coloration |
| `narration-clean` | evenly paced explanatory reading |
| `tracker-shortform` | short clusters and fragments for sequencer triggering |

Recommended `$TIER` values:

| `$TIER` | Meaning |
|---|---|
| `travel-tier` | short capture for rehearsal/training |
| `house-tier` | fuller company library |
| `production-tier` | highest-quality approved voice pack |

---

#### 4. $MASTER_CAPTURE_SHEET

This is the main operating table.

| `$ACTOR_ID` | `$ACTOR_NAME` | `$SCRIPT_ID` | `$SCRIPT_CLASS` | `$TARGET_DURATION` | `$ACTUAL_DURATION` | `$USAGE_SCOPE` | `$VOICE_PROFILE_ID` | `$CONSENT_STATUS` | `$TAKE_STATUS` | `$NOTES` |
|---|---|---|---|---:|---:|---|---|---|---|---|
| actor-001 |  | script-001 | neutral-rehearsal | 00:02:00 |  | internal-training-only | actor-001__neutral-rehearsal__travel-tier__v1 | approved | pending |  |
| actor-001 |  | script-002 | measured-stage | 00:02:00 |  | internal-training-only | actor-001__measured-stage__travel-tier__v1 | approved | pending |  |
| actor-001 |  | script-003 | tracker-shortform | 00:01:00 |  | internal-training-only | actor-001__tracker-shortform__travel-tier__v1 | approved | pending |  |
| actor-002 |  | script-001 | neutral-rehearsal | 00:02:00 |  | internal-training-only | actor-002__neutral-rehearsal__travel-tier__v1 | approved | pending |  |
| actor-002 |  | script-002 | measured-stage | 00:02:00 |  | internal-training-only | actor-002__measured-stage__travel-tier__v1 | approved | pending |  |
| actor-002 |  | script-003 | tracker-shortform | 00:01:00 |  | internal-training-only | actor-002__tracker-shortform__travel-tier__v1 | approved | pending |  |

#### $TAKE_STATUS_CONTROLLED_VALUES

| `$TAKE_STATUS` | Meaning |
|---|---|
| `pending` | not yet recorded |
| `recorded` | captured but not reviewed |
| `selected` | approved for library use |
| `rejected` | do not use |
| `needs-retake` | capture again |
| `processed` | cleaned and archived |
| `trained` | used to generate synthetic profile |
| `verified` | listening test passed |

---

#### 5. $SCRIPT_REGISTRY

This keeps the script pool stable and reusable.

| `$SCRIPT_ID` | `$SCRIPT_TITLE` | `$SCRIPT_CLASS` | `$TARGET_DURATION` | `$TEXT_OWNER` | `$NOTES` |
|---|---|---|---:|---|---|
| script-001 | Neutral Rehearsal Passage | neutral-rehearsal | 00:02:00 | company | plain diction, low emotion |
| script-002 | Measured Stage Passage | measured-stage | 00:02:00 | company | moderate dramatic energy |
| script-003 | Tracker Cluster Set | tracker-shortform | 00:01:00 | company | short fragments for sequencer triggers |

A clean starter pack for each actor is therefore:

`script-001` for neutral base voice
`script-002` for theatrical energy
`script-003` for cluster triggering and speech-score fragments

---

#### 6. $PER_ACTOR_INTAKE_SHEET

Use one of these per performer.

| Field | Value |
|---|---|
| `$ACTOR_ID` |  |
| `$ACTOR_NAME` |  |
| `$ROLE_OR_COMPANY_FUNCTION` |  |
| `$VOICE_PROFILE_ID` |  |
| `$USAGE_SCOPE` | internal-training-only |
| `$CONSENT_STATUS` |  |
| `$CONSENT_DATE` |  |
| `$TARGET_DURATION` | 00:05:00 |
| `$LANGUAGE_CODE` |  |
| `$ACCENT_NOTES` |  |
| `$VOCAL_LIMITATIONS` |  |
| `$CAPTURE_ENGINEER` |  |
| `$MIC_ID` |  |
| `$ROOM_ID` |  |
| `$NOTES` |  |

---

#### 7. $TAKE_LOG

This is the table to use during recording.

| `$ACTOR_ID` | `$SCRIPT_ID` | `$TAKE_ID` | `$TARGET_DURATION` | `$START_TC` | `$END_TC` | `$CLIP_FILENAME` | `$NOISE_STATUS` | `$DELIVERY_STATUS` | `$SELECTION_STATUS` | `$NOTES` |
|---|---|---|---:|---|---|---|---|---|---|---|
| actor-001 | script-001 | take-001 | 00:02:00 |  |  | actor-001__script-001__take-001.wav | clean | strong | select |  |
| actor-001 | script-002 | take-001 | 00:02:00 |  |  | actor-001__script-002__take-001.wav | clean | strong | select |  |
| actor-001 | script-003 | take-001 | 00:01:00 |  |  | actor-001__script-003__take-001.wav | clean | strong | select |  |

Use these controlled values:

| Field | Allowed values |
|---|---|
| `$NOISE_STATUS` | `clean`, `minor-noise`, `bad-noise` |
| `$DELIVERY_STATUS` | `flat`, `usable`, `strong`, `too-acted`, `inconsistent` |
| `$SELECTION_STATUS` | `select`, `hold`, `reject`, `retake` |

---

#### 8. $FILE_NAMING_STANDARD

```text
$CLIP_FILENAME=$ACTOR_ID__$SCRIPT_ID__$TAKE_ID__$CAPTURE_DATE.$AUDIO_FORMAT
```

Example:

```text
actor-001__script-003__take-001__2026-03-30.wav
```

For processed masters:

```text
$MASTER_CLIP_FILENAME=$VOICE_PROFILE_ID__master.$AUDIO_FORMAT
```

Example:

```text
actor-001__tracker-shortform__travel-tier__v1__master.wav
```

---

#### 9. $RECORDING_PROTOCOL

##### 9.1 Before capture

Confirm `$USAGE_SCOPE`, `$CONSENT_STATUS`, `$SCRIPT_ID`, and `$VOICE_PROFILE_ID` before the microphone goes live.

##### 9.2 During capture

Record each script twice if the first take is good, three times if it is unstable. Stop immediately on mouth noise, room interruption, plosive burst, or performance drift.

##### 9.3 After capture

Mark one take `select`, one take `hold`, and all others `reject` or `retake`. Do not leave status ambiguous.

---

#### 10. $RECOMMENDED_DURATION_PLAN

For your travel-training use case, this is the cleanest baseline.

| `$SCRIPT_ID` | `$SCRIPT_CLASS` | `$TARGET_DURATION` |
|---|---|---:|
| script-001 | neutral-rehearsal | 00:02:00 |
| script-002 | measured-stage | 00:02:00 |
| script-003 | tracker-shortform | 00:01:00 |

Total per actor:

```text
$TARGET_DURATION_TOTAL=00:05:00
```

That is enough for a lean internal rehearsal pack while staying easy to collect in one company session.

---

#### 11. $CSV_HEADERS

If you want to paste this directly into Sheets, Airtable, Notion, or a database import, use these headers.

##### $MASTER_CAPTURE_SHEET_HEADERS

```csv
$ACTOR_ID,$ACTOR_NAME,$SCRIPT_ID,$SCRIPT_CLASS,$TARGET_DURATION,$ACTUAL_DURATION,$USAGE_SCOPE,$VOICE_PROFILE_ID,$CONSENT_STATUS,$TAKE_STATUS,$NOTES
```

##### $SCRIPT_REGISTRY_HEADERS

```csv
$SCRIPT_ID,$SCRIPT_TITLE,$SCRIPT_CLASS,$TARGET_DURATION,$TEXT_OWNER,$NOTES
```

##### $TAKE_LOG_HEADERS

```csv
$ACTOR_ID,$SCRIPT_ID,$TAKE_ID,$TARGET_DURATION,$START_TC,$END_TC,$CLIP_FILENAME,$NOISE_STATUS,$DELIVERY_STATUS,$SELECTION_STATUS,$NOTES
```

---

#### 12. $SHORT_OPERATING_VERSION

If you want the absolute minimum sheet, use this:

| `$ACTOR_ID` | `$SCRIPT_ID` | `$TARGET_DURATION` | `$USAGE_SCOPE` | `$VOICE_PROFILE_ID` |
|---|---|---:|---|---|
| actor-001 | script-001 | 00:02:00 | internal-training-only | actor-001__neutral-rehearsal__travel-tier__v1 |
| actor-001 | script-002 | 00:02:00 | internal-training-only | actor-001__measured-stage__travel-tier__v1 |
| actor-001 | script-003 | 00:01:00 | internal-training-only | actor-001__tracker-shortform__travel-tier__v1 |

If you want, I can next turn this into a **Google Sheets-ready TSV** or a **Notion database schema**.
