import { Router } from "express";
import { workflowController } from "../controllers/workflow.controller.js";

export const workflowRouter = Router();

workflowRouter.post("/", workflowController.createGroup);

workflowRouter.get("/", workflowController.listWorkflows);

workflowRouter.post("/validate", workflowController.validate);

workflowRouter.get("/:workflowId", workflowController.getWorkflow);

workflowRouter.patch("/:workflowId", workflowController.updateWorkflow);

workflowRouter.delete("/:workflowId", workflowController.deleteWorkflow);

workflowRouter.patch("/:workflowId/status", workflowController.changeStatus);

workflowRouter.post("/:workflowId/versions", workflowController.createVersion);

workflowRouter.get("/:workflowId/versions", workflowController.listVersions);

workflowRouter.get(
  "/:workflowId/versions/:versionNumber",
  workflowController.getVersion,
);

workflowRouter.post(
  "/:workflowId/versions/:versionNumber/validate",
  workflowController.validateVersion,
);

workflowRouter.post(
  "/:workflowId/versions/:versionNumber/publish",
  workflowController.publishVersion,
);