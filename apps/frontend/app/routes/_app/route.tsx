import Container from "@/app/routes/_app/Container"
import Header from "./header"
import { Outlet } from "@remix-run/react"

export default function AppLayout() {
  return (
    <>
      <Header />
      <main className="bg-sky-50">
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  )
}
