import type { DB } from "./types/database.js";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});

export enum DbErrorCode {
  UNIQUE_VIOLATION = "23505",
}

export function isDbError(
  err: unknown,
): err is { code: string; constraint?: string } {
  return typeof err === "object" && err !== null && "code" in err;
}
