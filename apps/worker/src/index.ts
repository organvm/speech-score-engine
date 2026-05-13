import { loadEnv } from '@sse/config';
import { Queue, QueueEvents } from 'bullmq';
import { Redis } from 'ioredis';
import { ALL_QUEUE_NAMES } from './queues.js';

const env = loadEnv();

const connection = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

// Declare the queues so producers can enqueue against known names, even before
// the corresponding Worker processors exist. Each future job type lands as its
// own module that imports the queue name from ./queues and adds a Worker.
const queues = ALL_QUEUE_NAMES.map((name) => new Queue(name, { connection }));

// Observe the queues for visibility while no processors are attached. The
// QueueEvents subscriber maintains its own connection per BullMQ requirements.
const eventSubscribers = ALL_QUEUE_NAMES.map((name) => {
  const events = new QueueEvents(name, { connection: connection.duplicate() });
  events.on('waiting', ({ jobId }) => {
    console.info(`[${name}] waiting jobId=${jobId}`);
  });
  events.on('failed', ({ jobId, failedReason }) => {
    console.error(`[${name}] failed jobId=${jobId} reason=${failedReason}`);
  });
  return events;
});

console.info(`worker boot: queues=${ALL_QUEUE_NAMES.join(',')} redis=${env.REDIS_URL}`);

const shutdown = async (signal: string): Promise<void> => {
  console.info(`worker shutdown signal=${signal}`);
  await Promise.all(eventSubscribers.map((e) => e.close()));
  await Promise.all(queues.map((q) => q.close()));
  await connection.quit();
  process.exit(0);
};
process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
