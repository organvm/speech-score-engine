// Speech-Score tracker — the shared engine core for BOTH surfaces.
//
// It is a CLASSIC script (no ES imports, no fetch) so it runs over file:// (the standalone HTML)
// AND over http (the Next route injects this same file). It exposes:
//
//   window.SSEEngine.mount(rootEl, { score, clips, scores, onPick }) -> { destroy }
//
// The engine builds the entire widget inside rootEl (title, lanes, playhead, transport) from the
// SCORE data — any number of lanes, any casting. Audio, best-first: pre-rendered neural clips
// (polyphonic + zero-latency, humanized + panned) -> Web Speech -> Web Audio tones. Human lanes
// (performer:'human') are left silent for a live actor. Styles live in tracker.css (scope .sse).
(() => {
  const TEMPLATE = [
    '<div class="title">',
    '  <div class="mark">Speech-Score Engine</div>',
    '  <h1 class="t-title"></h1>',
    '  <div class="by t-byline"></div>',
    '</div>',
    '<div class="heads t-heads"></div>',
    '<div class="viewport t-viewport"><div class="track t-track"></div></div>',
    '<div class="caption t-caption"></div>',
    '<div class="transport">',
    '  <div class="trow"><div class="seg t-scores"></div></div>',
    '  <div class="tempo"><label>Tempo</label>',
    '    <input class="t-tempo" type="range" min="1" max="9" step="0.5" /></div>',
    '  <div class="trow">',
    '    <button class="btn primary t-play">▷ Perform</button>',
    '    <button class="btn t-restart">↺ Restart</button>',
    '    <div class="seg t-sound">',
    '      <button data-m="voice" class="on">Voices</button>',
    '      <button data-m="tone">Tones</button>',
    '      <button data-m="off">Silent</button>',
    '    </div>',
    '  </div>',
    '  <div class="trow"><div class="seg t-sections"></div></div>',
    '</div>',
  ].join('\n');

  function mount(root, opts) {
    const SC = opts.score;
    const CLIPS = opts.clips || null;
    const ALL = opts.scores || [SC];
    const onPick =
      opts.onPick ||
      ((id) => {
        const p = new URLSearchParams(location.search);
        p.set('score', id);
        location.search = p.toString();
      });

    root.classList.add('sse');
    root.innerHTML = TEMPLATE;
    const q = (sel) => root.querySelector(sel);

    // ---- derive everything from the score ----
    const LANES = SC.lanes;
    const CH = LANES.map((l) => l.id);
    const HEAD = {};
    const laneById = new Map(LANES.map((l) => [l.id, l]));
    const isHuman = (lane) => laneById.get(lane)?.performer === 'human';
    const TONES = {};
    const CHVOX = {};
    const VOX = {};
    for (const l of LANES) {
      HEAD[l.id] = l.name || l.id;
      TONES[l.id] = { f: l.tone?.f || 440, t: l.tone?.type || 'sine' };
      CHVOX[l.id] = {
        pan: typeof l.pan === 'number' ? l.pan : 0,
        rate: 1.0,
        gain: typeof l.gain === 'number' ? l.gain : 1.0,
      };
      VOX[l.id] = l.speech || { pitch: 1.0, rate: 1.0, prefer: [] };
    }
    const EV = SC.events;
    const SECTIONS = SC.sections || {};
    const TOTAL = SC.total;
    const rand = (a, b) => a + Math.random() * (b - a);

    root.style.setProperty('--lanes', `repeat(${CH.length}, minmax(0, 1fr))`);
    q('.t-title').textContent = SC.title;
    q('.t-byline').textContent = SC.byline || '';
    q('.t-caption').textContent = SC.caption || '';

    const eventsByRow = new Map();
    for (const ev of EV) {
      if (!eventsByRow.has(ev.row)) eventsByRow.set(ev.row, []);
      eventsByRow.get(ev.row).push(ev);
    }

    // ---- audio ----
    let silent = false;
    let soundMode = 'voice';
    let rps = SC.tempo || 3;

    // -- source A: Web Speech API (fallback when no neural clips are present) --
    const synth = window.speechSynthesis || null;
    const VOICE_ASSIGN = {};
    const loadVoices = () => {
      if (!synth) return;
      const all = synth.getVoices() || [];
      if (!all.length) return;
      const en = all.filter((v) => /en(-|_|$)/i.test(v.lang));
      const pool = en.length ? en : all;
      const used = new Set();
      for (const ch of CH) {
        if (isHuman(ch)) continue;
        let pick = null;
        for (const h of VOX[ch].prefer || []) {
          pick = pool.find((v) => !used.has(v.name) && v.name.toLowerCase().includes(h));
          if (pick) break;
        }
        if (!pick) pick = pool.find((v) => !used.has(v.name)) || pool[0];
        if (pick) {
          VOICE_ASSIGN[ch] = pick;
          used.add(pick.name);
        }
      }
    };
    if (synth) {
      loadVoices();
      synth.addEventListener('voiceschanged', loadVoices);
    }
    const speak = (events) => {
      if (!synth) return false;
      const seen = new Map();
      for (const ev of events) if (!seen.has(ev.text)) seen.set(ev.text, ev.lane);
      synth.resume();
      if (synth.pending) synth.cancel();
      for (const [text, ch] of seen) {
        const u = new SpeechSynthesisUtterance(text);
        const v = VOICE_ASSIGN[ch];
        if (v) u.voice = v;
        const spec = VOX[ch];
        u.pitch = spec.pitch;
        u.rate = Math.min(2.2, spec.rate * Math.max(1, rps / 3));
        u.volume = 1;
        synth.speak(u);
      }
      return true;
    };

    // -- source B: Web Audio tone stack (final fallback) --
    let ctx = null;
    let master = null;
    const ensureCtx = () => {
      if (ctx) return true;
      try {
        const C = window.AudioContext || window.webkitAudioContext;
        if (!C) return false;
        ctx = new C();
        master = ctx.createGain();
        master.gain.value = 0.9;
        master.connect(ctx.destination);
        return true;
      } catch (err) {
        ctx = null;
        return false;
      }
    };
    const tone = (channel, when) => {
      if (!ctx || !master) return;
      const spec = TONES[channel];
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = spec.t;
      osc.frequency.setValueAtTime(spec.f, when);
      env.gain.setValueAtTime(0.0001, when);
      env.gain.exponentialRampToValueAtTime(0.2, when + 0.015);
      env.gain.exponentialRampToValueAtTime(0.0001, when + 0.34);
      osc.connect(env);
      env.connect(master);
      osc.start(when);
      osc.stop(when + 0.4);
      osc.onended = () => {
        osc.disconnect();
        env.disconnect();
      };
    };

    // -- source 0: pre-rendered neural clips as Web Audio buffers --
    const SAMP = { buf: new Map(), ready: false, loading: false };
    const b64ToBuf = (b64) => {
      const bin = atob(b64);
      const u8 = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i += 1) u8[i] = bin.charCodeAt(i);
      return u8.buffer;
    };
    // Seconds of leading near-silence to skip so a trigger speaks immediately (no pre-roll lag).
    const leadOffset = (buffer) => {
      const d = buffer.getChannelData(0);
      const thresh = 0.012;
      let i = 0;
      for (; i < d.length; i += 1) if (Math.abs(d[i]) > thresh) break;
      const off = i / buffer.sampleRate - 0.02;
      return off > 0 ? off : 0;
    };
    const loadSamples = async () => {
      if (SAMP.ready || SAMP.loading) return SAMP.ready;
      if (!CLIPS || !ensureCtx() || !ctx) return false;
      SAMP.loading = true;
      await Promise.all(
        Object.entries(CLIPS).map(async ([key, b64]) => {
          try {
            const buffer = await ctx.decodeAudioData(b64ToBuf(b64));
            SAMP.buf.set(key, { buffer, offset: leadOffset(buffer) });
          } catch (err) {
            /* skip an undecodable clip */
          }
        }),
      );
      SAMP.ready = SAMP.buf.size > 0;
      SAMP.loading = false;
      return SAMP.ready;
    };
    // Play one line on one lane: that character's own neural clip, humanized + panned.
    const playSample = (channel, text, when) => {
      const clip = SAMP.buf.get(`${channel}|${text}`) || SAMP.buf.get(text);
      if (!clip || !ctx || !master) return false;
      const spec = CHVOX[channel] || { pan: 0, rate: 1, gain: 1 };
      const src = ctx.createBufferSource();
      src.buffer = clip.buffer;
      src.playbackRate.value = spec.rate * rand(0.997, 1.003);
      if (src.detune) src.detune.value = rand(-8, 8);
      const g = ctx.createGain();
      g.gain.value = spec.gain * rand(0.88, 1.0);
      // subtle pitch LFO — the "low-frequency oscillation"; kept small so speech stays natural
      let lfo = null;
      let lfoGain = null;
      if (src.detune) {
        lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = rand(4.5, 6.5);
        lfoGain = ctx.createGain();
        lfoGain.gain.value = rand(1.5, 4);
        lfo.connect(lfoGain).connect(src.detune);
      }
      const cleanup = (nodes) => () => {
        for (const n of nodes) n.disconnect();
        if (lfo) lfo.stop();
      };
      src.connect(g);
      let tail = [src, g];
      if (ctx.createStereoPanner) {
        const p = ctx.createStereoPanner();
        p.pan.value = spec.pan;
        g.connect(p);
        p.connect(master);
        tail = [src, g, p];
      } else {
        g.connect(master);
      }
      if (lfoGain) tail = tail.concat([lfoGain]);
      const t = Math.max(when, ctx.currentTime);
      src.onended = cleanup(tail);
      src.start(t, clip.offset || 0);
      if (lfo) lfo.start(t);
      return true;
    };

    const voice = (events) => {
      if (silent || !events || !events.length) return;
      const audible = events.filter((ev) => !isHuman(ev.lane));
      if (!audible.length) return;
      if (soundMode === 'voice') {
        if (CLIPS) {
          if (SAMP.ready) {
            const base = ctx.currentTime + 0.015;
            let any = false;
            for (const ev of audible) {
              if (playSample(ev.lane, ev.text, base + rand(0, 0.028))) any = true;
            }
            if (any) return;
          } else {
            loadSamples();
            return;
          }
        } else if (synth && speak(audible)) {
          return;
        }
      }
      if (!ensureCtx() || !ctx) return;
      const now = ctx.currentTime;
      for (const ev of audible) tone(ev.lane, now);
    };

    // ---- build view ----
    const track = q('.t-track');
    const viewport = q('.t-viewport');
    const heads = q('.t-heads');
    const cellRef = new Map();

    const gh = document.createElement('div');
    gh.className = 'h gut';
    heads.appendChild(gh);
    for (const c of CH) {
      const el = document.createElement('div');
      el.className = `h${isHuman(c) ? ' live' : ''}`;
      el.textContent = HEAD[c];
      heads.appendChild(el);
    }

    const rowEls = [];
    for (let r = 0; r < TOTAL; r += 1) {
      const row = document.createElement('div');
      row.className = 'row';
      row.style.position = 'relative';
      const num = document.createElement('div');
      num.className = 'rownum';
      num.textContent = r % 4 === 0 ? String(r).padStart(2, '0') : '';
      row.appendChild(num);
      for (const c of CH) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cellRef.set(`${r}:${c}`, cell);
        row.appendChild(cell);
      }
      track.appendChild(row);
      rowEls.push(row);
    }
    for (const ev of EV) {
      const cell = cellRef.get(`${ev.row}:${ev.lane}`);
      if (!cell) continue;
      const span = document.createElement('span');
      span.className = `word${ev.stage ? ' stage' : ''}${isHuman(ev.lane) ? ' live' : ''}`;
      span.textContent = ev.text;
      cell.appendChild(span);
      ev.el = span;
    }

    // ---- score picker + section chips ----
    const scoresSeg = q('.t-scores');
    for (const s of ALL) {
      const b = document.createElement('button');
      b.dataset.score = s.id;
      b.textContent = s.short || s.title;
      if (s.id === SC.id) b.classList.add('on');
      scoresSeg.appendChild(b);
    }
    const onScorePick = (e) => {
      const b = e.target.closest('button');
      if (!b || b.dataset.score === SC.id) return;
      onPick(b.dataset.score);
    };
    scoresSeg.addEventListener('click', onScorePick);

    const sections = q('.t-sections');
    for (const key of Object.keys(SECTIONS)) {
      const b = document.createElement('button');
      b.dataset.s = key;
      b.textContent = key.charAt(0).toUpperCase() + key.slice(1);
      sections.appendChild(b);
    }
    const wholeBtn = document.createElement('button');
    wholeBtn.dataset.s = 'full';
    wholeBtn.textContent = 'Whole';
    wholeBtn.classList.add('on');
    sections.appendChild(wholeBtn);

    // ---- state + transport ----
    let playing = false;
    let currentRow = 0;
    let sel = 'full';
    let rafId = null;
    let lastTs = 0;
    let acc = 0;
    let rowH = 26;
    let visibleRows = 24;
    let hereEl = null;
    let nowWords = [];

    const measure = () => {
      rowH = rowEls[0] ? rowEls[0].offsetHeight : 26;
      visibleRows = Math.max(8, Math.floor(viewport.clientHeight / rowH));
    };
    const range = () => (sel === 'full' ? [0, TOTAL - 1] : SECTIONS[sel]);
    const clearPerformed = () => {
      for (const ev of EV) {
        if (ev.el) ev.el.classList.remove('spoken', 'now');
      }
      nowWords = [];
    };
    const renderRow = (row) => {
      if (hereEl) hereEl.classList.remove('here');
      const el = rowEls[row];
      el.classList.add('here');
      hereEl = el;
      const lead = Math.floor(visibleRows * 0.4);
      const maxOff = Math.max(0, track.scrollHeight - viewport.clientHeight);
      const off = Math.min(Math.max(0, (row - lead) * rowH), maxOff);
      track.style.transform = `translateY(${-off}px)`;
    };
    const illuminate = (row) => {
      for (const w of nowWords) w.classList.remove('now');
      nowWords = [];
      const evs = eventsByRow.get(row);
      if (!evs) return;
      for (const ev of evs) {
        if (!ev.el) continue;
        ev.el.classList.add('spoken');
        void ev.el.offsetWidth;
        ev.el.classList.add('now');
        nowWords.push(ev.el);
      }
    };
    const advance = (row) => {
      currentRow = row;
      renderRow(row);
      illuminate(row);
      const evs = eventsByRow.get(row);
      if (evs) voice(evs);
    };

    const loop = (ts) => {
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      acc += dt * rps;
      const [s, e] = range();
      let guard = 0;
      while (acc >= 1 && guard < 8) {
        acc -= 1;
        if (currentRow >= e) {
          clearPerformed();
          advance(s);
        } else {
          advance(currentRow + 1);
        }
        guard += 1;
      }
      rafId = requestAnimationFrame(loop);
    };
    const play = () => {
      if (playing) return;
      if (!silent) {
        ensureCtx();
        if (ctx && ctx.state === 'suspended') ctx.resume();
        if (soundMode === 'voice') {
          if (CLIPS) loadSamples();
          else if (synth) {
            loadVoices();
            synth.resume();
          }
        }
      }
      const [s, e] = range();
      if (currentRow < s || currentRow >= e) {
        clearPerformed();
        advance(s);
      }
      playing = true;
      playBtn.classList.add('on');
      playBtn.textContent = '❚❚ Pause';
      lastTs = performance.now();
      acc = 0;
      rafId = requestAnimationFrame(loop);
    };
    const pause = () => {
      playing = false;
      playBtn.classList.remove('on');
      playBtn.textContent = '▷ Perform';
      if (synth) synth.cancel();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const playBtn = q('.t-play');
    const restartBtn = q('.t-restart');
    const soundSeg = q('.t-sound');
    const tempo = q('.t-tempo');

    tempo.value = String(rps);
    const onPlay = () => (playing ? pause() : play());
    const onRestart = () => {
      const [s] = range();
      acc = 0;
      clearPerformed();
      advance(s);
    };
    const onSound = (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const m = b.dataset.m;
      for (const btn of soundSeg.children) btn.classList.toggle('on', btn === b);
      if (m === 'off') {
        silent = true;
        if (synth) synth.cancel();
        if (ctx && ctx.state === 'running') ctx.suspend();
        return;
      }
      silent = false;
      soundMode = m;
      ensureCtx();
      if (ctx && ctx.state === 'suspended') ctx.resume();
      if (m === 'voice') {
        if (CLIPS) loadSamples();
        else if (synth) {
          loadVoices();
          synth.resume();
        }
      }
    };
    const onTempo = () => {
      rps = Number.parseFloat(tempo.value);
    };
    const onSections = (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      sel = b.dataset.s;
      for (const btn of sections.children) btn.classList.toggle('on', btn === b);
      const [s] = range();
      acc = 0;
      clearPerformed();
      advance(s);
    };
    const onResize = () => {
      measure();
      renderRow(currentRow);
    };

    playBtn.addEventListener('click', onPlay);
    restartBtn.addEventListener('click', onRestart);
    soundSeg.addEventListener('click', onSound);
    tempo.addEventListener('input', onTempo);
    sections.addEventListener('click', onSections);
    window.addEventListener('resize', onResize);

    measure();
    advance(0);

    return {
      destroy: () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        window.removeEventListener('resize', onResize);
        if (synth) {
          synth.cancel();
          synth.removeEventListener('voiceschanged', loadVoices);
        }
        if (ctx && ctx.state !== 'closed') ctx.close();
        root.innerHTML = '';
        root.classList.remove('sse');
      },
    };
  }

  window.SSEEngine = { mount };
})();
