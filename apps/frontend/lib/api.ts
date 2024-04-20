import apiClientFactory from "@repo/api/client"
import { AppLoadContext } from "@remix-run/cloudflare"

const getApi = ({ context: ctx }: { context: AppLoadContext }) => {
  const { BACKEND, API_MODE } = ctx.cloudflare.env
  // we need to set some hostname, even if used with Service Bindings at production
  // https://community.cloudflare.com/t/service-binding-to-other-worker-not-working/559030/5
  const basePath = API_MODE === "production" ? "/" : "http://localhost:8787"
  //@ts-expect-error type of 1st-arg does not match...
  const fetchOptions: Parameters<typeof apiClientFactory>["1"] =
    API_MODE === "production"
      ? { fetch: BACKEND.fetch.bind(BACKEND) }
      : undefined

  return apiClientFactory(basePath, fetchOptions)
}

export { getApi }
