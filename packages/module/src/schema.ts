import { relations, sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

const TB_user = sqliteTable("users", {
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  name: text("name").notNull().primaryKey(),
  password: text("password").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
})

const usersRelations = relations(TB_user, ({ many }) => ({
  todos: many(TB_todo),
}))

const TB_todo = sqliteTable("todos", {
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  description: text("description"),
  id: text("id").primaryKey().notNull(), // UUID
  title: text("title").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  userName: text("user_name")
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
