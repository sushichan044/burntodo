import { apiClientFactory } from "@repo/api"
import { AppLoadContext } from "@remix-run/cloudflare"

const getApi = (ctx: AppLoadContext) => {
  const { BACKEND } = ctx.cloudflare.env
  const basePath = import.meta.env.PROD ? "/" : "http://localhost:8787"
  const fetchOptions: Parameters<typeof apiClientFactory>["1"] = import.meta.env
    .PROD
    ? { fetch: BACKEND.fetch.bind(BACKEND) }
    : undefined

  const api = apiClientFactory(basePath, fetchOptions)
  return api
}

export { getApi }
