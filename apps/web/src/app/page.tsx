import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex">
        <Link href="/todos">Todos</Link>
        <Link href="/users">Users</Link>
      </div>
    </main>
  )
}

export const runtime = "edge"
