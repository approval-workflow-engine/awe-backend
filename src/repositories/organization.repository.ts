import { db, DbErrorCode, isDbError } from "../database.js";
import { DuplicateError } from "../errors/DuplicateError.js";
import { RepositoryError } from "../errors/RepositoryError.js";
import type { DB, Organization } from "../types/database.js";
import type { Insertable, Transaction, Updateable } from "kysely";
import type { OrganizationModel } from "../types/models.js";

type NewOrganization = Insertable<Organization>;
type UpdateOrganization = Updateable<Organization>;

export const organizationRepository = {
  findById: async (id: string, transaction?: Transaction<DB>) => {
    return await (transaction ?? db)
      .selectFrom("organization")
      .selectAll()
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .executeTakeFirst();
  },

  findByEmail: async (email: string, transaction?: Transaction<DB>) => {
    return await (transaction ?? db)
      .selectFrom("organization")
      .selectAll()
      .where("email", "=", email)
      .where("is_deleted", "=", false)
      .executeTakeFirst();
  },

  findByActorId: async (actorId: string, transaction?: Transaction<DB>) => {
    return await (transaction ?? db)
      .selectFrom("organization")
      .selectAll()
      .where("actor_id", "=", actorId)
      .executeTakeFirst();
  },

  insert: async (
    data: NewOrganization,
    transaction?: Transaction<DB>,
  ): Promise<OrganizationModel> => {
    try {
      return await (transaction ?? db)
        .insertInto("organization")
        .values(data)
        .returningAll()
        .executeTakeFirstOrThrow();
    } catch (err) {
      if (
        isDbError(err) &&
        err.code === DbErrorCode.UNIQUE_VIOLATION &&
        err.constraint === "organization_email_key"
      ) {
        throw new DuplicateError("Email");
      }

      throw new RepositoryError("Organization insert failed", err);
    }
  },

  updateById: async (
    id: string,
    data: UpdateOrganization,
    transaction?: Transaction<DB>,
  ) => {
    if (!Object.keys(data).length) {
      return null;
    }

    return await (transaction ?? db)
      .updateTable("organization")
      .set({ ...data, modified_on: new Date() })
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .returningAll()
      .executeTakeFirst();
  },

  deleteById: async (id: string, transaction?: Transaction<DB>) => {
    return await (transaction ?? db)
      .updateTable("organization")
      .set({ is_deleted: true, deleted_on: new Date() })
      .where("id", "=", id)
      .where("is_deleted", "=", false)
      .returningAll()
      .executeTakeFirst();
  },
};
