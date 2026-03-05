import { systemRepository } from "../repositories/system.repository.js";
import {
  organizationService,
  type CreateOrganizationInput,
} from "./organization.services.js";
import { EnvironmentTypes } from "../types/enums.js";
import { db } from "../database.js";
import { environmentRepository } from "../repositories/environment.repository.js";
import type {
  EnvironmentModel,
  OrganizationModel,
  SystemModel,
} from "../types/models.js";

export type CreateProductionSystemInput = {
  organization: CreateOrganizationInput;
  system: { name: string; description: string | null };
};

export type CreateProductionSystemOutput = {
  organization: OrganizationModel;
  system: SystemModel;
  environment: EnvironmentModel;
};

export const systemService = {
  createProduction: async (
    data: CreateProductionSystemInput,
  ): Promise<CreateProductionSystemOutput> => {
    return await db.transaction().execute(async (transaction) => {
      const organization = await organizationService.create(
        data.organization,
        transaction,
      );

      const system = await systemRepository.insert(
        {
          ...data.system,
          organization_id: organization.id,
        },
        transaction,
      );

      const environment = await environmentRepository.insert(
        {
          type: EnvironmentTypes.PRODUCTION,
          system_id: system.id,
        },
        transaction,
      );
      return {
        organization,
        system,
        environment,
      };
    });
  },
};
