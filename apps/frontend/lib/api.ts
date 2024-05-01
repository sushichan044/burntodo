import type { AppLoadContext } from "@remix-run/cloudflare"

import apiClientFactory from "@repo/api/client"

const getApi = ({ context }: { context: AppLoadContext }) => {
  const { BACKEND } = context.cloudflare.env

  // fetch always needs hostname.
  const input = "http://localhost:8787"
  /*
  NODE_ENV=productionでビルドした場合は
  fetchをBACKEND.fetchに差し替えることでService Bindingsを利用する
   */
  // @ts-expect-error package/apiとapp:frontendで違うfetchが参照されており、fetchOptionsの型が一致しない
  const fetchOptions: Parameters<typeof apiClientFactory>[1] = import.meta.env
    .PROD
    ? { fetch: BACKEND.fetch.bind(BACKEND) }
    : undefined

  return apiClientFactory(input, fetchOptions)
}

export { getApi }
