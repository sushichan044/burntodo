import { zValidator } from "@hono/zod-validator";
import {
  CreateTodoSchema,
  DeleteTodoSchema,
  GetTodoSchema,
} from "@repo/module/usecase";

import { honoFactory } from "../hono";

const todoRouter = honoFactory
  .createApp()
  .get("/", async (c) => {
    const usecase = c.get("usecase");
    const res = await usecase.todo.getAllTodo();
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500);
    }
    return c.json({ data: res.val, error: null }, 200);
  })
  .post("/", zValidator("json", CreateTodoSchema), async (c) => {
    const usecase = c.get("usecase");
    const data = c.req.valid("json");
    const res = await usecase.todo.createTodo(data);
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500);
    }
    return c.json({ data: res.val, error: null }, 200);
  })
  .get("/:id", zValidator("param", GetTodoSchema), async (c) => {
    const usecase = c.get("usecase");
    const { id } = c.req.valid("param");
    const res = await usecase.todo.getTodo({ id });
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500);
    }
    return c.json({ data: res.val, error: null }, 200);
  })
  .delete("/:id", zValidator("param", DeleteTodoSchema), async (c) => {
    const usecase = c.get("usecase");
    const { id } = c.req.valid("param");
    const res = await usecase.todo.deleteTodo({ id });
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500);
    }
    return c.json({ data: res.val, error: null }, 200);
  });

export { todoRouter };
