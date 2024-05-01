import Header from "@/components/layout/Header"
import { Outlet } from "@remix-run/react"

export default function AppLayout() {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center bg-white">
        <Outlet />
      </main>
    </>
  )
}
