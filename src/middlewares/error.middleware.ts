import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export function errorMiddleware(
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    error: "Internal server error",
  });
}