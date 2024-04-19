import { createHono } from "../hono"

import { todo } from "../db/schemas"
import { TodoSelect, TodoInsert, todoInsertSchema } from "../db/schemas/zod"
import { zValidator } from "@hono/zod-validator"

class TodoDBMap {
  private db: Map<string, typeof todo.$inferSelect> = new Map()
  constructor() {
    this.db = new Map()
  }

  get(taskId: string) {
    return { data: this.db.get(taskId), error: null }
  }

  set(taskId: string, todo: TodoInsert) {
    try {
      this.db.set(taskId, todo)
      return { data: todo, error: null }
    } catch (error) {
      return { data: null, error: String(error) }
    }
  }

  delete(taskId: string) {
    try {
      this.db.delete(taskId)
      return { data: null, error: null }
    } catch (error) {
      return { data: null, error: String(error) }
    }
  }

  getAll() {
    return Array.from(this.db.values())
  }
}

const TodoDB = new TodoDBMap()

const todoRouter = createHono()
  .get("/", async (c) => {
    const todos = TodoDB.getAll()
    return c.json({ data: todos, error: null }, 200)
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id")
    const todo = TodoDB.get(id)
    if (!todo) return c.json({ data: null, error: "Not Found" }, 404)
    return c.json({ data: todo, error: null }, 200)
  })
  .post(
    "/",
    zValidator("json", todoInsertSchema, (res, c) => {
      if (!res.success) return c.json({ data: null, error: res.error }, 400)
    }),
    async (c) => {
      const body = c.req.valid("json")
      const { error } = TodoDB.set(body.id, body)
      if (error) return c.json({ data: null, error }, 400)
      return c.json({ data: null, error: null }, 200)
    },
  )
  .delete("/:id", async (c) => {
    const id = c.req.param("id")
    const todo = TodoDB.get(id)
    if (!todo) return c.json({ data: null, error: "Not Found" }, 404)
    const { error } = TodoDB.delete(id)
    if (error) return c.json({ data: null, error }, 400)
    return c.json({ data: null, error: null }, 200)
  })

export { todoRouter }
