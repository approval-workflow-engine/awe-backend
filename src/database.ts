import type { DB } from './types/database.js';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';


export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: process.env.DATABASE_URL })
  })
});
