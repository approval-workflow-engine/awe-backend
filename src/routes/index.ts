import { Router } from "express";
import { systemRouter } from "./system.routes.js";
import { authRouter } from "./auth.routes.js";

export const router = Router();

router.use("/api/v1/systems", systemRouter);
router.use("api/v1/auth", authRouter);
