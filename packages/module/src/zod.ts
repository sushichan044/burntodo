import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { TB_todo, TB_user } from "./schema"

type TB_UserInsert = typeof TB_user.$inferInsert
const TB_userInsertSchema = createInsertSchema(TB_user)

type TB_UserSelect = typeof TB_user.$inferSelect
const TB_userSelectSchema = createSelectSchema(TB_user)

export { TB_userInsertSchema, TB_userSelectSchema }
export type { TB_UserInsert, TB_UserSelect }

type TB_TodoInsert = typeof TB_todo.$inferInsert
const TB_todoInsertSchema = createInsertSchema(TB_todo, {
  id: (s) => s.id.uuid(),
})

type TB_TodoSelect = typeof TB_todo.$inferSelect
const TB_todoSelectSchema = createSelectSchema(TB_todo)

export { TB_todoInsertSchema, TB_todoSelectSchema }
export type { TB_TodoInsert, TB_TodoSelect }
