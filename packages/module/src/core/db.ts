import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import * as schema from "@repo/module/schema";
import { drizzle } from "drizzle-orm/d1";

const createDB = (db: D1Database) => drizzle(db, { schema });
type DBType = ReturnType<typeof createDB>;

const createPrisma = (db: D1Database) => {
  const adapter = new PrismaD1(db);
  return new PrismaClient({ adapter });
};
type PrismaType = ReturnType<typeof createPrisma>;

export { createDB, createPrisma };
export type { DBType, PrismaType };
