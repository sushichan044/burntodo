import { Hono } from "hono"
import rootRouter from "./routers/root"
import { cors } from "hono/cors"
import { csrf } from "hono/csrf"
import { secureHeaders } from "hono/secure-headers"

// import {
//   type CloudflareRateLimit,
//   createCloudflareRateLimitMiddleware,
// } from "./rateLimit"

type HonoConfig = {
  Bindings: {
    // RATE_LIMIT: CloudflareRateLimit
  }
  Variables: {
    isRateLimited: boolean
  }
}

const app = new Hono<HonoConfig>()
app.use(cors(), csrf(), secureHeaders())

const routes = app.route("/", rootRouter)
type HonoRoutes = typeof routes

export type { HonoConfig, HonoRoutes }
export default app
