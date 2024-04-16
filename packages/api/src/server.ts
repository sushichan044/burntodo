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

const getRouter = (params?: ConstructorParameters<typeof Hono>) =>
  new Hono<HonoConfig>(...(params ?? []))

const app = getRouter()

const routes = app.route("/", rootRouter)
type HonoRoutes = typeof routes

export { getRouter }
export type { HonoConfig, HonoRoutes }
export default app
