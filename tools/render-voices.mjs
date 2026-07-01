// Regenerate neural voice clips for every score in the speech-score engine.
//
//   node tools/render-voices.mjs
//
// Source: Microsoft Edge neural TTS (edge-tts) — local, free, no API key, no GPU. Reads every
// score data file in apps/web/public/prototypes/scores/, and for each AI lane renders one clip per
// (lane, line) in that lane's assigned neural `voice`. Human lanes (performer:'human') are skipped —
// a live actor speaks those. Writes one self-contained asset per score,
// apps/web/public/prototypes/voices/<score-id>.js, assigning
// window.SSE_VOICES[<score-id>] = { clips: { "LANE|text": <base64 mp3> } }. The engine loads these
// via <script> tags (so it works over file://) and plays them as humanized, panned Web Audio buffers.
//
// Requirements: python3 + node. edge-tts is installed on first run into tools/.venv (gitignored).
// Re-running is cheap — rendered clips are cached in tools/.cache.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import crypto from 'node:crypto';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCORES_DIR = path.join(ROOT, 'apps/web/public/prototypes/scores');
const VOICES_DIR = path.join(ROOT, 'apps/web/public/prototypes/voices');
const VENV = path.join(ROOT, 'tools/.venv');
const CACHE = path.join(ROOT, 'tools/.cache');
const EDGE = path.join(VENV, 'bin/edge-tts');
fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(VOICES_DIR, { recursive: true });

if (!fs.existsSync(EDGE)) {
  console.log('bootstrapping tools/.venv with edge-tts ...');
  execFileSync('python3', ['-m', 'venv', VENV], { stdio: 'inherit' });
  execFileSync(path.join(VENV, 'bin/pip'), ['install', '--quiet', '--upgrade', 'pip', 'edge-tts'], {
    stdio: 'inherit',
  });
}

// Load every score by evaluating its data file in a sandbox that stands in for the browser window.
const sandbox = {};
vm.createContext(sandbox);
for (const file of fs.readdirSync(SCORES_DIR).filter((f) => f.endsWith('.js')).sort()) {
  const src = fs.readFileSync(path.join(SCORES_DIR, file), 'utf8');
  new vm.Script(src, { filename: file }).runInContext(sandbox);
}
const scores = sandbox.SSE_SCORES || {};
console.log(`scores: ${Object.keys(scores).join(', ')}`);

const render = (voice, rate, text) => {
  const h = crypto.createHash('sha1').update(`${voice}|${rate}|${text}`).digest('hex').slice(0, 12);
  const mp3 = path.join(CACHE, `${h}.mp3`);
  if (!fs.existsSync(mp3)) {
    execFileSync(EDGE, ['--voice', voice, `--rate=${rate}`, '--text', text, '--write-media', mp3], {
      stdio: ['ignore', 'ignore', 'pipe'],
    });
  }
  return fs.readFileSync(mp3).toString('base64');
};

for (const score of Object.values(scores)) {
  const laneById = new Map(score.lanes.map((l) => [l.id, l]));
  const clips = {};
  const seen = new Set();
  let done = 0;
  const aiEvents = score.events.filter((e) => (laneById.get(e.lane) || {}).performer !== 'human');
  for (const ev of aiEvents) {
    const key = `${ev.lane}|${ev.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const lane = laneById.get(ev.lane);
    if (!lane || !lane.voice) continue;
    try {
      clips[key] = render(lane.voice, lane.rate || '+0%', ev.text);
      done += 1;
    } catch (e) {
      console.log(`FAIL ${score.id} ${key}: ${String(e.message).slice(0, 90)}`);
    }
  }
  const payload = {
    source: 'edge-tts (Microsoft neural)',
    format: 'audio/mpeg',
    count: Object.keys(clips).length,
    clips,
  };
  const header = `// GENERATED — do not edit. Neural voice clips for score "${score.id}".
// Source: Microsoft Edge neural TTS (edge-tts). Keys are "LANE|text"; the engine pans + humanizes
// each trigger (detune, timing, gain, LFO). Regenerate: node tools/render-voices.mjs
`;
  const body = `(function () {
  var root = typeof window !== 'undefined' ? window : globalThis;
  root.SSE_VOICES = root.SSE_VOICES || {};
  root.SSE_VOICES[${JSON.stringify(score.id)}] = ${JSON.stringify(payload)};
})();
`;
  const out = path.join(VOICES_DIR, `${score.id}.js`);
  fs.writeFileSync(out, header + body);
  console.log(
    `WROTE ${path.relative(ROOT, out)} — ${payload.count} clips, ${(fs.statSync(out).size / 1024).toFixed(0)} KB (${done} rendered)`,
  );
}
