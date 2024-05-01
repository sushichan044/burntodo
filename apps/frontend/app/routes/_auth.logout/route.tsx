import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare"

import {
  commitSession,
  destroySession,
  getSession,
} from "@/app/sessions.server"
import { Button, Container } from "@mantine/core"
import { json, redirect, useFetcher } from "@remix-run/react"
import { LogOut } from "lucide-react"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  if (!session.has("userName")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/app")
  }

  return json(
    {},
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  )
}

export default function Route() {
  const fetcher = useFetcher<typeof action>()

  const { disabled, text } = (() => {
    if (fetcher.state === "idle") return { disabled: false, text: "Logout" }
    if (fetcher.state === "submitting")
      return { disabled: true, text: "Submitting..." }
    return { disabled: true, text: "loading..." }
  })()

  return (
    <Container className="flex flex-1 flex-col gap-y-16 p-4" size="xs">
      <h1 className="text-center text-4xl font-bold">
        Log out from BurnTodo🔥
      </h1>
      <fetcher.Form className="space-y-4" method="POST">
        <Button
          className="w-full font-bold"
          color="red"
          disabled={disabled}
          leftSection={<LogOut />}
          size="lg"
          type="submit"
        >
          {text}
        </Button>
      </fetcher.Form>
    </Container>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  })
}
