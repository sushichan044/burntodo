import { Container } from "@mantine/core";
import { Outlet, useLoaderData } from "react-router";

import type { Route } from "./+types/route";

import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import { getSessionCookieHelper } from "../../../lib/session";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "BurnTodo" },
    {
      content: "A simple todo app built with Hono and Remix",
      name: "description",
    },
  ];
};

export async function loader({ context, request }: Route.LoaderArgs) {
  const helper = getSessionCookieHelper(context);
  const session = await helper.getSession(request.headers.get("Cookie"));
  if (session.has("userName")) {
    // Redirect to the home page if they are already signed in.
    return { loggedIn: true };
  }
  return { loggedIn: false };
}

export default function AppLayout() {
  const { loggedIn } = useLoaderData<typeof loader>();

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
  );
}
