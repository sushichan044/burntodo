import { Hono } from "hono"
import rootRouter from "./routers/root"

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

const routes = app.route("/", rootRouter)
type HonoRoutes = typeof routes

export type { HonoConfig, HonoRoutes }
export default app
