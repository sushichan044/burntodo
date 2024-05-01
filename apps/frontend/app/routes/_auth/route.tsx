import Container from "@/components/Container"
import { Outlet } from "@remix-run/react"

export default function AppLayout() {
  return (
    <main className="bg-sky-50">
      <Container>
        <Outlet />
      </Container>
    </main>
  )
}
