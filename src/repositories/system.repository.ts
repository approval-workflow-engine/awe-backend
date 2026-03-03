import { db } from "../database.js";
import type { System, DB } from "../types/database.js";
import type { Insertable, Updateable, Transaction } from "kysely";
import { RepositoryError } from "../errors/RepositoryError.js";
import type { SystemModel } from "../types/models.js";

type NewSystem = Insertable<System>;
type UpdateSystem = Updateable<System>;

export const systemRepository = {
  findById: async (id: string, transaction?: Transaction<DB>) => {
    return await (transaction ?? db)
      .selectFrom("system")
      .selectAll()
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .executeTakeFirst();
  },

  findByOrganizationId: async (
    organizationId: string,
    transaction?: Transaction<DB>,
  ) => {
    return await (transaction ?? db)
      .selectFrom("system")
      .selectAll()
      .where("organization_id", "=", organizationId)
      .where("is_deleted", "=", false)
      .executeTakeFirst();
  },

  insert: async (
    data: NewSystem,
    transaction?: Transaction<DB>,
  ): Promise<SystemModel> => {
    try {
      return await (transaction ?? db)
        .insertInto("system")
        .values(data)
        .returningAll()
        .executeTakeFirstOrThrow();
    } catch (err) {
      throw new RepositoryError("System insert failed", err);
    }
  },

  updateById: async (
    id: string,
    data: UpdateSystem,
    transaction?: Transaction<DB>,
  ) => {
    if (!Object.keys(data).length) {
      return null;
    }

    return await (transaction ?? db)
      .updateTable("system")
      .set({ ...data, modified_on: new Date() })
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .returningAll()
      .executeTakeFirst();
  },

  deleteById: async (id: string, transaction?: Transaction<DB>) => {
    return await (transaction ?? db)
      .updateTable("system")
      .set({ is_deleted: true, deleted_on: new Date() })
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .returningAll()
      .executeTakeFirst();
  },
};
