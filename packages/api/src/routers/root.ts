import { Hono } from "hono"

const rootRouter = new Hono().get("/", (c) => {
  return c.text("Hello, Hono!2")
})

export default rootRouter
