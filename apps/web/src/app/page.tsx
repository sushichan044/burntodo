import { getApi } from "@/lib/api"

export default async function Home() {
  const api = getApi()
  const res = await (await api.hello.$get()).text().catch((err) => String(err))

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {res}
      </div>
    </main>
  )
}

export const runtime = "edge"
