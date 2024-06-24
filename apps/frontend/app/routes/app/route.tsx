import type { MetaFunction } from "@remix-run/cloudflare";

import { Container } from "@mantine/core";
import { unstable_defineLoader } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";

import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import { getSessionCookieHelper } from "../../../lib/session";

export const meta: MetaFunction = () => {
  return [
    { title: "BurnTodo" },
    {
      content: "A simple todo app built with Hono and Remix",
      name: "description",
    },
  ];
};

export const loader = unstable_defineLoader(async ({ context, request }) => {
  const helper = getSessionCookieHelper(context);
  const session = await helper.getSession(request.headers.get("Cookie"));
  if (session.has("userName")) {
    // Redirect to the home page if they are already signed in.
    return { loggedIn: true };
  }
  return { loggedIn: false };
});

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
