import Header from "@/components/layout/Header"
import { Outlet } from "@remix-run/react"

export default function Layout() {
  return (
    <>
      <Header />
      <main className="bg-zinc-50">
        <Outlet />
      </main>
    </>
  )
}
