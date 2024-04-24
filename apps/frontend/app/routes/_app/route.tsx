import Container from "@/app/routes/_app/Container"
import { Outlet } from "@remix-run/react"

import Header from "./header"

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
