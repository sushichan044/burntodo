import type { Context, Env, Input } from "hono"

type CloudflareRateLimitFunction = ({
  key,
}: {
  key: string
}) => Promise<{ success: boolean }>

type CloudflareRateLimit = {
  limit: CloudflareRateLimitFunction
}

type BooleanKeys<Obj extends Record<string, unknown> | undefined = undefined> =
  {
    [K in keyof Obj]: Obj[K] extends boolean ? K : never
  }[keyof Obj]

type CloudflareRateLimitFactory<
  E extends Env = Env,
  P extends string = string,
  I extends Input = Input,
> = (c: Context<E, P, I>) => CloudflareRateLimit

type KeyFactory<
  E extends Env = Env,
  P extends string = string,
  I extends Input = Input,
> = (c: Context<E, P, I>) => string

type Config<
  E extends Env = Env,
  P extends string = string,
  I extends Input = Input,
> = {
  rateLimitFactory: CloudflareRateLimitFactory<E, P, I>
  keyFactory: KeyFactory<E, P, I>
  isRateLimitedProperty: BooleanKeys<E["Variables"]>
}

export type { CloudflareRateLimit, Config }
