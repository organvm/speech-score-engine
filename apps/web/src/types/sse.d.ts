// Ambient types for the shared classic-script tracker engine
// (public/prototypes/tracker-engine.js) and the score/voice data packs it consumes. Both are
// loaded at runtime via <script> injection, so they surface on `window` rather than as imports.

export type Performer = 'ai' | 'human';

export interface Lane {
  id: string;
  name?: string;
  performer?: Performer;
  voice?: string;
  rate?: string;
  pan?: number;
  gain?: number;
  tone?: { f: number; type: string };
  speech?: { pitch: number; rate: number; prefer: string[] };
}

export interface ScoreEvent {
  row: number;
  lane: string;
  text: string;
  section?: string;
  stage?: boolean;
  // Timing model — Ableton clip-view "for words". A clip has a beat position and a length; the
  // engine still steps a uniform grid, deriving the finest subdivision that lands every start on a
  // whole tick (all-integer scores → subdivision 1 → identical legacy playback).
  start?: number; // beat position (fractional allowed); defaults to `row`
  beats?: number; // clip length in beats; defaults to 1
  warp?: boolean; // stretch the audio to fill `beats` on the grid (vs. its natural recorded length)
  // L6 audio craft — per-clip shaping honored by the engine's playSample (all optional, seconds
  // except gain which is a level multiplier). Absent → the clip plays untouched.
  gain?: number;
  fadeIn?: number;
  fadeOut?: number;
  trimStart?: number;
  trimEnd?: number;
}

export interface Score {
  id: string;
  short?: string;
  title: string;
  byline?: string;
  caption?: string;
  tempo?: number;
  lanes: Lane[];
  sections?: Record<string, [number, number]>;
  total: number;
  events: ScoreEvent[];
}

export type ClipMap = Record<string, string>;

export interface VoicePack {
  source?: string;
  format?: string;
  count?: number;
  clips: ClipMap;
}

export interface MountOptions {
  score: Score;
  clips: ClipMap | null;
  scores: Score[];
  onPick?: (id: string) => void;
}

export interface TrackerHandle {
  destroy: () => void;
}

export interface SSEEngineApi {
  mount: (root: HTMLElement, opts: MountOptions) => TrackerHandle;
}

declare global {
  interface Window {
    SSEEngine?: SSEEngineApi;
    SSE_SCORES?: Record<string, Score>;
    SSE_VOICES?: Record<string, VoicePack>;
  }
}
