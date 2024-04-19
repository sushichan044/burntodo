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

export async function loader({ context }: LoaderFunctionArgs) {
  const api = getApi({ context })
  return await api.index.$get().then((res) => res.json())
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
    </Container>
  )
}
