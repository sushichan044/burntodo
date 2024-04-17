import { getRequestContext } from "@cloudflare/next-on-pages"
import { apiClientFactory } from "@repo/api"

const getApi = () => {
  const { env } = getRequestContext()
  const baseUrl = "https://localhost:8787"
  // @ts-expect-error type of 1st-arg does not match...
  const fetchOptions: Parameters<typeof apiClientFactory>["1"] =
    env.API_MODE === "production"
      ? { fetch: env.BACKEND.fetch.bind(env.BACKEND) }
      : undefined
  const api = apiClientFactory(baseUrl, fetchOptions)
  return api
}

export { getApi }
