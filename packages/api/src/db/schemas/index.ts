import { sqliteTable, text } from "drizzle-orm/sqlite-core"

const todo = sqliteTable("todo", {
  description: text("description").notNull(),
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
})

export { todo }
