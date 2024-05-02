import { createDB } from "@repo/module"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { csrf } from "hono/csrf"
import { poweredBy } from "hono/powered-by"
import { secureHeaders } from "hono/secure-headers"
import { trimTrailingSlash } from "hono/trailing-slash"

type HonoConfig = {
  Bindings: {
    // DB_URL: string
    // DB_AUTH_TOKEN: string
    DB: D1Database
  }
  Variables: {
    db: ReturnType<typeof createDB>
    isRateLimited: boolean
  }
}

const createHono = (...param: ConstructorParameters<typeof Hono>) => {
  const app = new Hono<HonoConfig>(...param)
  app.use(async (c, next) => {
    const db = createDB(c.env.DB)
    c.set("db", db)
    await next()
  })
  app.use(cors(), csrf(), secureHeaders(), trimTrailingSlash(), poweredBy())
  return app
}

export { createHono }
