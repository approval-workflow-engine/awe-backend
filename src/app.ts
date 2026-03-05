import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./routes/index.js";
import Config from "./config.js";
import { AppError } from "./errors/AppError.js";

const app = express();

app.use(cors({ origin: Config.FRONTEND_URL, credentials: true }));

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use(router);

// 404 for unmatched routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: { message: "Route not found" } });
});

// Global error handler — must have 4 params for Express to recognise it
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: { message: err.message },
    });
  }
  console.error("[Unhandled Error]", err);
  res.status(500).json({
    success: false,
    error: { message: "Internal server error" },
  });
});

export default app;
