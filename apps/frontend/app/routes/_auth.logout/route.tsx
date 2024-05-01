import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare"

import {
  commitSession,
  destroySession,
  getSession,
} from "@/app/sessions.server"
import { json, redirect, useFetcher } from "@remix-run/react"
import Button from "@repo/ui/elements/Button"

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
    <div className="flex flex-col gap-y-8">
      <h1 className="text-3xl font-bold">Logout</h1>
      <fetcher.Form className="space-y-4" method="POST">
        <Button
          className="font-bold"
          disabled={disabled}
          type="submit"
          variant={{ color: "red", size: "md", variant: "normal" }}
        >
          {text}
        </Button>
      </fetcher.Form>
    </div>
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
