import { createHono } from "./hono"
import { todoRouter } from "./routers/todo"

const app = createHono()
const routes = app
  .get("/", (c) =>
    c.json({ error: null, message: "Hello, frontend! I'm Hono from backend!" }),
  )
  .get("/hello", (c) => c.json({ error: null, message: "Hello, Hono!" }))
  .route("/todo", todoRouter)
type HonoRoutes = typeof routes

export type { HonoRoutes }
export default app
