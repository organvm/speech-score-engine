---
archive_id: "dramaturgist-tuning"
pair_id: "dt-08-006"
global_pair_index: 32
conversation_index: 8
conversation_pair_index: 6
conversation_title: "Branch · Prototype & Proof of Concept"
conversation_id: "69cb38cf-de74-8327-8275-51d20948709e"
source_shard: "conversations-019.json"
project_key: "g-p-69c6e425347c81918dfba984fb76206c"
share_anchor_url: ""
conversation_created_utc: "2026-03-31T03:00:37.461552Z"
conversation_updated_utc: "2026-03-31T03:11:49.354190Z"
generated_at_utc: "2026-05-13T16:41:36Z"
prompt_message_ids:
  - "46b05f81-614a-4592-9ceb-7dce2a368a84"
response_message_ids:
  - "40e2c0d7-a9d5-49b8-b4d5-5b16d1f4662f"
  - "f32ba670-bf5f-40f5-b549-2e9ac60ef8a5"
assistant_models:
  - "gpt-5-4-thinking"
attachment_count: 0
omitted_message_counts:
  omitted_system: 2
  omitted_total: 12
  omitted_assistant: 6
  omitted_tool: 4
content_sha256: "fce26566f3264daa444b9711d7a9cf7564c49adc80ccfafbbcfead9c79315b96"
cleaning: "visible user/assistant path only; system/tool/hidden/reasoning/tool-call scaffolding omitted; private citation glyphs normalized"
---


# dramaturgist-tuning - 08 Branch · Prototype & Proof of Concept -- 006 Prompt / Response

## Pair Metadata

- Pair ID: `dt-08-006`
- Source: `conversations-019.json` / `69cb38cf-de74-8327-8275-51d20948709e`
- Conversation created UTC: `2026-03-31T03:00:37.461552Z`
- Conversation updated UTC: `2026-03-31T03:11:49.354190Z`
- Prompt messages: `1`
- Response segments: `2`
- Attachments referenced: `0`
- Omitted non-dialogue messages in this span: `12`

## Prompt

Message ID: `46b05f81-614a-4592-9ceb-7dce2a368a84`
Created UTC: `2026-03-31T02:48:27.215000Z`

yes using your theatre company voices while on travel for training

## Response

##### Response Segment 1

Message ID: `40e2c0d7-a9d5-49b8-b4d5-5b16d1f4662f`
Created UTC: `2026-03-31T02:48:28.367542Z`
Model: `gpt-5-4-thinking`

I’m checking the current cloning-policy language and recommended sample lengths so I can give you a usable capture plan rather than a hand-wave.

##### Response Segment 2

Message ID: `f32ba670-bf5f-40f5-b549-2e9ac60ef8a5`
Created UTC: `2026-03-31T02:49:01.780975Z`
Model: `gpt-5-4-thinking`

Yes. For **internal rehearsal or training while traveling**, that is a sensible use case — but structure it as a **company voice library with explicit performer permission**, not as ad hoc scraping of old recordings.

#### The practical constraint

The main operational issue is that **provider rules differ**. ElevenLabs’ instant cloning flow requires you to confirm you have the **right and consent** to clone the voice, while ElevenLabs’ **professional** cloning is limited to **your own verified voice** and recommends much longer training audio. That means a theatre company can use instant-style internal clones more easily than “professional” clones on that platform, but not every provider treats third-party company voices the same way. [cite: turn632349search0turn632349search5turn632349search4]

#### The capture target I would use

For your use case, I would split the voice bank into two quality tiers.

For a **travel/training tier**, capture about **1–3 minutes of clean speech per performer**. That is enough to land in the workable range for current “instant” workflows: ElevenLabs recommends roughly **1–2 minutes** of clear audio for instant cloning, Resemble documents **10 seconds** for rapid clone, and Cartesia’s clone endpoint says a high-similarity clone can use about **5 seconds**, with its broader best-practices page recommending clips around **10 seconds**. [cite: turn632349search0turn496678search3turn632349search6turn632349search8]

For a **durable house-library tier**, I would capture **10–30 minutes per performer at minimum**, and preferably more if you want stronger long-form stability. That recommendation is an inference from current provider guidance: Resemble’s professional clone flow calls for **20+ recordings totaling at least 10 minutes**, while ElevenLabs’ professional guidance recommends **30 minutes bare minimum**, with **1–3 hours** preferred for best results. [cite: turn496678search3turn496678search0turn632349search4]

#### The recording spec

What matters almost as much as runtime is **cleanliness and consistency**. The docs are very consistent on this point: use **one speaker only**, keep the room quiet, avoid reverb, avoid long silences, and keep the delivery style reasonably consistent because the model will imitate the speaking style, pacing, and artifacts it hears. ElevenLabs and Cartesia both explicitly say noise, pauses, and performance style will be reflected in the clone. [cite: turn632349search0turn496678search0turn632349search8]

So for each actor, I would record one neutral rehearsal script, one expressive script closer to their stage energy, and one short “control” script with the exact diction you care about for the piece. Then I would keep only the cleanest takes and trim them tightly.

#### The best company workflow

For your theatre-company case, the cleanest model is this:

Record the performers **once**, in a quiet controlled setting. Store the clips in an internal archive. Generate a **travel pack** of approved voice clones for rehearsal and demo use only. Then travel with the voice pack and your tracker patch, rather than trying to clone people on the road from inconsistent phone audio.

That gives you much more stable results, because instant-clone systems can work from short audio, but they still inherit the defects of the source recording. [cite: turn632349search8turn496678search0]

#### My recommendation

For your specific use case, I would set the target at **about 2 minutes per actor for the first pass**, because that sits comfortably inside current instant-clone guidance and is still easy to collect from a company. Then, for any actor whose voice becomes central to the system, I would upgrade that actor later to a **10–30+ minute house dataset**. That is the most efficient path.

If you want, I can turn this into a **theatre-company voice capture sheet** with `$ACTOR_ID`, `$SCRIPT_ID`, `$TARGET_DURATION`, `$USAGE_SCOPE`, and `$VOICE_PROFILE_ID` fields so you can run the recordings cleanly.
