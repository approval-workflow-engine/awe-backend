import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken, type JwtPayload } from "../utils/jwt.js";
import { AuthError } from "../errors/AuthError.js";

// Augment Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new AuthError("Missing Authorization header");
  }

  const token = header.slice(7);

  // API key path (prefix check) — full implementation in Prompt 6
  if (token.startsWith("awe_")) {
    // Placeholder: throw until Prompt 6 wires up API key lookup
    throw new AuthError("API key auth not yet configured");
  }

  // JWT path
  req.user = verifyAccessToken(token);
  next();
}
