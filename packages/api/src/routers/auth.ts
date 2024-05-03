import { zValidator } from "@hono/zod-validator"
import { VerifyUserSchema, verifyUser } from "@repo/module/usecase/user"

import { createHono } from "../hono"

const authRouter = createHono().post(
  "/verify",
  zValidator("json", VerifyUserSchema),
  async (c) => {
    const db = c.get("db")
    const { name, password } = c.req.valid("json")
    const res = await verifyUser({ name, password }, db)
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500)
    }
    return c.json({ data: res.val, error: null }, 200)
  },
)

export { authRouter }
