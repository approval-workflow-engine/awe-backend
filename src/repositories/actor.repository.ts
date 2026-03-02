import { db } from "../database.js";
import { RepositoryError } from "../errors/RepositoryError.js";
import type { DB, Actor } from "../types/database.js";
import type { Transaction, Insertable } from "kysely";

type NewActor = Insertable<Actor>;

export const actorRepository = {
  findById: async (id: string, transaction?: Transaction<DB>) => {
    return await (transaction ?? db)
      .selectFrom("actor")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  },

  insert: async (data: NewActor, transaction?: Transaction<DB>) => {
    try {
      return await (transaction ?? db)
        .insertInto("actor")
        .values(data)
        .returningAll()
        .executeTakeFirstOrThrow();
    } catch (err) {
      throw new RepositoryError("Actor insert failed", err);
    }
  },
};
