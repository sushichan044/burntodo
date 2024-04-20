import { createHono } from "./hono"
import { todoRouter } from "./routers/todo"

const app = createHono()
const routes = app
  .get("/", (c) =>
    c.json({ message: "Hello, frontend! I'm Hono from backend!", error: null }),
  )
  .get("/hello", (c) => c.json({ message: "Hello, Hono!", error: null }))
  .route("/todo", todoRouter)
type HonoRoutes = typeof routes

export type { HonoRoutes }
export default app
