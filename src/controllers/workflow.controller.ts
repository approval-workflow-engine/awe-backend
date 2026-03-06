import type { Request, Response } from "express";

export const workflowController = {
  createGroup: (req: Request, res: Response) => {
    res.status(201).json({
      workflow: {
        id: "wf-uuid",
        name: "Employee Onboarding Approval",
        description: "Multi-step onboarding approval for new hires",
        status: "inactive",
        systemId: "sys-uuid",
        createdAt: "2025-01-15T10:00:00.000Z",
        updatedAt: "2025-01-15T10:00:00.000Z",
      },
    });
  },

  listWorkflows: (req: Request, res: Response) => {
    res.status(200).json({
      workflows: [
        {
          id: "wf-uuid",
          name: "Employee Onboarding Approval",
          status: "active",
          versionCount: 2,
          createdAt: "2025-01-15T10:00:00.000Z",
          updatedAt: "2025-01-15T10:00:00.000Z",
        },
      ],
      pagination: { total: 5, page: 1, limit: 20, totalPages: 1 },
    });
  },

  getWorkflow: (req: Request, res: Response) => {
    res.status(200).json({
      id: "wf-uuid",
      name: "Employee Onboarding Approval",
      description: "Multi-step onboarding approval for new hires",
      status: "active",
      versions: [
        {
          id: "ver-uuid",
          versionNumber: 1,
          status: "active",
          publishedAt: "2025-01-15T10:30:00.000Z",
        },
      ],
      createdAt: "2025-01-15T10:00:00.000Z",
      updatedAt: "2025-01-15T10:00:00.000Z",
    });
  },

  updateWorkflow: (req: Request, res: Response) => {
    res.status(200).json({
      id: "wf-uuid",
      name: "Employee Onboarding Approval v2",
      description: "Updated multi-step onboarding process",
      status: "active",
      updatedAt: "2025-01-15T11:00:00.000Z",
    });
  },

  deleteWorkflow: (req: Request, res: Response) => {
    res.status(200).json({});
  },

  changeStatus: (req: Request, res: Response) => {
    res.status(200).json({
      id: "wf-uuid",
      status: "active",
      updatedAt: "2025-01-15T12:00:00.000Z",
    });
  },

  validate: (req: Request, res: Response) => {
    res.status(200).json({ valid: true, errors: [] });
  },

  createVersion: (req: Request, res: Response) => {
    res.status(201).json({
      id: "ver-uuid",
      workflowId: "wf-uuid",
      versionNumber: 2,
      status: "draft",
      createdAt: "2025-01-15T11:00:00.000Z",
    });
  },

  validateVersion: (req: Request, res: Response) => {
    res.status(200).json({
      valid: true,
      errors: [],
      versionId: "ver-uuid",
      versionNumber: 2,
    });
  },

  listVersions: (req: Request, res: Response) => {
    res.status(200).json({
      versions: [
        {
          id: "ver-uuid-1",
          versionNumber: 1,
          status: "deprecated",
          publishedAt: "2025-01-10T08:00:00.000Z",
          createdAt: "2025-01-09T10:00:00.000Z",
        },
        {
          id: "ver-uuid-2",
          versionNumber: 2,
          status: "active",
          publishedAt: "2025-01-15T10:30:00.000Z",
          createdAt: "2025-01-14T09:00:00.000Z",
        },
      ],
      pagination: { total: 5, page: 1, limit: 20, totalPages: 1 },
    });
  },

  getVersion: (req: Request, res: Response) => {
    res.status(200).json({
      id: "ver-uuid",
      workflowId: "wf-uuid",
      versionNumber: 2,
      status: "active",
      nodes: [
        {
          id: "node-db-uuid",
          nodeId: "start_1",
          type: "start",
          label: "Start",
          config: {},
          position: { x: 100, y: 100 },
        },
      ],
      edges: [
        {
          id: "edge-db-uuid",
          edgeId: "e1",
          sourceNodeId: "start_1",
          targetNodeId: "task_1",
          conditionExpression: null,
          isDefault: false,
        },
      ],
      publishedAt: "2025-01-15T10:30:00.000Z",
      createdAt: "2025-01-14T09:00:00.000Z",
    });
  },

  publishVersion: (req: Request, res: Response) => {
    res.status(200).json({
      message: "Version published and set as active.",
      version: {
        id: "ver-uuid",
        versionNumber: 2,
        status: "active",
        publishedAt: "2025-01-15T10:30:00.000Z",
      },
    });
  },
};
