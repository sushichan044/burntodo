import { useFetcher, useLoaderData } from "@remix-run/react"

import { getApi } from "@/lib/api"
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
} from "@remix-run/cloudflare"
import { todoInsertSchema } from "@repo/api/schema/zod"
import { randomUUID } from "node:crypto"
import Todo from "@/app/routes/_app.app/Todo"
import Button from "@/components/element/Button"

export async function loader({ context }: LoaderFunctionArgs) {
  const api = getApi({ context })
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
                key={task.id}
                task={task}
                doneTask={() => {
                  fetcher.submit({ id: task.id }, { method: "DELETE" })
                }}
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
              minLength={1}
              className="block border-zinc-200 border rounded p-2"
              type="text"
              name="title"
              id="title"
            />
          </div>
          <div>
            <label className="mb-1 text-zinc-500" htmlFor="description">
              Description
            </label>
            <input
              minLength={1}
              className="block border-zinc-200 border rounded p-2"
              type="text"
              name="description"
              id="description"
            />
          </div>
          <Button
            variant={{ color: "sky", size: "md", variant: "normal" }}
            className="font-bold"
            type="submit"
            disabled={disabled}
          >
            {text}
          </Button>
        </fetcher.Form>
      </section>
    </div>
  )
}

export async function action({ request, context }: ActionFunctionArgs) {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData()
      const id = randomUUID()
      const data = {
        ...Object.fromEntries(formData.entries()),
        id: id,
        done: false,
      }
      const todo = await todoInsertSchema.safeParseAsync(data)
      if (!todo.success)
        return json({ error: todo.error.message, data: null }, 400)
      const api = getApi({ context })
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
      if (!id) return json({ error: "id is required", data: null }, 400)
      const api = getApi({ context })
      return await api.todo[":id"]
        .$delete({
          param: { id: id.toString() },
        })
        .then((res) => res.json())
        .catch((error) => {
          console.error(error)
          return { data: null, error: String(error) }
        })
    }
    default: {
      return json({ error: "method not allowed", data: null }, 405)
    }
  }
}
