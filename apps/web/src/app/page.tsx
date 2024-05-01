import ButtonLink from "@/components/ui/ButtonLink"
import { getApi } from "../lib/api"

export default async function Home() {
  const api = getApi()
  const data = await api.todo
    .$get()
    .then((res) => res.json())
    .catch((err) => String(err))

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex">
        <ButtonLink href="/todos">Todos</ButtonLink>
        <ButtonLink href="/users">Users</ButtonLink>
      </div>
    </main>
  )
}

export const runtime = "edge"
