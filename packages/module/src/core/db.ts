import * as schema from "@repo/module/schema"
import { drizzle } from "drizzle-orm/d1"

const createDB = (db: D1Database) => drizzle(db, { schema })
type DBType = ReturnType<typeof createDB>

export { createDB }
export type { DBType }
