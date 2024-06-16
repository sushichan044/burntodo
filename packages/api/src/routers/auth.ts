import { zValidator } from "@hono/zod-validator";
import { VerifyUserSchema } from "@repo/module/usecase";

import { honoFactory } from "../hono";

const authRouter = honoFactory
  .createApp()
  .post("/verify", zValidator("json", VerifyUserSchema), async (c) => {
    const usecase = c.get("usecase");
    const { name, password } = c.req.valid("json");
    const res = await usecase.user.verifyUser({ name, password });
    if (res.err) {
      return c.json({ data: null, error: res.val }, 500);
    }
    return c.json({ data: res.val, error: null }, 200);
  });

export { authRouter };
