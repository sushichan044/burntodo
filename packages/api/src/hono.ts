import { Hono } from "hono"

import { createDB } from "./db"
import { secureHeaders } from "hono/secure-headers"
import { csrf } from "hono/csrf"
import { cors } from "hono/cors"

type HonoConfig = {
  Bindings: {
    // DB_URL: string
    // DB_AUTH_TOKEN: string
  }
  Variables: {
    isRateLimited: boolean
    // db: ReturnType<typeof createDB>
  }
}

const createHono = (...param: ConstructorParameters<typeof Hono>) => {
  const app = new Hono<HonoConfig>(...param)
  app.use(async (c, next) => {
    // const db = createDB({
    //   // 改行対策
    //   url: c.env.DB_URL,
    //   authToken: c.env.DB_AUTH_TOKEN,
    // })
    // c.set("db", db)
    await next()
  })
  app.use(cors(), csrf(), secureHeaders())
  return app
}

export { createHono }
