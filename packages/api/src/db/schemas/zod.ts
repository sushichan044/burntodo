import { createInsertSchema, createSelectSchema } from "drizzle-zod"
// import { todo, user } from "./index"
import { todo } from "./index"

// type UserInsert = typeof user.$inferInsert
// const userInsertSchema = createInsertSchema(user)
// type UserSelect = typeof user.$inferSelect
// const userSelectSchema = createSelectSchema(user)

type TodoInsert = typeof todo.$inferInsert
const todoInsertSchema = createInsertSchema(todo, {
  id: (s) => s.id.uuid(),
})
type TodoSelect = typeof todo.$inferSelect
const todoSelectSchema = createSelectSchema(todo)

export {
  // 改行対策
  //   userInsertSchema,
  //   userSelectSchema,
  todoInsertSchema,
  todoSelectSchema,
}
export type {
  // 改行対策
  //   UserInsert,
  //   UserSelect,
  TodoInsert,
  TodoSelect,
}
