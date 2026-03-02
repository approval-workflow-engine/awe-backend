import { db } from "../database.js";
import type { Environment } from "../types/database.js";
import type { Insertable } from "kysely";

type NewEnvironment = Insertable<Environment>;

export const environmentRepository = {
  findById: async (id: string) => {
    return await db
      .selectFrom("environment")
      .selectAll()
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .execute();
  },

  findBySystemId: async (systemId: string) => {
    return await db
      .selectFrom("environment")
      .selectAll()
      .where("system_id", "=", systemId)
      .where("is_deleted", "=", false)
      .execute();
  },

  insert: async (data: NewEnvironment) => {
    return await db
      .insertInto("environment")
      .values(data)
      .returningAll()
      .executeTakeFirst();
  },
};
