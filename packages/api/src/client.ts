import { hc } from "hono/client";

import type { routes } from "./server";

// see: https://hono.dev/docs/guides/rpc#compile-your-code-before-using-it-recommended
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = hc<typeof routes>("");
type Client = typeof client;

const apiClientFactory = (...args: Parameters<typeof hc>): Client =>
  hc<typeof routes>(...args);

export default apiClientFactory;
