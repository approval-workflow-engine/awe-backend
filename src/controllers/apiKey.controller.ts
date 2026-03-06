import type { Request, Response } from "express";
import { apiKeyService } from "../services/apiKey.service.js";
import { z } from "zod";

const apiKeyIdParam = z.object({
  keyId: z.uuidv4(),
});

export const apiKeyController = {
  list: async (req: Request, res: Response) => {
    const apiKeys = await apiKeyService.getAll(req.actor);

    return res.status(200).json({
      apiKeys: apiKeys.map((apiKey) => {
        return {
          id: apiKey.id,
          label: apiKey.label,
          isRevoked: apiKey.is_revoked,
          createdAt: apiKey.created_on,
          revokedAt: apiKey.revoked_on,
        };
      }),
    });
  },

  generate: async (req: Request, res: Response) => {
    const { label } = req.body;

    const { apiKey, rawKey } = await apiKeyService.createNew(label, req.actor);

    return res.status(201).json({
      id: apiKey.id,
      label: apiKey.label,
      apiKey: rawKey,
      createdAt: apiKey.created_on,
    });
  },

  revoke: async (req: Request, res: Response) => {
    const params = apiKeyIdParam.parse(req.params);
    const apiKey = await apiKeyService.revoke(params.keyId, req.actor);

    return res.status(200).json({
      id: apiKey.id,
      label: apiKey.label,
      isRevoked: apiKey.is_revoked,
      revokedAt: apiKey.revoked_on,
    });
  },
};
