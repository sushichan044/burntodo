import { relations, sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

const TB_user = sqliteTable("users", {
  createdAt: integer("createdAt", { mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  name: text("name").notNull().primaryKey(),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
})

const usersRelations = relations(TB_user, ({ many }) => ({
  todos: many(TB_todo),
}))

const TB_todo = sqliteTable("todos", {
  createdAt: integer("createdAt", { mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  description: text("description").notNull(),
  id: text("id").primaryKey().notNull(), // UUID
  title: text("title").notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  userName: text("userName")
    .references(() => TB_user.name)
    .notNull(), // UUID
})

const todosRelations = relations(TB_todo, ({ one }) => ({
  user: one(TB_user, {
    fields: [TB_todo.userName],
    references: [TB_user.name],
  }),
}))

export { TB_todo, TB_user, todosRelations, usersRelations }
