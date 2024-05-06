
# BurnTodo🔥

This is an example Todo App. Backend is written in Hono🔥 and Frontend is written in Remix.

Both are deployed on Cloudflare Workers / Pages, and connected via [Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) and [Hono RPC](https://hono.dev/guides/rpc).

Architectural diagram can be seen [here](https://www.figma.com/file/0G1WPjQpdySKBhBsMR8aMl/Workers-Pages-Connect).

## Motivation

This architecture allows for independent and loosely coupled front-end and back-end implementations.
On the other hand, the actual API calls are type-assisted by Hono RPC and communicated within Cloudflare via Service Bindings, making them secure and fast.

The resulting backend API call via Service Bindings looks like this.
You can try this page at [here](https://burntodo.pages.dev/hello).

```tsx
import type { LoaderFunctionArgs } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"

export async function loader({ context }: LoaderFunctionArgs) {
  const api = getApi({ context }) // this is factory for hono/client
  return await api.hello
    .$get()
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      return { error: "Failed to fetch data", message: null }
    })
}

export default function Route() {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Response from backend</h1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  )
}
```

## Demo

Demo app is available at [here](https://burntodo.pages.dev/app).

TODO: add gif

## Setup

```bash
pnpm install
```

### frontend setup

```bash
cd apps/frontend
cp example.dev.vars .dev.vars

# put cookie secret for deploy
pnpm exec wrangler secret put COOKIE_SECRET
```

### backend setup

1. Create D1 databse.

  ```bash
  cd apps/backend
  pnpm exec wrangler d1 create <DATABASE_NAME>
  ```

2. Paste output to `apps/backend/wrangler.toml`.

  ```toml
  [[d1_databases]]
  binding = "DB" # i.e. available in your Worker on env.DB
  database_name = "<DATABASE_NAME>"
  database_id = "<DATABASE_ID>"
  ```

3. Modify `dbCredentials` in `apps/backend/drizzle.config.ts`.

  ```ts
  import { defineConfig } from "drizzle-kit"

  export default defineConfig({
    dbCredentials: {
      dbName: "<DATABASE_NAME>", // edit here!!!
      wranglerConfigPath: "./wrangler.toml",
    },
    driver: "d1",
    out: "./migrations",
    schema: "../../packages/module/src/schema.ts",
    strict: true,
    verbose: true,
  })
  ```

4. Put Password Salt.

  ```bash
  pnpm exec wrangler secret put PASSWORD_SALT
  ```

## Run Locally

1. Follow [setup](#setup) section.

2. Run `pnpm run dev` at project root.

## Acknowledgements

- [Remix(Frontend)](https://remix.run/docs/en/main)
- [Hono(backend)](https://hono.dev)
- [Cloudflare Workers / Pages for deploy](https://workers.cloudflare.com/)

## Project Structure

```tree
.
├── apps
│   ├── backend
│   │   ├── drizzle.config.ts -> Drizzle ORM configuration
│   │   ├── package.json
│   │   ├── src
│   │   │   └── index.ts      -> exports backend entrypoint from packages/api/src/server.ts
│   │   └── wrangler.toml     -> backend worker configuration
│   └── frontend
│       ├── app               -> Remix app
│       ├── lib
│       │   └── api.ts        -> exports api client from packages/api/src/client.ts
│       ├── load-context.ts
│       ├── package.json
│       ├── worker-configuration.d.ts -> types generated from wrangler.toml
│       └── wrangler.toml     -> frontend pages configuration
├── packages
│   ├── api
│   │   ├── package.json
│   │   └──  src              -> backend api built with Hono
│   └── module
│       └──  src              -> core module interact with DB
├── .gitignore
├── .prettierignore
├── eslint.config.mjs
├── package.json
├── README.md
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── prettier.config.mjs
├── README.md
├── tsconfig.json
└── turbo.json
```
