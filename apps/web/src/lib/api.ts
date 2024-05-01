import { getRequestContext } from "@cloudflare/next-on-pages"
import apiClientFactory from "@repo/api/client"

const getApi = () => {
  const { env } = getRequestContext()
  // fetch always needs hostname.
  const input = "http://localhost:8787"
  /*
  NODE_ENV=productionでビルドした場合は
  fetchをBACKEND.fetchに差し替えることでService Bindingsを利用する
   */
  // @ts-expect-error package/apiとapp:frontendで違うfetchが参照されており、fetchOptionsの型が一致しない
  const fetchOptions: Parameters<typeof apiClientFactory>[1] =
    process.env.NODE_ENV === "production"
      ? { fetch: env.BACKEND.fetch.bind(env.BACKEND) }
      : undefined
  const api = apiClientFactory(input, fetchOptions)
  return api
}

export { getApi }
