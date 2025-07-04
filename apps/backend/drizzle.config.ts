import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dbCredentials: {
    accountId: "00000000000000000000000000000000",
    databaseId: "remix-hono-turbo-example",
    token: "00000000000000000000000000000000",
  },
  dialect: "sqlite",
  driver: "d1-http",
  out: "./migrations",
  schema: "../../packages/module/src/schema.ts",
  strict: true,
  verbose: true,
});
