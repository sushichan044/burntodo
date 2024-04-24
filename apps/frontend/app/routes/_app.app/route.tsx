import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare"

import Todo from "@/app/routes/_app.app/Todo"
import Button from "@/components/element/Button"
import { getApi } from "@/lib/api"
import { json } from "@remix-run/cloudflare"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { todoInsertSchema } from "@repo/api/schema/zod"
import { randomUUID } from "node:crypto"

export async function loader({ context, request }: LoaderFunctionArgs) {
  const api = getApi({ context, request })
  return await api.todo
    .$get()
    .then((res) => res.json())
    .catch((error) => {
      console.error(error)
      return { data: null, error: String(error) }
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
      <section className="space-y-2 bg-white py-4 px-8 rounded">
        <h2 className="text-3xl mt-4 mb-2 font-bold">tasks</h2>
        <div className="flex flex-col flex-nowrap gap-y-3">
          {loaderData.data == null || loaderData.data.length === 0 ? (
            <span className="text-zinc-800 text-2xl text-center font-bold">
              All finished! Nice work! 🎉
            </span>
          ) : (
            loaderData.data.map((task) => (
              <Todo
                doneTask={() => {
                  fetcher.submit({ id: task.id }, { method: "DELETE" })
                }}
                key={task.id}
                task={task}
              />
            ))
          )}
        </div>
      </section>
      <section className="bg-white py-6 px-8 rounded">
        <h3 className="text-xl font-bold mb-1.5">Add new task</h3>
        <fetcher.Form className="space-y-4" method="POST">
          <div>
            <label className="mb-1 text-zinc-500" htmlFor="title">
              Title
            </label>
            <input
              className="block border-zinc-200 border rounded p-2"
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
              className="block border-zinc-200 border rounded p-2"
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
  const api = getApi({ context, request: request.clone() })
  switch (request.method) {
    case "POST": {
      const formData = await request.formData()
      const id = randomUUID()
      const data = {
        ...Object.fromEntries(formData.entries()),
        done: false,
        id: id,
      }
      const todo = await todoInsertSchema.safeParseAsync(data)
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
      if (!id) return json({ data: null, error: "id is required" }, 400)
      return await api.todo[":id"]
        .$delete({
          param: { id: String(id) },
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
