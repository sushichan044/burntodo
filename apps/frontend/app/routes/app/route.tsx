import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { getSessionCookieHelper } from "@/lib/session";
import { Container } from "@mantine/core";
import { json } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "BurnTodo" },
    {
      content: "A simple todo app built with Hono and Remix",
      name: "description",
    },
  ];
};

export async function loader({ context, request }: LoaderFunctionArgs) {
  const helper = getSessionCookieHelper(context);
  const session = await helper.getSession(request.headers.get("Cookie"));
  if (session.has("userName")) {
    // Redirect to the home page if they are already signed in.
    return json({ loggedIn: true });
  }
  return json({ loggedIn: false });
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
