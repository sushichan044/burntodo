import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

import { eventStream } from "remix-utils/sse/server";

type ProgressData = {
  label: string;
  value: number;
};

const write = (progress: ProgressData) => JSON.stringify(progress);

export function loader({ request }: LoaderFunctionArgs) {
  return eventStream(request.signal, (send) => {
    const eventFn = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      send({
        data: write({ label: "processing 1", value: 25 }),
        event: "progress",
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      send({
        data: write({ label: "processing 2", value: 50 }),
        event: "progress",
      });

      await new Promise((resolve) => setTimeout(resolve, 3000));
      send({
        data: write({ label: "processing 3", value: 75 }),
        event: "progress",
      });

      await new Promise((resolve) => setTimeout(resolve, 4000));
      send({ data: write({ label: "done!", value: 100 }), event: "progress" });
    };
    void eventFn();
    return () => {
      return { done: true };
    };
  });
}
