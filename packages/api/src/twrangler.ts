import { defineConfig } from "twrangler"

const BACKEND_NAME = "remix-hono-turbo-backend"

type BackendConfigOptions = {
  main: string
}

const getBackendConfig = ({ main }: BackendConfigOptions) =>
  defineConfig({
    compatibility_date: "2024-04-03",
    main,
    name: BACKEND_NAME,
  })

export { getBackendConfig }
