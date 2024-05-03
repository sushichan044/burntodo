import type { LoaderFunctionArgs } from "@remix-run/cloudflare"

import { getSession } from "@/app/sessions.server"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import { Container } from "@mantine/core"
import { json } from "@remix-run/cloudflare"
import { Outlet, useLoaderData } from "@remix-run/react"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))
  if (session.has("userName")) {
    // Redirect to the home page if they are already signed in.
    return json({ loggedIn: true })
  }
  return json({ loggedIn: false })
}

export default function AppLayout() {
  const { loggedIn } = useLoaderData<typeof loader>()

  return (
    <>
      <Header isLoggedIn={loggedIn} variants={{ theme: "app" }} />
      <main className="bg-slate-100">
        <Container size="sm">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}
