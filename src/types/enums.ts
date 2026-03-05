import type {
  ActorType,
  EnvironmentType,
  WorkflowVersionStatus,
  InstanceStatus,
  TaskStatus,
  NodeType,
  InstanceTransitionType,
  TaskTransitionType,
} from "./database.js";

export const ActorTypes = {
  API_KEY_CLIENT: "api_key_client",
  ORGANIZATION_ACCOUNT: "organization_account",
} as const satisfies Record<string, ActorType>;

export const EnvironmentTypes = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  STAGING: "staging",
} as const satisfies Record<string, EnvironmentType>;

export const WorkflowVersionStatuses = {
  DRAFT: "draft",
  VALID: "valid",
  PUBLISHED: "published",
  ACTIVE: "active",
} as const satisfies Record<string, WorkflowVersionStatus>;

export const InstanceStatuses = {
  IN_PROGRESS: "in_progress",
  PAUSED: "paused",
  COMPLETED: "completed",
  FAILED: "failed",
  TERMINATED: "terminated",
} as const satisfies Record<string, InstanceStatus>;

export const TaskStatuses = {
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  FAILED: "failed",
  TERMINATED: "terminated",
} as const satisfies Record<string, TaskStatus>;

export const NodeTypes = {
  USER: "user",
  SERVICE: "service",
  SCRIPT: "script",
  DECISION: "decision",
  END: "end",
} as const satisfies Record<string, NodeType>;

export const InstanceTransitionTypes = {
  PAUSED: "paused",
  RESUMED: "resumed",
  TERMINATED: "terminated",
  FAILED: "failed",
} as const satisfies Record<string, InstanceTransitionType>;

export const TaskTransitionTypes = {
  RETRIED: "retried",
  TERMINATED: "terminated",
  FAILED: "failed",
} as const satisfies Record<string, TaskTransitionType>;
