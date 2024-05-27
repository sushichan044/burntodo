import type { DBType } from "@repo/module";

import { createDB } from "@repo/module";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { createFactory } from "hono/factory";
import { poweredBy } from "hono/powered-by";
import { secureHeaders } from "hono/secure-headers";
import { trimTrailingSlash } from "hono/trailing-slash";

type HonoConfig = {
  Bindings: {
    DB: D1Database;
    PASSWORD_SALT: string;
  };
  Variables: {
    db: DBType;
  };
};

const honoFactory = createFactory<HonoConfig>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const db = createDB(c.env.DB);
      c.set("db", db);
      await next();
    });
    app.use(cors(), csrf(), secureHeaders(), trimTrailingSlash(), poweredBy());
  },
});

export { honoFactory };
