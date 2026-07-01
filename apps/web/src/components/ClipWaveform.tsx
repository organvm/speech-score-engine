'use client';

import { useEffect, useRef, useState } from 'react';

// A live waveform preview for L6 audio craft. Decodes a clip's base64 mp3 to peaks once, then paints
// the trim window (out-of-range dimmed), the gain scaling (bar height), and the fade ramps (a line
// from 0→gain over fadeIn and gain→0 over fadeOut) — so the numeric controls read as a shaped clip.

let sharedCtx: AudioContext | null = null;
function audioCtx(): AudioContext | null {
  if (sharedCtx) return sharedCtx;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  sharedCtx = new Ctor();
  return sharedCtx;
}

interface Props {
  base64: string | null;
  gain: number;
  fadeIn: number;
  fadeOut: number;
  trimStart: number;
  trimEnd: number;
  onDuration?: (seconds: number) => void;
}

const W = 480;
const H = 76;
const N = 240;

export function ClipWaveform(props: Props) {
  const { base64, gain, fadeIn, fadeOut, trimStart, trimEnd, onDuration } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [peaks, setPeaks] = useState<number[] | null>(null);
  const [duration, setDuration] = useState(0);

  // Decode → peaks whenever the clip changes.
  useEffect(() => {
    let cancelled = false;
    if (!base64) {
      setPeaks(null);
      setDuration(0);
      return;
    }
    const ac = audioCtx();
    if (!ac) return;
    const bin = atob(base64);
    const u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) u8[i] = bin.charCodeAt(i);
    ac.decodeAudioData(u8.buffer)
      .then((buf) => {
        if (cancelled) return;
        const data = buf.getChannelData(0);
        const block = Math.max(1, Math.floor(data.length / N));
        const p: number[] = [];
        for (let i = 0; i < N; i += 1) {
          let mx = 0;
          for (let j = 0; j < block; j += 1) {
            const v = Math.abs(data[i * block + j] ?? 0);
            if (v > mx) mx = v;
          }
          p.push(mx);
        }
        setPeaks(p);
        setDuration(buf.duration);
        onDuration?.(buf.duration);
      })
      .catch(() => {
        if (!cancelled) setPeaks(null);
      });
    return () => {
      cancelled = true;
    };
  }, [base64, onDuration]);

  // Paint whenever peaks or any shaping param change.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g2 = canvas.getContext('2d');
    if (!g2) return;
    g2.clearRect(0, 0, W, H);
    if (!peaks || duration <= 0) return;
    const mid = H / 2;
    const t0 = Math.min(trimStart, duration);
    const t1 = Math.max(t0, duration - trimEnd);
    const xOf = (t: number) => (t / duration) * W;
    const inStart = xOf(t0);
    const inEnd = xOf(t1);

    // bars
    for (let i = 0; i < peaks.length; i += 1) {
      const x = (i / peaks.length) * W;
      const inWindow = x >= inStart && x <= inEnd;
      const h = Math.max(1, (peaks[i] ?? 0) * gain * (H * 0.46));
      g2.fillStyle = inWindow ? 'rgba(205,191,154,0.85)' : 'rgba(205,191,154,0.16)';
      g2.fillRect(x, mid - h, Math.max(1, W / peaks.length - 0.5), h * 2);
    }
    // trim boundaries
    g2.strokeStyle = 'rgba(205,191,154,0.6)';
    g2.lineWidth = 1;
    for (const x of [inStart, inEnd]) {
      g2.beginPath();
      g2.moveTo(x, 0);
      g2.lineTo(x, H);
      g2.stroke();
    }
    // fade ramps across the trimmed window
    const winW = Math.max(1, t1 - t0);
    const fInX = xOf(t0 + Math.min(fadeIn, winW / 2));
    const fOutX = xOf(t1 - Math.min(fadeOut, winW / 2));
    g2.strokeStyle = 'rgba(233,230,220,0.7)';
    g2.beginPath();
    g2.moveTo(inStart, H - 2);
    if (fadeIn > 0) g2.lineTo(fInX, 2);
    else g2.lineTo(inStart, 2);
    g2.lineTo(fOutX, 2);
    if (fadeOut > 0) g2.lineTo(inEnd, H - 2);
    else g2.lineTo(inEnd, 2);
    g2.stroke();
  }, [peaks, duration, gain, fadeIn, fadeOut, trimStart, trimEnd]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      style={{
        width: '100%',
        maxWidth: W,
        height: H,
        borderRadius: 4,
        border: '1px solid rgba(233,230,220,0.14)',
        background: 'rgba(0,0,0,0.28)',
        display: 'block',
      }}
    />
  );
}
