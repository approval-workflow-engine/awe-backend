import { Router } from "express";
import { systemController } from "../controllers/system.controller.js";

export const systemRouter = Router();

systemRouter.post("/register", systemController.register);
