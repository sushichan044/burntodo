import { zValidator } from "@hono/zod-validator";
import {
  GetTodosByUserNameSchema,
  getTodosByUserName,
} from "@repo/module/usecase/todo";
import {
  CreateUserSchema,
  DeleteUserSchema,
  GetUserSchema,
  createUser,
  deleteUser,
  getManyUsers,
  getUser,
} from "@repo/module/usecase/user";

import { honoFactory } from "../hono";

const userRouter = honoFactory
  .createApp()
  .get("/", async (c) => {
    const db = c.get("db");
    const res = await getManyUsers(db);
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500);
    }
    return c.json({ data: res.val, error: null }, 200);
  })
  .post("/", zValidator("json", CreateUserSchema), async (c) => {
    const db = c.get("db");
    const { name, password } = c.req.valid("json");
    const res = await createUser({ name, password }, c.env.PASSWORD_SALT, db);
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500);
    }
    return c.json({ data: res.val, error: null }, 200);
  })
  .get("/:name", zValidator("param", GetUserSchema), async (c) => {
    const db = c.get("db");
    const { name } = c.req.valid("param");
    const res = await getUser({ name }, db);
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500);
    }
    return c.json({ data: res.val, error: null }, 200);
  })
  .delete("/:name", zValidator("param", DeleteUserSchema), async (c) => {
    const db = c.get("db");
    const { name } = c.req.valid("param");
    const res = await deleteUser({ name }, db);
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500);
    }
    return c.json({ data: res.val, error: null }, 200);
  })
  .get(
    "/:name/todo",
    zValidator("param", GetTodosByUserNameSchema),
    async (c) => {
      const db = c.get("db");
      const { name } = c.req.valid("param");
      const res = await getTodosByUserName({ name }, db);
      if (res.err) {
        return c.json({ data: null, error: res.val }, 500);
      }
      return c.json({ data: res.val, error: null }, 200);
    },
  );
export { userRouter };
