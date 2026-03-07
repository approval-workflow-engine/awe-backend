import type { Transaction } from "kysely";
import type { DB } from "../types/database.js";
import { db } from "../database.js";
import { RepositoryError } from "../errors/RepositoryError.js";

export const workflowVersionRepository = {
  findByWorkflowId: async (id: string, transaction?: Transaction<DB>) => {
    try {
      return await (transaction ?? db)
        .selectFrom("workflow_version")
        .selectAll()
        .where("workflow_id", "=", id)
        .where("is_deleted", "=", false)
        .execute();
    } catch (err) {
      throw new RepositoryError(`Workflow search for id=${id} failed`, err);
    }
  },
};
