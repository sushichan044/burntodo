import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare"

import { commitSession, getSession } from "@/app/sessions.server"
import { getApi } from "@/lib/api"
import { json, redirect, useFetcher, useLoaderData } from "@remix-run/react"
import Button from "@repo/ui/elements/Button"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  if (session.has("userName")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/app")
  }

  const data = { error: session.get("error") }

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  })
}

export default function Route() {
  const fetcher = useFetcher<typeof action>()
  const { error } = useLoaderData<typeof loader>()

  const { disabled, text } = (() => {
    if (fetcher.state === "idle") return { disabled: false, text: "Login" }
    if (fetcher.state === "submitting")
      return { disabled: true, text: "Submitting..." }
    return { disabled: true, text: "loading..." }
  })()

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-3xl font-bold">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      {fetcher.data?.error && (
        <span className="text-red-500">{fetcher.data.error}</span>
      )}
      <fetcher.Form className="space-y-4" method="POST">
        <div>
          <label className="mb-1 text-zinc-500" htmlFor="user-name">
            Name
          </label>
          <input
            className="block rounded border border-zinc-200 p-2"
            id="user-name"
            name="name"
            type="text"
          />
        </div>
        <Button
          className="font-bold"
          disabled={disabled}
          type="submit"
          variant={{ color: "sky", size: "md", variant: "normal" }}
        >
          {text}
        </Button>
      </fetcher.Form>
    </div>
  )
}

export async function action({ context, request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  const api = getApi({ context })
  const formData = await request.formData()
  const name = formData.get("name")
  if (!name || typeof name !== "string") {
    return json({ data: null, error: "Name is required" }, { status: 400 })
  }
  const result = await api.user
    .$get({ query: { name } })
    .then((res) => res.json())

  if (result.error) {
    return json({ data: null, error: result.error }, { status: 500 })
  }
  if (result.data == null) {
    return json({ data: null, error: "Failed to login" }, { status: 500 })
  }

  session.set("userName", result.data.name)
  return redirect("/app", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  })
}
