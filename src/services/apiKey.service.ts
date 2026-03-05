import Config from "../config.js";
import { AuthError } from "../errors/AuthError.js";
import { DataIntegrityError } from "../errors/DataIntegrity.js";
import { apiKeyRepository } from "../repositories/apiKey.repository.js";
import { environmentRepository } from "../repositories/environment.repository.js";
import { ActorTypes } from "../types/enums.js";
import type { ActorModel } from "../types/models.js";
import crypto from "node:crypto";
import argon2 from "argon2";

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

    const rawKey = `${Config.API_KEY_PREFIX}${crypto.randomBytes(32).toString("hex")}`;

    const apiKey = await apiKeyRepository.insert({
      actor_id: actor.id,
      environment_id: environment.id,
      label: label,
      key_prefix: Config.API_KEY_PREFIX,
      key_hash: await argon2.hash(rawKey),
    });

    return { rawKey, apiKey };
  },

  revoke: async (id: string, actor: ActorModel) => {
    if (actor.type !== ActorTypes.ORGANIZATION_ACCOUNT) {
      throw new AuthError();
    }

    return await apiKeyRepository.revokeById(id);
  },
};
