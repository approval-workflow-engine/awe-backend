import type { ActorType } from "./database.js";

export const ActorTypes = {
  API_KEY_CLIENT: "api_key_client",
  ORGANIZATION_ACCOUNT: "organization_account",
} as const satisfies Record<string, ActorType>;
