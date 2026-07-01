// Regenerate the neural voice clips for the Philip Glass speech-score prototype.
//
//   node tools/render-philip-glass-voices.mjs
//
// Source: Microsoft Edge neural TTS (edge-tts) — local, free, no API key, no GPU. One clip per
// (character, line); the four characters are four distinct neural voices. Output is a single
// self-contained asset, apps/web/public/prototypes/philip-glass-voices.js, that assigns
// window.SSE_VOICES = { clips: { "CHANNEL|text": <base64 mp3> } }. The prototype loads it via a
// <script> tag (so it works over file://) and plays the clips as humanized, panned Web Audio buffers.
//
// Requirements: python3 + node. edge-tts is installed on first run into a local venv (tools/.venv,
// gitignored). Re-running is cheap — rendered clips are cached in tools/.cache.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import vm from "node:vm";
import crypto from "node:crypto";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HTML = path.join(ROOT, "apps/web/public/prototypes/philip-glass-tracker.html");
const OUT = path.join(ROOT, "apps/web/public/prototypes/philip-glass-voices.js");
const VENV = path.join(ROOT, "tools/.venv");
const CACHE = path.join(ROOT, "tools/.cache");
const EDGE = path.join(VENV, "bin/edge-tts");
fs.mkdirSync(CACHE, { recursive: true });

// one distinct neural voice per character (+ slight prosody for flavor)
const VOICE = {
  FIRST_WOMAN: { v: "en-US-AriaNeural", rate: "+0%" },
  SECOND_WOMAN: { v: "en-GB-SoniaNeural", rate: "+4%" },
  GLASS: { v: "en-US-AndrewNeural", rate: "-8%" },
  BAKER: { v: "en-GB-RyanNeural", rate: "-2%" },
};

if (!fs.existsSync(EDGE)) {
  console.log("bootstrapping tools/.venv with edge-tts ...");
  execFileSync("python3", ["-m", "venv", VENV], { stdio: "inherit" });
  execFileSync(path.join(VENV, "bin/pip"), ["install", "--quiet", "--upgrade", "pip", "edge-tts"], {
    stdio: "inherit",
  });
}

// pull the score's (channel, text) events from the page script's pure top slice
const script = fs.readFileSync(HTML, "utf8").match(/<script>([\s\S]*?)<\/script>/)[1];
const slice = script.slice(0, script.indexOf("// ---- audio ----"));
const sb = { console };
vm.createContext(sb);
new vm.Script(`${slice}\n;__OUT=JSON.stringify(EV.map(e=>({c:e.channel,t:e.text})));`).runInContext(sb);
const pairs = [];
const seen = new Set();
for (const e of JSON.parse(sb.__OUT)) {
  const k = `${e.c}|${e.t}`;
  if (!seen.has(k)) {
    seen.add(k);
    pairs.push(e);
  }
}
console.log(`unique (character, line) clips: ${pairs.length}`);

const clips = {};
let done = 0;
for (const { c, t } of pairs) {
  const spec = VOICE[c];
  const h = crypto.createHash("sha1").update(`${c}|${t}|${spec.v}|${spec.rate}`).digest("hex").slice(0, 12);
  const mp3 = path.join(CACHE, `${h}.mp3`);
  if (!fs.existsSync(mp3)) {
    try {
      execFileSync(EDGE, ["--voice", spec.v, `--rate=${spec.rate}`, "--text", t, "--write-media", mp3], {
        stdio: ["ignore", "ignore", "pipe"],
      });
    } catch (e) {
      console.log(`FAIL ${c} "${t}": ${String(e.message).slice(0, 100)}`);
      continue;
    }
  }
  clips[`${c}|${t}`] = fs.readFileSync(mp3).toString("base64");
  done += 1;
  if (done % 10 === 0 || done === pairs.length) console.log(`  [${done}/${pairs.length}]`);
}

const header = `// GENERATED — do not edit. Neural voice clips for the Philip Glass speech-score.
// Source: Microsoft Edge neural TTS (edge-tts). One clip per (character, line); keys are
// "CHANNEL|text". The player pans + humanizes each trigger (detune, timing, gain, LFO).
// Cast: First Woman=en-US-AriaNeural, Second Woman=en-GB-SoniaNeural,
//       Glass=en-US-AndrewNeural, Baker=en-GB-RyanNeural.
// Regenerate: node tools/render-philip-glass-voices.mjs
`;
const payload = { source: "edge-tts (Microsoft neural)", format: "audio/mpeg", count: Object.keys(clips).length, clips };
fs.writeFileSync(OUT, `${header}window.SSE_VOICES = ${JSON.stringify(payload, null, 0)};\n`);
console.log(`\nWROTE ${OUT} — ${payload.count}/${pairs.length} clips, ${(fs.statSync(OUT).size / 1024).toFixed(0)} KB`);
