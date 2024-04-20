import apiClientFactory from "@repo/api/client"
import { AppLoadContext } from "@remix-run/cloudflare"

const getApi = ({
  context,
  request,
}: {
  context: AppLoadContext
  request: Request
}) => {
  const { BACKEND, API_MODE } = context.cloudflare.env
  const url = new URL(request.url)
  // we need to set some hostname, even if used with Service Bindings at production
  // https://community.cloudflare.com/t/service-binding-to-other-worker-not-working/559030/5
  const basePath =
    API_MODE === "production"
      ? `${url.protocol}//${url.hostname}`
      : "http://localhost:8787"

  const fetchOptions =
    API_MODE === "production"
      ? { fetch: BACKEND.fetch.bind(BACKEND) }
      : undefined

  // @ts-expect-error なんもわからん
  return apiClientFactory(basePath, fetchOptions)
}

export { getApi }
