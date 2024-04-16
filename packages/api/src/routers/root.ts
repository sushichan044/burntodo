import { Hono } from "hono"
import { HonoConfig } from "../server"

const rootRouter = new Hono<HonoConfig>().get("/hello", (c) => {
  return c.text("Hello, men!")
})

export default rootRouter
