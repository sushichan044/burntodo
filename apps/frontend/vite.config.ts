import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // 改行対策
    remixCloudflareDevProxy(),
    remix(),
    tsconfigPaths(),
  ],
  server: {
    host: true,
  },
  ssr: {
    noExternal: ["ts-results"],
  },
});
