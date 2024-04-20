import { text, sqliteTable } from "drizzle-orm/sqlite-core"

const todo = sqliteTable("todo", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
})

export { todo }
