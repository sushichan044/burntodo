import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"

import * as schema from "./schemas"

const createDB = (...arg: Parameters<typeof createClient>) => {
  const client = createClient(...arg)
  const db = drizzle(client, { schema })
  return db
}

export { createDB }
