import { zValidator } from "@hono/zod-validator";
import { GetTodosByUserNameSchema } from "@repo/module/usecase";
import {
  CreateUserSchema,
  DeleteUserSchema,
  GetUserSchema,
} from "@repo/module/usecase";

import { honoFactory } from "../hono";

const userRouter = honoFactory
  .createApp()
  .get("/", async (c) => {
    const usecase = c.get("usecase");
    const res = await usecase.user.getManyUsers();
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500);
    }
    return c.json({ data: res.val, error: null }, 200);
  })
  .post("/", zValidator("json", CreateUserSchema), async (c) => {
    const usecase = c.get("usecase");
    const { name, password } = c.req.valid("json");
    const res = await usecase.user.createUser(
      { name, password },
      c.env.PASSWORD_SALT,
    );
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500);
    }
    return c.json({ data: res.val, error: null }, 200);
  })
  .get("/:name", zValidator("param", GetUserSchema), async (c) => {
    const usecase = c.get("usecase");
    const { name } = c.req.valid("param");
    const res = await usecase.user.getUser({ name });
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500);
    }
    return c.json({ data: res.val, error: null }, 200);
  })
  .delete("/:name", zValidator("param", DeleteUserSchema), async (c) => {
    const usecase = c.get("usecase");
    const { name } = c.req.valid("param");
    const res = await usecase.user.deleteUser({ name });
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500);
    }
    return c.json({ data: res.val, error: null }, 200);
  })
  .get(
    "/:name/todo",
    zValidator("param", GetTodosByUserNameSchema),
    async (c) => {
      const usecase = c.get("usecase");
      const { name } = c.req.valid("param");
      const res = await usecase.user.getUserWithTodo({ name });
      if (res.err) {
        return c.json({ data: null, error: res.val }, 500);
      }
      return c.json({ data: res.val, error: null }, 200);
    },
  );
export { userRouter };
