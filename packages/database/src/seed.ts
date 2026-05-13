import { readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from '@sse/config';
import { createPool } from './client.js';

async function main(): Promise<void> {
  const env = loadEnv();
  if (env.NODE_ENV === 'production') {
    console.error('refusing to run seeds against NODE_ENV=production');
    process.exit(2);
  }

  const pool = createPool({ connectionString: env.DATABASE_URL });
  const seedsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'seeds');
  const allFiles = await readdir(seedsDir);
  const seeds = allFiles.filter((f) => f.endsWith('.sql')).sort();

  const client = await pool.connect();
  try {
    for (const file of seeds) {
      const sql = await readFile(join(seedsDir, file), 'utf8');
      console.info(`apply seed ${file}`);
      await client.query(sql);
    }
    console.info('seeds complete');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error('seed failed:', err);
  process.exit(1);
});
