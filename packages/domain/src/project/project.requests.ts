// HTTP request/response shapes for the project routes.
import { z } from 'zod';
import { projectSchema } from './project.schemas.js';

export const createProjectRequestSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
});

export const projectResponseSchema = projectSchema;

export const listProjectsResponseSchema = z.object({
  items: z.array(projectResponseSchema),
});

export type CreateProjectRequest = z.infer<typeof createProjectRequestSchema>;
export type ProjectResponse = z.infer<typeof projectResponseSchema>;
export type ListProjectsResponse = z.infer<typeof listProjectsResponseSchema>;
