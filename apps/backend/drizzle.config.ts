import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials: {
    dbName: "remix-hono-turbo-example",
    wranglerConfigPath: "./wrangler.toml",
  },
  driver: "d1",
  out: "./migrations",
  schema: "../../packages/module/src/schema.ts",
  strict: true,
  verbose: true,
});
