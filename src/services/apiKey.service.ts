import Config from "../config.js";
import { AuthError } from "../errors/AuthError.js";
import { DataIntegrityError } from "../errors/DataIntegrity.js";
import { apiKeyRepository } from "../repositories/apiKey.repository.js";
import { environmentRepository } from "../repositories/environment.repository.js";
import { ActorTypes } from "../types/enums.js";
import type { ActorModel } from "../types/models.js";
import crypto from "node:crypto";
import argon2 from "argon2";
import { db } from "../database.js";
import { actorRepository } from "../repositories/actor.repository.js";

export const apiKeyService = {
  getAll: async (actor: ActorModel) => {
    if (actor.type !== ActorTypes.ORGANIZATION_ACCOUNT) {
      throw new AuthError();
    }

    return await apiKeyRepository.findByOrganizationActorId(actor.id);
  },

  createNew: async (label: string, actor: ActorModel) => {
    if (actor.type !== ActorTypes.ORGANIZATION_ACCOUNT) {
      throw new AuthError();
    }

    const environment = (
      await environmentRepository.findByOrganizationActorId(actor.id)
    )[0];

    if (!environment) {
      throw new DataIntegrityError("No environment exists for organization");
    }

    return await db.transaction().execute(async (transaction) => {
      const rawKey = `${Config.API_KEY_PREFIX}${crypto.randomBytes(32).toString("hex")}`;

      const apiKeyActor = await actorRepository.insert({
        type: ActorTypes.API_KEY_CLIENT,
      }, transaction);

      const apiKey = await apiKeyRepository.insert({
        actor_id: apiKeyActor.id,
        environment_id: environment.id,
        label: label,
        key_prefix: Config.API_KEY_PREFIX,
        key_hash: await argon2.hash(rawKey),
      }, transaction);

      return { rawKey, apiKey };
    });
  },

  revoke: async (id: string, actor: ActorModel) => {
    if (actor.type !== ActorTypes.ORGANIZATION_ACCOUNT) {
      throw new AuthError();
    }

    return await apiKeyRepository.revokeById(id);
  },
};
