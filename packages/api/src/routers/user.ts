import { zValidator } from "@hono/zod-validator"
import {
  CreateUserSchema,
  DeleteUserSchema,
  GetUserSchema,
  createUser,
  deleteUser,
  getUser,
  getUserByName,
  getUserByNameSchema,
} from "@repo/module/usecase/user"

import { createHono } from "../hono"

const userRouter = createHono()
  .post("/", zValidator("json", CreateUserSchema), async (c) => {
    const db = c.get("db")
    const { name } = c.req.valid("json")
    const res = await createUser({ name }, db)
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500)
    }
    return c.json({ data: res.val, error: null }, 200)
  })
  .get("/:name", zValidator("param", GetUserSchema), async (c) => {
    const db = c.get("db")
    const { name } = c.req.valid("param")
    const res = await getUser({ name }, db)
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500)
    }
    return c.json({ data: res.val, error: null }, 200)
  })
  .get("/", zValidator("query", getUserByNameSchema), async (c) => {
    const db = c.get("db")
    const { name } = c.req.valid("query")
    const res = await getUserByName({ name }, db)
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500)
    }
    return c.json({ data: res.val, error: null }, 200)
  })
  .delete("/:name", zValidator("param", DeleteUserSchema), async (c) => {
    const db = c.get("db")
    const { name } = c.req.valid("param")
    const res = await deleteUser({ name }, db)
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500)
    }
    return c.json({ data: res.val, error: null }, 200)
  })

export { userRouter }
