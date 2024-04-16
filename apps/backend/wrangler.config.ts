import { getBackendConfig } from "@repo/api/twrangler"

const config = getBackendConfig({
  main: "src/index.ts",
})

export default config
