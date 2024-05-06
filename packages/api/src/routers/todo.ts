import { zValidator } from "@hono/zod-validator"
import {
  CreateTodoSchema,
  DeleteTodoSchema,
  GetTodoSchema,
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
} from "@repo/module/usecase/todo"

import { honoFactory } from "../hono"

const todoRouter = honoFactory
  .createApp()
  .get("/", async (c) => {
    const db = c.get("db")
    const res = await getAllTodos(db)
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500)
    }
    return c.json({ data: res.val, error: null }, 200)
  })
  .post("/", zValidator("json", CreateTodoSchema), async (c) => {
    const db = c.get("db")
    const data = c.req.valid("json")
    const res = await createTodo(data, db)
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500)
    }
    return c.json({ data: res.val, error: null }, 200)
  })
  .get("/:id", zValidator("param", GetTodoSchema), async (c) => {
    const db = c.get("db")
    const { id } = c.req.valid("param")
    const res = await getTodo({ id }, db)
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500)
    }
    return c.json({ data: res.val, error: null }, 200)
  })
  .delete("/:id", zValidator("param", DeleteTodoSchema), async (c) => {
    const db = c.get("db")
    const { id } = c.req.valid("param")
    const res = await deleteTodo({ id }, db)
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500)
    }
    return c.json({ data: res.val, error: null }, 200)
  })

export { todoRouter }
