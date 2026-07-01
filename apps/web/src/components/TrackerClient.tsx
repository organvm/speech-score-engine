'use client';

import type { Score, TrackerHandle } from '@/types/sse';
import { useEffect, useRef } from 'react';

// The shared engine + all score data (for the picker), loaded once from /public. The active
// score's voice pack is loaded lazily afterwards. Same files the standalone HTML uses.
const CORE_SCRIPTS = [
  '/prototypes/scores/philip-glass.js',
  '/prototypes/scores/richard-and-anne.js',
  '/prototypes/scores/earnest-duet.js',
  '/prototypes/tracker-engine.js',
];

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-sse="${src}"]`)) {
      resolve();
      return;
    }
    const el = document.createElement('script');
    el.src = src;
    el.async = false;
    el.dataset.sse = src;
    el.addEventListener('load', () => resolve());
    el.addEventListener('error', () => reject(new Error(`failed to load ${src}`)));
    document.head.appendChild(el);
  });
}

function pickId(scores: Record<string, Score>): string | undefined {
  const wanted = new URLSearchParams(window.location.search).get('score');
  if (wanted && scores[wanted]) return wanted;
  if (scores['philip-glass']) return 'philip-glass';
  return Object.keys(scores)[0];
}

export function TrackerClient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handle: TrackerHandle | null = null;
    let cancelled = false;

    const run = async () => {
      for (const src of CORE_SCRIPTS) await loadScript(src);
      const scores = window.SSE_SCORES;
      const engine = window.SSEEngine;
      const el = ref.current;
      if (cancelled || !scores || !engine || !el) return;
      const id = pickId(scores);
      if (!id) return;
      const score = scores[id];
      if (!score) return;
      await loadScript(`/prototypes/voices/${id}.js`);
      if (cancelled) return;
      const clips = window.SSE_VOICES?.[id]?.clips ?? null;
      handle = engine.mount(el, {
        score,
        clips,
        scores: Object.values(scores),
        onPick: (nextId: string) => {
          const params = new URLSearchParams(window.location.search);
          params.set('score', nextId);
          window.location.search = params.toString();
        },
      });
    };

    run().catch((err) => {
      console.error(err);
    });

    return () => {
      cancelled = true;
      if (handle) handle.destroy();
    };
  }, []);

  return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
}
