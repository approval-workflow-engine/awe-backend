import type { Request, Response } from "express";
import { systemService } from "../services/system.services.js";

export type RegisterSystemInput = {
  name: string;
  orgName: string;
  contactEmail: string;
  password: string;
  description?: string;
};

export const systemController = {
  register: async (req: Request, res: Response) => {
    const data = req.body;
    const { organization, system, environment } =
      await systemService.createProduction({
        organization: {
          name: data.orgName,
          email: data.contactEmail,
          password: data.password,
        },
        system: {
          name: data.name,
          description: data.description,
        },
      });

    res.status(201).json({
      success: true,
      data: {
        system: {
          id: system.id,
          name: system.name,
          orgName: organization.name,
          contactEmail: organization.email,
          environmentType: environment.type,
          createdAt: system.created_on,
        },
      },
    });
  },
};
