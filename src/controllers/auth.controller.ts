import type { Request, Response } from "express";
import { authService } from "../services/auth.service.js";

export const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { organization, system, environment, accessToken, refreshToken } =
      await authService.login(email, password);

    res.status(200).json({
      system: {
        id: system.id,
        name: system.name,
        orgName: organization.name,
        contactEmail: organization.email,
        environmentType: environment.type,
        status: "active",
      },
      accessToken,
      refreshToken,
    });
  },

  refresh: async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    res.status(200).json({
      ...(await authService.refresh(refreshToken)),
    });
  },

  logout: async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.status(200);
  },
};
