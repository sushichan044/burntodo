import { Hono } from "hono"

import { secureHeaders } from "hono/secure-headers"
import { csrf } from "hono/csrf"
import { cors } from "hono/cors"
import { createDB } from "./db"

type HonoConfig = {
  Bindings: {
    // DB_URL: string
    // DB_AUTH_TOKEN: string
    DB: D1Database
  }
  Variables: {
    isRateLimited: boolean
    db: ReturnType<typeof createDB>
  }
}

const createHono = (...param: ConstructorParameters<typeof Hono>) => {
  const app = new Hono<HonoConfig>(...param)
  app.use(async (c, next) => {
    const db = createDB(c.env.DB)
    c.set("db", db)
    await next()
  })
  app.use(cors(), csrf(), secureHeaders())
  return app
}

export { createHono }
