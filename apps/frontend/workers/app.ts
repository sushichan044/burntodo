import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      ctx: ExecutionContext;
      env: CloudflareEnv;
    };
  }
}

const requestHandler = createRequestHandler(
  async () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    return requestHandler(request, {
      cloudflare: { ctx, env },
    });
  },
} satisfies ExportedHandler<CloudflareEnv>;
