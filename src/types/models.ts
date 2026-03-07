import type { Selectable } from "kysely";
import type {
  Actor,
  ApiKey,
  Environment,
  Organization,
  RefreshToken,
  System,
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
