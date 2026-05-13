---
archive_id: "dramaturgist-tuning"
pair_id: "dt-08-005"
global_pair_index: 31
conversation_index: 8
conversation_pair_index: 5
conversation_title: "Branch · Prototype & Proof of Concept"
conversation_id: "69cb38cf-de74-8327-8275-51d20948709e"
source_shard: "conversations-019.json"
project_key: "g-p-69c6e425347c81918dfba984fb76206c"
share_anchor_url: ""
conversation_created_utc: "2026-03-31T03:00:37.461552Z"
conversation_updated_utc: "2026-03-31T03:11:49.354190Z"
generated_at_utc: "2026-05-13T16:41:36Z"
prompt_message_ids:
  - "7f4e01cb-3559-47fb-b298-4b9a2271bfe1"
response_message_ids:
  - "aafbcfec-6149-46b2-b104-951a72fc4830"
  - "54dd9095-f60a-4f0d-b43a-b2f516e17cc5"
  - "501fc6e9-f9b7-4126-989c-16db30421e82"
assistant_models:
  - "gpt-5-4-thinking"
attachment_count: 0
omitted_message_counts:
  omitted_system: 2
  omitted_total: 4
  omitted_assistant: 2
content_sha256: "5340709842afc9796ac63abe393551fd76954d37dc487b95d24f73e180f4f1c9"
cleaning: "visible user/assistant path only; system/tool/hidden/reasoning/tool-call scaffolding omitted; private citation glyphs normalized"
---


# dramaturgist-tuning - 08 Branch · Prototype & Proof of Concept -- 005 Prompt / Response

## Pair Metadata

- Pair ID: `dt-08-005`
- Source: `conversations-019.json` / `69cb38cf-de74-8327-8275-51d20948709e`
- Conversation created UTC: `2026-03-31T03:00:37.461552Z`
- Conversation updated UTC: `2026-03-31T03:11:49.354190Z`
- Prompt messages: `1`
- Response segments: `3`
- Attachments referenced: `0`
- Omitted non-dialogue messages in this span: `4`

## Prompt

Message ID: `7f4e01cb-3559-47fb-b298-4b9a2271bfe1`
Created UTC: `2026-03-31T02:46:02.509000Z`

how much audio of voice speaking is required to create a synthetic copy of recording?

## Response

##### Response Segment 1

Message ID: `aafbcfec-6149-46b2-b104-951a72fc4830`
Created UTC: `2026-03-31T02:46:03.692763Z`
Model: `gpt-5-4-thinking`

I’m checking current provider guidance rather than guessing, because the minimum usable sample length varies a lot by cloning method and quality target.

##### Response Segment 2

Message ID: `54dd9095-f60a-4f0d-b43a-b2f516e17cc5`
Created UTC: `2026-03-31T02:46:23.520571Z`
Model: `gpt-5-4-thinking`

I have enough to answer now. The current providers are all over the map: “instant similarity” clones can work from seconds, while stable long-form or premium clones usually want tens of minutes to hours.

##### Response Segment 3

Message ID: `501fc6e9-f9b7-4126-989c-16db30421e82`
Created UTC: `2026-03-31T02:46:23.520571Z`
Model: `gpt-5-4-thinking`

#### It depends on what you mean by “synthetic copy”

If you mean a **quick, recognizable voice clone**, current systems can often get something usable from **just a few seconds to a couple of minutes** of clean speech. Cartesia’s cloning docs say a high-similarity clone can use a clip of about **5 seconds**, and Resemble’s “rapid clone” is documented at **10 seconds to 3 minutes**. ElevenLabs’ instant voice cloning guidance is stricter and recommends about **1–2 minutes** of clear audio. [cite: turn879704search4turn879704search0turn194595search6turn194595search1

If you mean a **high-quality, stable, production-grade clone** that holds up across longer passages and captures more nuance, the requirement rises a lot. Resemble documents **10–25+ minutes** for professional cloning; Cartesia says its pro clone requires at least **30 minutes** and recommends about **2 hours**; ElevenLabs recommends **30–180 minutes**, with guidance pointing toward **1–3 hours** for best results. citeturn879704search0turn879704search6turn194595search0turn194595search1

#### Practical rule of thumb

For planning purposes, treat it like this: **5–30 seconds** can be enough for a rough similarity demo; **1–3 minutes** is a common target for a decent instant clone; **10–30+ minutes** is where more serious trained clones start; **30–180 minutes** is the range to expect for a near-professional or long-form voice model. citeturn879704search4turn879704search0turn194595search6turn194595search0turn879704search6]

#### What matters as much as duration

Providers repeatedly emphasize that **audio quality and consistency matter at least as much as raw runtime**. They want **one speaker only**, minimal background noise, little reverb, trimmed silence, and speech in the target style and language; otherwise the clone tends to reproduce the recording defects too. ElevenLabs says the total runtime matters more than the number of clips and recommends clear single-speaker audio; Cartesia similarly says longer clips do not necessarily improve the clone and recommends short, clean speech with limited pauses. [cite: turn194595search0turn194595search7turn879704search1

#### For your use case

For a **tracker-style play demo with dialogue clusters**, you do **not** need a perfect long-form clone. A short, recognizable clone or even a stylized synthetic proxy is enough, so **10 seconds to 2 minutes per voice** is usually the realistic minimum zone to test the idea. If you want it to sound convincingly like a specific person across a whole performance, budget **30 minutes or more**, preferably much more. citeturn879704search0turn194595search6turn194595search0]

#### One constraint worth stating plainly

If the voice is **not your own**, many platforms require permission, and some professional-clone workflows restrict creation to the speaker verifying their own voice. ElevenLabs, for example, says instant cloning requires that you have the right and consent to clone the voice, and its professional cloning flow is limited to **your own verified voice**. [cite: turn194595search6turn194595search4turn194595search3]

If you want, I can map this into a concrete capture plan like `4 voices × target sample length × recording settings × cache strategy` for your Max patch.
