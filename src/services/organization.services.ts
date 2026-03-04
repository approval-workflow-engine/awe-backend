import argon2 from "argon2";
import { db } from "../database.js";
import { ActorTypes } from "../types/enums.js";
import { actorRepository } from "../repositories/actor.repository.js";
import { organizationRepository } from "../repositories/organization.repository.js";
import type { Transaction } from "kysely";
import type { DB } from "../types/database.js";
import type { OrganizationModel } from "../types/models.js";

export type CreateOrganizationInput = {
  name: string;
  email: string;
  password: string;
};

export const organizationService = {
  create: async (
    data: CreateOrganizationInput,
    transaction?: Transaction<DB>,
  ) => {
    const passwordHash = await argon2.hash(data.password);

    const createNewOrganization = async (
      transaction: Transaction<DB>,
    ): Promise<OrganizationModel> => {
      const actor = await actorRepository.insert(
        { type: ActorTypes.ORGANIZATION_ACCOUNT },
        transaction,
      );

      return await organizationRepository.insert(
        {
          actor_id: actor.id,
          name: data.name,
          email: data.email,
          password_hash: passwordHash,
        },
        transaction,
      );
    };

    if (transaction) {
      return await createNewOrganization(transaction);
    }

    return await db
      .transaction()
      .execute(async (transaction) => createNewOrganization(transaction));
  },
};
