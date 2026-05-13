// Centralized queue names so producers (apps/api) and consumers (this worker)
// stay in sync as the job catalog grows.
export const QUEUE_RENDER_SCENE = 'render-scene';
export const QUEUE_GENERATE_DIAGNOSTICS = 'generate-diagnostics';
export const QUEUE_CLEANUP_ASSETS = 'cleanup-assets';

export const ALL_QUEUE_NAMES = [
  QUEUE_RENDER_SCENE,
  QUEUE_GENERATE_DIAGNOSTICS,
  QUEUE_CLEANUP_ASSETS,
] as const;

export type QueueName = (typeof ALL_QUEUE_NAMES)[number];
