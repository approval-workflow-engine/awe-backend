import { Router } from "express";
import { systemRouter } from "./system.routes.js";

export const router = Router();

router.use("/api/v1/systems", systemRouter);
