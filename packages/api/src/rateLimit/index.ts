import type { Env, Input } from "hono"

import { createMiddleware } from "hono/factory"

import type { CloudflareRateLimit, Config } from "./types"

function createCloudflareRateLimitMiddleware<
  E extends Env = Env,
  P extends string = string,
  I extends Input = Input,
>({ isRateLimitedProperty, keyFactory, rateLimitFactory }: Config<E, P, I>) {
  return createMiddleware<E, P, I>(async (c, next) => {
    const rateLimit = rateLimitFactory(c)
    const { success: isNotRateLimited } = await rateLimit.limit({
      key: keyFactory(c),
    })
    // @ts-expect-error Property does not exist until user sets Env
    c.set(isRateLimitedProperty, !isNotRateLimited)
    await next()
  })
}

export { createCloudflareRateLimitMiddleware }
export type { CloudflareRateLimit }
