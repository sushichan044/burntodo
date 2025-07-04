import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

const ReactCompilerConfig = {};

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    babel({
      babelConfig: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        presets: ["@babel/preset-typescript"], // if you use TypeScript
      },
      filter: /\.[jt]sx?$/,
    }),
    tailwindcss(),
    reactRouter(),
  ],
  server: {
    host: true,
  },
});
