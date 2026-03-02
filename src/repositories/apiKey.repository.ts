import { db } from "../database.js";
import type { ApiKey } from "../types/database.js";
import type { Insertable, Updateable } from "kysely";

type NewApiKey = Insertable<ApiKey>;
type UpdateApiKey = Updateable<ApiKey>;

export const apiKeyRepository = {
  findById: async (id: string) => {
    return await db
      .selectFrom("api_key")
      .selectAll()
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .executeTakeFirst();
  },

  findByActorId: async (actorId: string) => {
    return await db
      .selectFrom("api_key")
      .selectAll()
      .where("actor_id", "=", actorId)
      .executeTakeFirst();
  },

  findByEnvironmentId: async (environmentId: string) => {
    return await db
      .selectFrom("api_key")
      .selectAll()
      .where("environment_id", "=", environmentId)
      .where("is_deleted", "=", false)
      .execute();
  },

  insert: async (data: NewApiKey) => {
    return await db
      .insertInto("api_key")
      .values(data)
      .returningAll()
      .executeTakeFirst();
  },

  updateById: async (id: string, data: UpdateApiKey) => {
    if (!Object.keys(data).length) {
      return null;
    }

    return await db
      .updateTable("api_key")
      .set({ ...data, modified_on: new Date() })
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .returningAll()
      .executeTakeFirst();
  },

  deleteById: async (id: string) => {
    return await db
      .updateTable("api_key")
      .set({ is_deleted: true, deleted_on: new Date() })
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .returningAll()
      .executeTakeFirst();
  },
};
