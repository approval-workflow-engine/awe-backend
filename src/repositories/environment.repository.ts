import { db } from "../database.js";
import { RepositoryError } from "../errors/RepositoryError.js";
import type { Environment, DB } from "../types/database.js";
import type { Insertable, Transaction } from "kysely";
import type { ActorModel, EnvironmentModel } from "../types/models.js";
import { ActorTypes } from "../types/enums.js";

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

  findByOrganizationActorId: async (
    actorId: string,
    transaction?: Transaction<DB>,
  ): Promise<EnvironmentModel[]> => {
    return await (transaction ?? db)
      .selectFrom("environment")
      .innerJoin("system", "system.id", "environment.system_id")
      .innerJoin("organization", "organization.id", "system.organization_id")
      .selectAll("environment")
      .where("organization.actor_id", "=", actorId)
      .where("environment.is_deleted", "=", false)
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
