import { Hono } from "hono"

const rootRouter = new Hono().get("/", (c) => {
  return c.text("Hello, Hono!3")
})

export default rootRouter
