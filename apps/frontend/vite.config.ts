import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";

const ReactCompilerConfig = {};

export default defineConfig({
  plugins: [
    // 改行対策
    remixCloudflareDevProxy(),
    remix({
      future: {
        unstable_singleFetch: true,
      },
    }),
    babel({
      babelConfig: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        presets: ["@babel/preset-typescript"], // if you use TypeScript
      },
      filter: /\.[jt]sx?$/,
    }),
    tsconfigPaths(),
  ],
  server: {
    host: true,
  },
  ssr: {
    noExternal: ["ts-results"],
  },
});
