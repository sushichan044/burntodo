import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@react-router/cloudflare" {
  // or cloudflare, deno, etc.
  interface Future {
    v3_singleFetch: true;
  }
}

const ReactCompilerConfig = {};

export default defineConfig({
  plugins: [
    reactRouter(),
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
