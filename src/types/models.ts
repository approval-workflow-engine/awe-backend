import type { Selectable } from "kysely";
import type {
  Actor,
  ApiKey,
  Edge,
  Environment,
  Instance,
  InstanceTransitionLog,
  Node,
  Organization,
  RefreshToken,
  System,
  Task,
  TaskExecution,
  TaskTransitionLog,
  Workflow,
  WorkflowVersion,
} from "./database.js";

export type ActorModel = Selectable<Actor>;

export type OrganizationModel = Selectable<Organization>;

export type SystemModel = Selectable<System>;

export type EnvironmentModel = Selectable<Environment>;

export type RefreshTokenModel = Selectable<RefreshToken>;

export type ApiKeyModel = Selectable<ApiKey>;

export type WorkflowModel = Selectable<Workflow>;

export type WorkflowVersionModel = Selectable<WorkflowVersion>;

export type NodeModel = Selectable<Node>;

export type EdgeModel = Selectable<Edge>;

export type InstanceModel = Selectable<Instance>;

export type InstanceTransitionLogModel = Selectable<InstanceTransitionLog>;

export type TaskModel = Selectable<Task>;

export type TaskExecutionModel = Selectable<TaskExecution>;

export type TaskTransitionLogModel = Selectable<TaskTransitionLog>;
