import { createMiddleware } from "hono/factory"
import { Env, Input } from "hono"
import { Config, CloudflareRateLimit } from "./types"

function createCloudflareRateLimitMiddleware<
  E extends Env = Env,
  P extends string = string,
  I extends Input = Input,
>({ rateLimitFactory, keyFactory, isRateLimitedProperty }: Config<E, P, I>) {
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
