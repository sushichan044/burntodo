import Header from "@/components/layout/Header"
import { Container } from "@mantine/core"
import { Outlet } from "@remix-run/react"

export default function AppLayout() {
  return (
    <>
      <Header showUserMenu />
      <main className="bg-orange-50">
        <Container className="p-4" size="md">
          <Outlet />
        </Container>
      </main>
    </>
  )
}
