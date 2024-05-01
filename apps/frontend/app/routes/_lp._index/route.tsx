import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare"

import ButtonLink from "@/components/ui/ButtonLink"
import { getApi } from "@/lib/api"
import { Container } from "@mantine/core"
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

export async function loader({ context }: LoaderFunctionArgs) {
  const api = getApi({ context })
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
    <Container className="flex-1 space-y-8 p-4">
      <h1 className="text-center text-5xl font-bold">BurnTodo🔥</h1>
      <p className="text-center text-2xl font-bold">
        A Todo App built with <span className="text-orange-600">Hono</span> and{" "}
        <span className="text-blue-600">Remix</span>.
      </p>
      <div className="mx-auto flex w-fit flex-row flex-nowrap gap-4">
        <ButtonLink
          className="mx-auto block w-fit font-bold"
          to="/signup"
          variant={{ color: "sky", size: "lg", variant: "normal" }}
        >
          Register
        </ButtonLink>
        <ButtonLink
          className="mx-auto block w-fit font-bold"
          to="/login"
          variant={{ color: "green", size: "lg", variant: "normal" }}
        >
          Log in
        </ButtonLink>
      </div>
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
