import { zValidator } from "@hono/zod-validator"
import { eq } from "drizzle-orm"

import { todo } from "../db/schemas"
import { todoInsertSchema } from "../db/schemas/zod"
import { createHono } from "../hono"

const todoRouter = createHono()
  .get("/", async (c) => {
    const db = c.get("db")
    const todos = await db.query.todo.findMany()
    return c.json({ data: todos, error: null }, 200)
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id")
    const db = c.get("db")
    const todo = await db.query.todo.findFirst({
      where: (todo, { eq }) => eq(todo.id, id),
    })
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
      const db = c.get("db")
      const [res] = await db
        .insert(todo)
        .values(body)
        .returning({ id: todo.id })
      if (res == null || res.id !== body.id) {
        return c.json({ data: null, error: "Failed to insert" }, 400)
      }
      return c.json({ data: res.id, error: null }, 200)
    },
  )
  .delete("/:id", async (c) => {
    const id = c.req.param("id")
    const db = c.get("db")
    const [res] = await db
      .delete(todo)
      .where(eq(todo.id, id))
      .returning({ id: todo.id })
    if (res == null || res.id !== id) {
      return c.json({ data: null, error: "Failed to delete" }, 400)
    }
    return c.json({ data: res.id, error: null }, 200)
  })

export { todoRouter }
