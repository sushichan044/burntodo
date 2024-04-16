import { apiClientFactory } from "@repo/api"
import { getRequestContext } from "@cloudflare/next-on-pages"

const getApi = () => {
  const { env } = getRequestContext()
  // we need to set some hostname, even if used with Service Bindings at production
  // https://community.cloudflare.com/t/service-binding-to-other-worker-not-working/559030/5
  const basePath = "http://localhost:8787"
  //@ts-expect-error type of 1st-arg does not match...
  const fetchOptions: Parameters<typeof apiClientFactory>["1"] =
    process.env.NODE_ENV === "production"
      ? { fetch: env.BACKEND.fetch.bind(env.BACKEND) }
      : undefined

  return apiClientFactory(basePath, fetchOptions)
}

export { getApi }
