import type { Route } from "./+types/route";

import { Button } from "@mantine/core";
import { data, redirect, useFetcher } from "react-router";
import { FiLogOut } from "react-icons/fi";

import { getSessionCookieHelper } from "../../../lib/session";

export const meta: Route.MetaFunction = ({ matches }) => {
  const parentMeta = matches
    .flatMap((match) => match?.meta ?? [])
    .filter((meta) => !("title" in meta));
  return [...parentMeta, { title: "Logout | BurnTodo" }];
};

export async function loader({ context, request }: Route.LoaderArgs) {
  const helper = getSessionCookieHelper(context);

  const session = await helper.getSession(request.headers.get("Cookie"));
  if (!session.has("userName")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/app");
  }

  return data(
    {},
    {
      headers: {
        "Set-Cookie": await helper.commitSession(session),
      },
    },
  );
}

export default function Route() {
  const fetcher = useFetcher<typeof action>();
  const loading = fetcher.state !== "idle";

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-center text-4xl font-bold">
          Log out from BurnTodo🔥
        </h1>
        <p className="text-center text-xl font-semibold text-zinc-600">
          Are you sure you want to log out?{" "}
        </p>
      </div>
      <fetcher.Form className="space-y-4" method="POST">
        <Button
          className="w-full font-bold"
          color="red"
          leftSection={<FiLogOut />}
          loading={loading}
          size="lg"
          type="submit"
        >
          Log out
        </Button>
      </fetcher.Form>
    </>
  );
}

export async function action({ context, request }: Route.ActionArgs) {
  const helper = getSessionCookieHelper(context);
  const session = await helper.getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await helper.destroySession(session),
    },
  });
}
