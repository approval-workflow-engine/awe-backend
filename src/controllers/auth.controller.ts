import type { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service.js";

export const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "email and password are required",
        });
      }

      const result = await authService.login(email, password);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};
