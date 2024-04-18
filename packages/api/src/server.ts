import { Hono } from "hono"
import rootRouter from "./routers/root"
import { cors } from "hono/cors"
import { csrf } from "hono/csrf"
import { secureHeaders } from "hono/secure-headers"
import { createDB } from "./db"

type HonoConfig = {
  Variables: {
    isRateLimited: boolean
    db: ReturnType<typeof createDB>
    DB_URL: string
    DB_AUTH_TOKEN: string
  }
}

const createHono = (...param: ConstructorParameters<typeof Hono>) => {
  const app = new Hono<HonoConfig>(...param)
  app.use(async (c, next) => {
    const db = createDB({
      // 改行対策
      url: c.var.DB_URL,
      authToken: c.var.DB_AUTH_TOKEN,
    })
    c.set("db", db)
    await next()
  })
  app.use(cors(), csrf(), secureHeaders())
  return app
}

const app = createHono()
const routes = app.route("/", rootRouter)
type HonoRoutes = typeof routes

export { createHono }
export type { HonoConfig, HonoRoutes }
export default app
