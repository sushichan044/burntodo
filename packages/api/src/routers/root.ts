import { getRouter } from "../server"

const rootRouter = getRouter().get("/", (c) => {
  if (c.get("isRateLimited")) {
    return c.json({ error: "Rate limited" }, { status: 429 })
  }

  return c.text("Hello, Hono!3")
})

export default rootRouter
