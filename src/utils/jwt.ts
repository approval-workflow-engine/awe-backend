import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import { AuthError } from "../errors/AuthError.js";

export type JwtPayload = {
  actorId: string;
  systemId: string;
  environmentId: string;
  organizationId: string;
};

// Read from env - throw at module load if missing
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set");
}

export function issueTokens(payload: JwtPayload): { accessToken: string; refreshToken: string } {
  const accessToken = jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: (process.env.JWT_ACCESS_TTL ?? "15m") as StringValue,
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: (process.env.JWT_REFRESH_TTL ?? "7d") as StringValue,
  });
  return { accessToken, refreshToken };
}

export function verifyAccessToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
  } catch {
    throw new AuthError("Invalid or expired access token");
  }
}

export function verifyRefreshToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
  } catch {
    throw new AuthError("Invalid or expired refresh token");
  }
}
