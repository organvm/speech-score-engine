import pg from 'pg';

export type Pool = pg.Pool;

export interface CreatePoolOptions {
  connectionString: string;
  max?: number;
}

export function createPool({ connectionString, max = 10 }: CreatePoolOptions): pg.Pool {
  return new pg.Pool({ connectionString, max });
}
