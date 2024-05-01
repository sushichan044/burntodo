import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare"

import Todo from "@/app/routes/_app.app/Todo"
import { commitSession, getSession } from "@/app/sessions.server"
import { getApi } from "@/lib/api"
import { json, redirect } from "@remix-run/cloudflare"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { CreateTodoSchema } from "@repo/module/usecase/todo"
import Button from "@repo/ui/elements/Button"

export async function loader({ context, request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  const userName = session.get("userName")
  if (!userName) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login")
  }

  const api = getApi({ context })
  const res = await api.todo.search
    .$get({ query: { userName } })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error)
      return { data: null, error: String(error) }
    })

  return json(res, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  })
}

export default function Route() {
  const loaderData = useLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof action>()
  const { disabled, text } = (() => {
    if (fetcher.state === "idle") return { disabled: false, text: "Add todo" }
    if (fetcher.state === "submitting")
      return { disabled: true, text: "Submitting..." }
    return { disabled: true, text: "loading..." }
  })()

  return (
    <div className="flex flex-col gap-y-8">
      {fetcher.data?.error && (
        <span className="text-red-500">{fetcher.data.error}</span>
      )}
      <section className="space-y-2 rounded bg-white px-8 py-4">
        <h2 className="mb-2 mt-4 text-3xl font-bold">tasks</h2>
        <div className="flex flex-col flex-nowrap gap-y-3">
          {loaderData.data == null || loaderData.data.length === 0 ? (
            <span className="text-center text-2xl font-bold text-zinc-800">
              All finished! Nice work! 🎉
            </span>
          ) : (
            loaderData.data.map(({ description, id, title }) => (
              <Todo
                doneTask={() => {
                  fetcher.submit({ id }, { method: "DELETE" })
                }}
                key={id}
                task={{ description, id, title }}
              />
            ))
          )}
        </div>
      </section>
      <section className="rounded bg-white px-8 py-6">
        <h3 className="mb-1.5 text-xl font-bold">Add new task</h3>
        <fetcher.Form className="space-y-4" method="POST">
          <div>
            <label className="mb-1 text-zinc-500" htmlFor="title">
              Title
            </label>
            <input
              className="block rounded border border-zinc-200 p-2"
              id="title"
              minLength={1}
              name="title"
              type="text"
            />
          </div>
          <div>
            <label className="mb-1 text-zinc-500" htmlFor="description">
              Description
            </label>
            <input
              className="block rounded border border-zinc-200 p-2"
              id="description"
              minLength={1}
              name="description"
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
      </section>
    </div>
  )
}

export async function action({ context, request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  const userName = session.get("userName")
  if (!userName) {
    // Redirect to the home page if they are already signed in.
    return redirect("/login")
  }

  const api = getApi({ context })
  switch (request.method) {
    case "POST": {
      const formData = await request.formData()
      const data = {
        ...Object.fromEntries(formData.entries()),
        userName,
      }
      const todo = await CreateTodoSchema.safeParseAsync(data)
      if (!todo.success)
        return json({ data: null, error: todo.error.message }, 400)
      return await api.todo
        .$post({ json: todo.data })
        .then((res) => res.json())
        .catch((error) => {
          console.error(error)
          return { data: null, error: String(error) }
        })
    }
    case "DELETE": {
      const formData = await request.formData()
      const id = formData.get("id")
      if (!id || typeof id !== "string")
        return json({ data: null, error: "id is required" }, 400)
      return await api.todo[":id"]
        .$delete({
          param: { id },
        })
        .then((res) => res.json())
        .catch((error) => {
          console.error(error)
          return { data: null, error: String(error) }
        })
    }
    default: {
      return json({ data: null, error: "method not allowed" }, 405)
    }
  }
}
