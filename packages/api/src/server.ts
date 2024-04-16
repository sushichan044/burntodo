import { Hono } from "hono"
import rootRouter from "./routers/root"

type HonoConfig = {
  Bindings: {}
}

const app = new Hono<HonoConfig>()

const routes = app.route("/", rootRouter)
export type HonoRoutes = typeof routes

export default app
