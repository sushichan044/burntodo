import { defineConfig } from "twrangler"

const BACKEND_NAME = "remix-hono-turbo-backend"

type BackendConfigOptions = {
  main: string
}

const getBackendConfig = ({ main }: BackendConfigOptions) =>
  defineConfig({
    name: BACKEND_NAME,
    main,
    compatibility_date: "2024-04-03",
  })

export { getBackendConfig }
