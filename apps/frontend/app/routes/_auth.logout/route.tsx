import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare"

import {
  commitSession,
  destroySession,
  getSession,
} from "@/app/sessions.server"
import { Button } from "@mantine/core"
import { json, redirect, useFetcher } from "@remix-run/react"
import { LogOut } from "react-feather"

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
    <>
      <div className="space-y-4">
        <h1 className="text-center text-4xl font-bold">
          Log out from BurnTodo🔥
        </h1>
        <p className="text-center text-xl font-semibold text-zinc-600">
          Are you sure you want to log out?{" "}
        </p>
      </div>
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
    </>
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
