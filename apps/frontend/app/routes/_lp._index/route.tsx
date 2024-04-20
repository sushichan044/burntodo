import Container from "@/app/routes/_app/Container"
import ButtonLink from "@/components/element/ButtonLink"
import { getApi } from "@/lib/api"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"

export const meta: MetaFunction = () => {
  return [
    { title: "Todo App" },
    {
      name: "description",
      content: "A simple todo app built with Remix and Hono",
    },
  ]
}

export async function loader({ context, request }: LoaderFunctionArgs) {
  const api = getApi({ context, request })
  return await api.index
    .$get()
    .then(async (res) => {
      const text = await res.clone().text()
      console.log(text)
      return res.json()
    })
    .catch((err) => {
      return {
        message: "Failed to fetch message from the backend",
        error: String(err),
      }
    })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <Container className="space-y-4">
      <h1 className="text-5xl text-center font-bold">Todo App</h1>
      <ButtonLink
        className="block w-fit mx-auto"
        variant={{ color: "green", size: "lg", variant: "light" }}
        to="/app"
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
