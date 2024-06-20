import { Button } from "@mantine/core";
import {
  type MetaFunction,
  unstable_defineAction,
  unstable_defineLoader,
} from "@remix-run/cloudflare";
import { useFetcher } from "@remix-run/react";
import { FiLogOut } from "react-icons/fi";

import { getSessionCookieHelper } from "../../../lib/session";

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !("title" in meta));
  return [...parentMeta, { title: "Logout | BurnTodo" }];
};

export const loader = unstable_defineLoader(
  async ({ context, request, response }) => {
    const helper = getSessionCookieHelper(context);

    const session = await helper.getSession(request.headers.get("Cookie"));
    if (!session.has("userName")) {
      // Redirect to the home page if they are already signed in.
      response.status = 303;
      response.headers.set("Location", "/app");
      throw response;
    }

    response.headers.set("Set-Cookie", await helper.commitSession(session));
    throw response;
  },
);

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

export const action = unstable_defineAction(
  async ({ context, request, response }) => {
    const helper = getSessionCookieHelper(context);
    const session = await helper.getSession(request.headers.get("Cookie"));

    response.headers.set("Set-Cookie", await helper.destroySession(session));
    response.status = 308;
    response.headers.set("Location", "/");
    throw response;
  },
);
