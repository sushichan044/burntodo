import { hc } from "hono/client"

import type { HonoRoutes } from "./server"

const apiClientFactory = hc<HonoRoutes>

export default apiClientFactory
