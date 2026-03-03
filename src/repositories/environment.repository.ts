import { db } from "../database.js";
import { RepositoryError } from "../errors/RepositoryError.js";
import type { Environment, DB } from "../types/database.js";
import type { Insertable, Transaction } from "kysely";
import type { EnvironmentModel } from "../types/models.js";

type NewEnvironment = Insertable<Environment>;

export const environmentRepository = {
  findById: async (id: string, transaction?: Transaction<DB>) => {
    return await (transaction ?? db)
      .selectFrom("environment")
      .selectAll()
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .execute();
  },

  findBySystemId: async (systemId: string, transaction?: Transaction<DB>) => {
    return await (transaction ?? db)
      .selectFrom("environment")
      .selectAll()
      .where("system_id", "=", systemId)
      .where("is_deleted", "=", false)
      .execute();
  },

  insert: async (
    data: NewEnvironment,
    transaction?: Transaction<DB>,
  ): Promise<EnvironmentModel> => {
    try {
      return await (transaction ?? db)
        .insertInto("environment")
        .values(data)
        .returningAll()
        .executeTakeFirstOrThrow();
    } catch (err) {
      throw new RepositoryError("Environment insert failed", err);
    }
  },
};
