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
  const fetchOptions = import.meta.env.PROD
    ? { fetch: BACKEND.fetch.bind(BACKEND) }
    : undefined

  // @ts-expect-error 第一引数の型が合わない
  return apiClientFactory(input, fetchOptions)
}

export { getApi }
