import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  WEB_PORT: z.coerce.number().int().positive().default(3000),
  API_PORT: z.coerce.number().int().positive().default(4000),

  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),

  OBJECT_STORAGE_BUCKET: z.string().min(1),
  OBJECT_STORAGE_ENDPOINT: z.string().url(),
  OBJECT_STORAGE_ACCESS_KEY: z.string().min(1),
  OBJECT_STORAGE_SECRET_KEY: z.string().min(1),

  AUTH_SESSION_SECRET: z.string().min(16),

  VOICE_PROVIDER_ID: z.string().min(1),
  VOICE_PROVIDER_API_KEY: z.string().min(1),

  APP_BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  PUBLIC_SHARE_BASE_URL: z.string().url(),

  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const flat = result.error.flatten();
    const issues = Object.entries(flat.fieldErrors)
      .map(([key, errs]) => `  ${key}: ${(errs ?? []).join(', ')}`)
      .join('\n');
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  return result.data;
}
