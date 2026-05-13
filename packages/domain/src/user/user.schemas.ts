// Runtime validation schemas for the user entity.
import { z } from 'zod';

export const userSchema = z.object({
  userId: z.string().uuid(),
  email: z.string().email(),
  displayName: z.string().min(1),
  accountPlan: z.string().min(1),
  createdAt: z.string().datetime({ offset: true }),
  lastActiveAt: z.string().datetime({ offset: true }).nullable(),
});
