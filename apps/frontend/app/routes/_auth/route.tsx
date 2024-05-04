import type { MetaFunction } from "@remix-run/cloudflare"

import AuthFooter from "@/app/routes/_auth/AuthFooter"
import Link from "@/components/element/Link"
import Header from "@/components/layout/Header"
import { Container } from "@mantine/core"
import { Outlet } from "@remix-run/react"
import { useLocation } from "@remix-run/react"

export const meta: MetaFunction = () => {
  return [
    { title: "BurnTodo" },
    {
      content: "A simple todo app built with Hono and Remix",
      name: "description",
    },
  ]
}

export default function AppLayout() {
  const { pathname } = useLocation()

  return (
    <>
      <Header hideUserMenu />
      <main className="flex flex-col items-center justify-center bg-white">
        <Container
          className="flex flex-1 flex-col gap-y-16 p-4 pt-[5vh] md:pt-[15vh]"
          size="xs"
        >
          <Outlet />
        </Container>
      </main>
      <AuthFooter>
        {pathname === "/login" ? (
          <p className="font-semibold">
            Don't have an account?{" "}
            <Link to="/signup" variants={{ hocus: "underline" }}>
              Sign up
            </Link>
          </p>
        ) : pathname === "/signup" ? (
          <p className="font-semibold">
            Already have an account?{" "}
            <Link to="/login" variants={{ hocus: "underline" }}>
              Log in
            </Link>
          </p>
        ) : (
          <p className="font-semibold">Have a good day!</p>
        )}
      </AuthFooter>
    </>
  )
}
