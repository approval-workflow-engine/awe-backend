import { db } from "../../database.js";
import type { System } from "../../types/database.js";
import type { Insertable, Updateable } from "kysely";

type NewSystem = Insertable<System>;
type UpdateSystem = Updateable<System>;

export const systemRepository = {
  findById: async (id: string) => {
    return await db
      .selectFrom("system")
      .selectAll()
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .executeTakeFirst();
  },

  findByOrganizationId: async (organizationId: string) => {
    return await db
      .selectFrom("system")
      .selectAll()
      .where("organization_id", "=", organizationId)
      .where("is_deleted", "=", false)
      .executeTakeFirst();
  },

  insert: async (data: NewSystem) => {
    return await db
      .insertInto("system")
      .values(data)
      .returningAll()
      .executeTakeFirst();
  },

  updateById: async (id: string, data: UpdateSystem) => {
    if (!Object.keys(data).length) {
      return null;
    }

    return await db
      .updateTable("system")
      .set({ ...data, modified_on: new Date() })
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .returningAll()
      .executeTakeFirst();
  },

  deleteById: async (id: string) => {
    return await db
      .updateTable("system")
      .set({ is_deleted: true, deleted_on: new Date() })
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .returningAll()
      .executeTakeFirst();
  },
};
