import { getApi } from "@/lib/api"

export default async function Page() {
  const api = getApi()
  const todos = await api.user
    .$get()
    .then((res) => res.json())
    .catch((err) => {
      return {
        data: null,
        error: String(err),
      }
    })

  return (
    <div className="space-y-4">
      <h1>Todos</h1>
      {todos.error && <p className="text-red-500">{todos.error}</p>}
      {todos.data && (
        <ul className="grid grid-cols-2">
          {todos.data.map((todo) => (
            <li key={todo.name}>{todo.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const runtime = "edge"
