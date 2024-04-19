import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core"

// const user = sqliteTable("user", {
//   id: text("id").primaryKey().notNull(),
//   name: text("name").notNull(),
// })

// const userToTodo = relations(user, ({ many }) => {
//   return { todo: many(todo) }
// })

const todo = sqliteTable("todo", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  // userId: text("user_id")
  //   .notNull()
  //   .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
})

// const todoToUser = relations(todo, ({ one }) => {
//   return { user: one(user, { fields: [todo.userId], references: [user.id] }) }
// })

// export { user, todo, userToTodo, todoToUser }
export { todo }
