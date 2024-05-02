import type { MetaFunction } from "@remix-run/cloudflare"

import { REPO_URL } from "@/app/const"
import Link from "@/components/element/Link"
import { Button, Container } from "@mantine/core"
import { Figma, GitHub, Zap } from "react-feather"
export const meta: MetaFunction = () => {
  return [
    { title: "BurnTodo🔥" },
    {
      content: "A simple todo app built with Hono and Remix",
      name: "description",
    },
  ]
}

export default function Index() {
  return (
    <Container className="flex-1 space-y-8 p-4 pt-[15vh] md:space-y-16">
      <div>
        <h1 className="text-4xl font-bold text-zinc-950 md:text-6xl">
          BurnTodo🔥
        </h1>
        <p className="mt-3 break-keep text-2xl font-bold md:text-3xl">
          A Todo App built with
          <wbr /> <span className="text-orange-600">Hono</span> and{" "}
          <span className="text-blue-600">Remix</span>.
        </p>
        <p className="mt-4 text-lg font-semibold text-zinc-500">
          Backend and Frontend is connected via Cloudflare's{" "}
          <Link to="https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings">
            Service bindings!
          </Link>
          🚀
        </p>
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <Button
          color="orange"
          component={Link}
          leftSection={<Zap />}
          radius="md"
          size="lg"
          to="/signup"
          variant="filled"
          variants={{ color: "none" }}
        >
          Getting Started
        </Button>
        <Button
          color="blue"
          component={Link}
          leftSection={<Figma />}
          radius="md"
          size="lg"
          to="https://www.figma.com/file/0G1WPjQpdySKBhBsMR8aMl/Workers-Pages-Connect?type=whiteboard&node-id=0%3A1&t=INSAv3hwRCoZ161Q-1"
          variant="filled"
          variants={{ color: "none" }}
        >
          View Architecture
        </Button>
        <Button
          color="dark"
          component={Link}
          leftSection={<GitHub />}
          radius="md"
          size="lg"
          to={REPO_URL}
          variant="filled"
          variants={{ color: "none" }}
        >
          View on GitHub
        </Button>
      </div>
    </Container>
  )
}
