import { readFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from '@sse/config';
import { createPool } from './client.js';

const SCHEMA_MIGRATION_TABLE = `
  CREATE TABLE IF NOT EXISTS schema_migration (
    migration_id TEXT PRIMARY KEY,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

async function main(): Promise<void> {
  const env = loadEnv();
  const pool = createPool({ connectionString: env.DATABASE_URL });

  const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'migrations');
  const allFiles = await readdir(migrationsDir);
  const migrations = allFiles.filter((f) => f.endsWith('.sql')).sort();

  const client = await pool.connect();
  try {
    await client.query(SCHEMA_MIGRATION_TABLE);
    const { rows } = await client.query<{ migration_id: string }>(
      'SELECT migration_id FROM schema_migration',
    );
    const applied = new Set(rows.map((r) => r.migration_id));

    for (const file of migrations) {
      if (applied.has(file)) {
        console.info(`skip  ${file}  (already applied)`);
        continue;
      }
      const sql = await readFile(join(migrationsDir, file), 'utf8');
      console.info(`apply ${file}`);
      await client.query(sql);
      await client.query('INSERT INTO schema_migration (migration_id) VALUES ($1)', [file]);
    }

    console.info('migrations complete');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error('migration failed:', err);
  process.exit(1);
});
