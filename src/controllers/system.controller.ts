import type { Request, Response } from "express";
import { systemService } from "../services/system.services.js";
import { z } from "zod";

const RegisterSystemInput = z.object({
  name: z.string().max(255),
  orgName: z.string().max(255),
  contactEmail: z.email(),
  password: z.string(),
  description: z.string().nullable().optional(),
});

export const systemController = {
  register: async (req: Request, res: Response) => {
    const data = RegisterSystemInput.parse(req.body);
    const { organization, system, environment } =
      await systemService.createProduction({
        organization: {
          name: data.orgName,
          email: data.contactEmail,
          password: data.password,
        },
        system: {
          name: data.name,
          ...(data.description !== undefined && {
            description: data.description,
          }),
        },
      });

    res.status(201).json({
      system: {
        id: system.id,
        name: system.name,
        orgName: organization.name,
        contactEmail: organization.email,
        environmentType: environment.type,
        createdAt: system.created_on,
      },
    });
  },

  me: (req: Request, res: Response) => {
    res.status(200).json({
      system: {
        id: "sys-uuid",
        name: "My Approval System",
        orgName: "AWE Corp",
        contactEmail: "admin@awe.com",
        environmentType: "production",
        status: "active",
        createdAt: "2025-01-15T10:30:00.000Z",
        updatedAt: "2025-01-15T10:30:00.000Z",
      },
    });
  },
};
