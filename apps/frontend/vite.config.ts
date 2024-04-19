import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    // 改行対策
    remixCloudflareDevProxy(),
    remix(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    host: true,
  },
})
