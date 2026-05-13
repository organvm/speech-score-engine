// Runtime validation schemas for the project entity, paired with project.types.ts.
import { z } from 'zod';

export const projectSchema = z.object({
  projectId: z.string().uuid(),
  ownerUserId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable(),
  archivedAt: z.string().datetime({ offset: true }).nullable(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
});
