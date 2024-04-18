import { createHono } from "../server"

const rootRouter = createHono().get("/hello", (c) => {
  return c.text("Hello, men2!")
})

export default rootRouter
