import argon2 from "argon2";
import { db } from "../database.js";
import { ActorTypes } from "../types/enums.js";
import { actorRepository } from "../repositories/actor.repository.js";
import { organizationRepository } from "../repositories/organization.repository.js";

export type CreateOrganizationInput = {
  name: string;
  email: string;
  password: string;
};

export const organizationService = {
  create: async (data: CreateOrganizationInput) => {
    const passwordHash = await argon2.hash(data.password);

    return await db.transaction().execute(async (transaction) => {
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
    });
  },
};
