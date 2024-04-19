import { Outlet } from "@remix-run/react"

export default function Layout() {
  return (
    <main className="bg-zinc-50">
      <Outlet />
    </main>
  )
}
