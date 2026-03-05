import { db, DbErrorCode, isDbError } from "../database.js";
import { DuplicateError } from "../errors/DuplicateError.js";
import { RepositoryError } from "../errors/RepositoryError.js";
import type { DB, Organization } from "../types/database.js";
import type { Insertable, Transaction, Updateable } from "kysely";
import type {
  ActorModel,
  EnvironmentModel,
  OrganizationModel,
  SystemModel,
} from "../types/models.js";

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

  findByEmailWithRelations: async (
    email: string,
    transaction?: Transaction<DB>,
  ): Promise<
    | {
        organization: OrganizationModel;
        actor: ActorModel;
        system: SystemModel;
        environment: EnvironmentModel;
      }
    | undefined
  > => {
    const result = await (transaction ?? db)
      .selectFrom("organization")
      .innerJoin("actor", "actor.id", "organization.actor_id")
      .innerJoin("system", "system.organization_id", "organization.id")
      .innerJoin("environment", "environment.system_id", "system.id")
      .where("organization.email", "=", email)
      .where("organization.is_deleted", "=", false)
      .where("system.is_deleted", "=", false)
      .where("environment.is_deleted", "=", false)
      .select((eb) => [
        eb.ref("organization.id").as("organization_id"),
        eb.ref("organization.name").as("organization_name"),
        eb.ref("organization.email").as("organization_email"),
        eb.ref("organization.password_hash").as("organization_password_hash"),
        eb.ref("organization.created_on").as("organization_created_on"),
        eb.ref("organization.modified_on").as("organization_modified_on"),
        eb.ref("organization.is_deleted").as("organization_is_deleted"),
        eb.ref("organization.deleted_on").as("organization_deleted_on"),

        eb.ref("actor.id").as("actor_id"),
        eb.ref("actor.type").as("actor_type"),

        eb.ref("system.id").as("system_id"),
        eb.ref("system.name").as("system_name"),
        eb.ref("system.description").as("system_description"),
        eb.ref("system.created_on").as("system_created_on"),
        eb.ref("system.modified_on").as("system_modified_on"),
        eb.ref("system.is_deleted").as("system_is_deleted"),
        eb.ref("system.deleted_on").as("system_deleted_on"),

        eb.ref("environment.id").as("environment_id"),
        eb.ref("environment.type").as("environment_type"),
        eb.ref("environment.created_on").as("environment_created_on"),
        eb.ref("environment.is_deleted").as("environment_is_deleted"),
        eb.ref("environment.deleted_on").as("environment_deleted_on"),
      ])
      .executeTakeFirst();

    if (!result) {
      return result;
    }

    return {
      organization: {
        id: result.organization_id,
        actor_id: result.actor_id,
        name: result.organization_name,
        email: result.organization_email,
        password_hash: result.organization_password_hash,
        created_on: result.organization_created_on,
        modified_on: result.organization_modified_on,
        is_deleted: result.organization_is_deleted,
        deleted_on: result.organization_deleted_on,
      },
      actor: {
        id: result.actor_id,
        type: result.actor_type,
      },
      system: {
        id: result.system_id,
        organization_id: result.organization_id,
        name: result.system_name,
        description: result.system_description,
        created_on: result.system_created_on,
        modified_on: result.system_modified_on,
        is_deleted: result.system_is_deleted,
        deleted_on: result.system_deleted_on,
      },
      environment: {
        id: result.environment_id,
        system_id: result.system_id,
        type: result.environment_type,
        created_on: result.environment_created_on,
        is_deleted: result.environment_is_deleted,
        deleted_on: result.environment_deleted_on,
      },
    };
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
