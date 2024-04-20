import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { todo } from "./index"

type TodoInsert = typeof todo.$inferInsert
const todoInsertSchema = createInsertSchema(todo, {
  id: (s) => s.id.uuid().default(() => crypto.randomUUID()),
})
type TodoSelect = typeof todo.$inferSelect
const todoSelectSchema = createSelectSchema(todo)

export { todoInsertSchema, todoSelectSchema }
export type { TodoInsert, TodoSelect }
