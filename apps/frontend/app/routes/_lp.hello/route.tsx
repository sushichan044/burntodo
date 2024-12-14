import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

import { Container } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";

import { getApi } from "../../../lib/api";

export async function loader({ context }: LoaderFunctionArgs) {
  const api = getApi({ context });
  return await api.hello
    .$get()
    .then(async (res) => res.json())
    .catch((err) => {
      console.error(err);
      return { error: "Failed to fetch data", message: null };
    });
}

export default function Route() {
  const data = useLoaderData<typeof loader>();

  return (
    <Container className="space-y-6 py-4" size="md">
      <h1 className="text-3xl font-bold">Response from backend</h1>
      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Response data</h2>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </section>
    </Container>
  );
}
