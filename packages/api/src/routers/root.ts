import { Hono } from "hono"
import { HonoConfig } from "../server"

const rootRouter = new Hono<HonoConfig>().get("/hello", (c) => {
  return c.text("Hello, men2!")
})

export default rootRouter
