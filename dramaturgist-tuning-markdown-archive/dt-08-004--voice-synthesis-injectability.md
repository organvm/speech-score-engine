---
archive_id: "dramaturgist-tuning"
pair_id: "dt-08-004"
global_pair_index: 30
conversation_index: 8
conversation_pair_index: 4
conversation_title: "Branch · Prototype & Proof of Concept"
conversation_id: "69cb38cf-de74-8327-8275-51d20948709e"
source_shard: "conversations-019.json"
project_key: "g-p-69c6e425347c81918dfba984fb76206c"
share_anchor_url: ""
conversation_created_utc: "2026-03-31T03:00:37.461552Z"
conversation_updated_utc: "2026-03-31T03:11:49.354190Z"
generated_at_utc: "2026-05-13T16:41:36Z"
prompt_message_ids:
  - "b15365da-03db-4b14-b9a8-8ce59eb8366a"
response_message_ids:
  - "dbeaf755-a258-4ae0-8b9a-7cbef1a3b448"
assistant_models:
  - "gpt-5-4-thinking"
attachment_count: 0
omitted_message_counts:
  omitted_system: 2
  omitted_total: 8
  omitted_assistant: 4
  omitted_tool: 2
content_sha256: "d079ec4c1cf9671cb674a1832fb8eb2e6247a1daa817fbd67114468cb420221c"
cleaning: "visible user/assistant path only; system/tool/hidden/reasoning/tool-call scaffolding omitted; private citation glyphs normalized"
---


# dramaturgist-tuning - 08 Branch · Prototype & Proof of Concept -- 004 Prompt / Response

## Pair Metadata

- Pair ID: `dt-08-004`
- Source: `conversations-019.json` / `69cb38cf-de74-8327-8275-51d20948709e`
- Conversation created UTC: `2026-03-31T03:00:37.461552Z`
- Conversation updated UTC: `2026-03-31T03:11:49.354190Z`
- Prompt messages: `1`
- Response segments: `1`
- Attachments referenced: `0`
- Omitted non-dialogue messages in this span: `8`

## Prompt

Message ID: `b15365da-03db-4b14-b9a8-8ce59eb8366a`
Created UTC: `2026-03-31T02:44:45.079000Z`

voice synthesis is injectable?

## Response

Message ID: `dbeaf755-a258-4ae0-8b9a-7cbef1a3b448`
Created UTC: `2026-03-31T02:44:52.078691Z`
Model: `gpt-5-4-thinking`

#### Yes

Voice synthesis should be treated as **injectable infrastructure**, not baked into the score model.

The tracker patch should emit a normalized speech event, and then a separate voice layer should decide how that event becomes sound. That keeps the piece portable and lets you swap between pre-rendered samples, OS speech, local synthesis, or remote TTS without changing the score itself.

In your case, the clean separation is:

`$PHRASE_EVENT -> $VOICE_RENDER_ADAPTER -> audio output`

So the tracker only knows things like `$VOICE_CHANNEL`, `$TEXT`, `$ROW`, `$PAUSE_AFTER_MS`, `$RATE`, `$PAN`, `$REPEAT`. It should **not** know whether the sound came from Apple speech, ElevenLabs, a local model, prerecorded WAVs, or anything else.

#### In Max terms

Yes, you can inject voice synthesis into the patch in at least three practical ways.

First, the safest route is `$VOICE_PROVIDER_MODE=sample_cache`. The patch triggers pre-rendered phrase files from `$VOICE_CACHE_DIR`. This is best for the demo because timing is stable and there is no network delay.

Second, you can use `$VOICE_PROVIDER_MODE=live_tts`. The patch sends text to a synthesis adapter through Node for Max, `js`, OSC, or HTTP, and receives audio back. This is more flexible but less stable in a live demo.

Third, you can use `$VOICE_PROVIDER_MODE=hybrid`. If a phrase exists in cache, play it immediately. If not, request synthesis, write the result into `$VOICE_CACHE_DIR`, and use the cached version on the next pass. That is usually the smartest architecture.

#### What “injectable” should mean structurally

It should mean that the same score can run against multiple backends by changing environment variables, not by rewriting the patch.

For example:

`$VOICE_PROVIDER_MODE=sample_cache`
`$TTS_PROVIDER_URI=http://127.0.0.1:8787/render`
`$VOICE_CACHE_DIR=/Users/you/audio-cache/speech-score`
`$DEFAULT_VOICE_PROFILE_ID=glass-neutral-01`
`$FALLBACK_VOICE_PROFILE_ID=narrator-flat-01`

Then each lane or `$VOICE_CHANNEL` can also carry its own voice assignment:

`$VOICE_CHANNEL_01_PROFILE=first-woman-bright-01`
`$VOICE_CHANNEL_02_PROFILE=second-woman-dry-01`
`$VOICE_CHANNEL_03_PROFILE=glass-measured-01`
`$VOICE_CHANNEL_04_PROFILE=baker-warm-01`

That is the right meaning of injectable here: the patch stays the same; the rendering backend changes.

#### For your friend-demo

Use injection, but do it conservatively.

For the first proof, I would not rely on real-time cloud speech. I would inject the voice layer as a **cached renderer**. The tracker fires cluster events; the adapter resolves them to pre-rendered files. That will feel instantaneous and musical.

Then, once the demo works, you can swap `$VOICE_PROVIDER_MODE` to live synthesis and test dynamic text generation later.

#### The best internal contract

Make every tracker cell resolve to something like this:

```json
{
  "phrase_id": "glass_024",
  "voice_channel": "GLASS",
  "text": "Yes. I need a loaf of bread.",
  "voice_profile_id": "glass-measured-01",
  "start_row": 24,
  "pause_after_ms": 160,
  "repeat": 1,
  "pan": 0.15,
  "render_mode": "cache_preferred"
}
```

Then the adapter does the rest.

That is the key move. The score remains a score. Voice synthesis becomes a pluggable render service.

#### Bottom line

Yes. It should be injectable.

For your Max prototype, that means: **do not hardwire the synthesis engine into the tracker logic**. Hardwire only the event schema and the timing. Inject the voice backend through `$VOICE_PROVIDER_MODE`, `$TTS_PROVIDER_URI`, `$VOICE_CACHE_DIR`, and per-channel `$VOICE_PROFILE_ID`s.

For the demo you described, cached phrase rendering is the most reliable version of that idea.
