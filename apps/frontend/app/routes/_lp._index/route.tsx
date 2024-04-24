import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare"

import Container from "@/app/routes/_app/Container"
import ButtonLink from "@/components/element/ButtonLink"
import { getApi } from "@/lib/api"
import { useLoaderData } from "@remix-run/react"

export const meta: MetaFunction = () => {
  return [
    { title: "Todo App" },
    {
      content: "A simple todo app built with Remix and Hono",
      name: "description",
    },
  ]
}

export async function loader({ context, request }: LoaderFunctionArgs) {
  const api = getApi({ context, request })
  return await api.hello
    .$get()
    .then(async (res) => {
      const text = await res.clone().text()
      console.log(text)
      return await res.json()
    })
    .catch((err) => {
      return {
        error: String(err),
        message: "Failed to fetch message from the backend",
      }
    })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <Container className="space-y-4">
      <h1 className="text-5xl text-center font-bold">Todo App</h1>
      <ButtonLink
        className="block w-fit mx-auto font-bold"
        to="/app"
        variant={{ color: "green", size: "lg", variant: "light" }}
      >
        Go to app
      </ButtonLink>
      <h2 className="sr-only">Backend Message</h2>
      <p>
        Oh, there is a message from the backend: <strong>{data.message}</strong>
      </p>
      {data.error && (
        <p className="text-red-500">
          Error: <strong>{data.error}</strong>
        </p>
      )}
    </Container>
  )
}
