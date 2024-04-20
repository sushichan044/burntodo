import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/db/schemas/index.ts",
  driver: "d1",
  dbCredentials: {
    dbName: "remix-hono-turbo-example",
    wranglerConfigPath: "../../apps/backend/wrangler.toml",
  },
  out: "./drizzle",
  verbose: true,
  strict: true,
})
