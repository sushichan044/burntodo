import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dbCredentials: {
    dbName: "remix-hono-turbo-example",
    wranglerConfigPath: "../../apps/backend/wrangler.toml",
  },
  driver: "d1",
  out: "./drizzle",
  schema: "./src/db/schemas/index.ts",
  strict: true,
  verbose: true,
})
