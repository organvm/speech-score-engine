# Needs you — hung items

Per the L2→L5 march: anything that needs Anthony is collected here so the build never stops for it.
We tend to all of these together at the end.

## L4 — cast real, specific voices (cloning)
- **Record ~10s reference reads** — one clean ~10-second clip per voice you want cloned (you, Chris,
  anyone). Quiet room, natural delivery, one speaker. Send them (wav/m4a). I'll wire zero-shot
  cloning so a lane becomes that *actual person* and re-render the scores in those voices.
  - Until then, lanes cast from the neural catalog (Microsoft edge-tts) — no key, no input needed.
  - No API keys to hand over: edge-tts is free; cloning runs via the already-authenticated Hugging
    Face session (or a local model). Credentials are never a chat ask.

## Later — sharing beyond your machine (decision, not blocking)
- How should Chris open it without your laptop running the server?
  - **Zero-infra (works today):** send him the standalone `philip-glass-tracker.html` — it runs
    offline by double-click.
  - **Shareable URL:** host the Next app (Vercel/Firebase). Needs a hosting choice + deploy.
  - Flag when you want a public link and I'll set it up.
