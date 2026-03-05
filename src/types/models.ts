import type { Selectable } from "kysely";
import type {
  Actor,
  Environment,
  Organization,
  RefreshToken,
  System,
} from "./database.js";

export type ActorModel = Selectable<Actor>;

export type OrganizationModel = Selectable<Organization>;

export type SystemModel = Selectable<System>;

export type EnvironmentModel = Selectable<Environment>;

export type RefreshTokenModel = Selectable<RefreshToken>;
