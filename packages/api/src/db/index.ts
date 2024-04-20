import { drizzle } from "drizzle-orm/d1"

import * as schema from "./schemas"

const createDB = (db: Parameters<typeof drizzle>["0"]) =>
  drizzle(db, { schema })

export { createDB }
