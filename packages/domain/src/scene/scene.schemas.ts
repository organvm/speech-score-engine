// Runtime validation schemas, paired with scene.types.ts. zod is the chosen
// runtime-validation layer per the scaffold plan.
import { z } from 'zod';

export const parsedSceneSpeakerSchema = z.object({
  displayLabel: z.string().min(1),
});

export const parsedSceneLineSchema = z.object({
  lineIndex: z.number().int().nonnegative(),
  speakerLabel: z.string().min(1).nullable(),
  textContent: z.string(),
  isStageDirection: z.boolean(),
});

export const parsedSceneStateSchema = z.object({
  speakers: z.array(parsedSceneSpeakerSchema),
  lines: z.array(parsedSceneLineSchema),
});

export const sceneStatusSchema = z.enum(['draft', 'in_review', 'finalized', 'archived']);

export const renderStatusSchema = z.enum([
  'queued',
  'in_progress',
  'completed',
  'failed',
  'cancelled',
]);

export const renderScopeSchema = z.enum(['full_scene', 'line_range', 'single_line']);

export type ParsedSceneStateInput = z.input<typeof parsedSceneStateSchema>;
export type ParsedSceneStateParsed = z.output<typeof parsedSceneStateSchema>;
