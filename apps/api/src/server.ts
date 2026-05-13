import { loadEnv } from '@sse/config';
import { createPool } from '@sse/database';
import Fastify from 'fastify';

const env = loadEnv();
const pool = createPool({ connectionString: env.DATABASE_URL });

const app = Fastify({
  logger: { level: env.LOG_LEVEL },
});

app.get('/health', async () => {
  let dbStatus: 'connected' | 'down' = 'down';
  try {
    await pool.query('SELECT 1');
    dbStatus = 'connected';
  } catch (err) {
    app.log.error({ err }, 'database health check failed');
  }
  return {
    ok: dbStatus === 'connected',
    db: dbStatus,
    service: 'sse-api',
  };
});

const shutdown = async (signal: string): Promise<void> => {
  app.log.info({ signal }, 'shutting down');
  await app.close();
  await pool.end();
  process.exit(0);
};
process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));

await app.listen({ port: env.API_PORT, host: '0.0.0.0' });
