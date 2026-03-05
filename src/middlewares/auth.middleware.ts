import type { NextFunction, Request, Response } from "express";
import { AuthError } from "../errors/AuthError.js";
import jwt from "jsonwebtoken";
import Config from "../config.js";
import type { ActorModel } from "../types/models.js";
import { AppError } from "../errors/AppError.js";

declare global {
  namespace Express {
    interface Request {
      actor: ActorModel;
    }
  }
}

export const authenticateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AuthError("Missing Authorization header");
  }

  const [name, value] = authHeader.split(" ");

  if (!name || !value) {
    throw new AuthError();
  }

  try {
    if (name === "Bearer") {
  
      const payload = jwt.verify(
        value,
        Config.JWT_ACCESS_SECRET,
      ) as { actor: ActorModel };

      req.actor = payload.actor;
    } else if (name === "API-Key") {
      req;
    } else {
      throw new AuthError();
    }

    next();
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AuthError();
  }
};
