// HTTP request/response shapes for the scene routes. These are intentionally
// distinct from the entity schema in scene.schemas.ts: clients address fields
// by their friendly names (rawText, not rawTextCurrent) because the "current"
// suffix is a DB-side artifact of the mutable-vs-snapshot split.
import { z } from 'zod';
import { sceneSchema, sceneStatusSchema } from './scene.schemas.js';

export const createSceneRequestSchema = z.object({
  title: z.string().min(1),
  rawText: z.string().default(''),
});

export const updateSceneRequestSchema = z
  .object({
    title: z.string().min(1).optional(),
    rawText: z.string().optional(),
    sceneStatus: sceneStatusSchema.optional(),
  })
  .refine(
    (body) =>
      body.title !== undefined || body.rawText !== undefined || body.sceneStatus !== undefined,
    { message: 'At least one of title, rawText, sceneStatus is required.' },
  );

export const sceneResponseSchema = sceneSchema;

export const listScenesResponseSchema = z.object({
  items: z.array(sceneResponseSchema),
});

export type CreateSceneRequest = z.infer<typeof createSceneRequestSchema>;
export type UpdateSceneRequest = z.infer<typeof updateSceneRequestSchema>;
export type SceneResponse = z.infer<typeof sceneResponseSchema>;
export type ListScenesResponse = z.infer<typeof listScenesResponseSchema>;
