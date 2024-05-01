import type { TB_TodoSelect } from "@repo/module/zod"

import Button from "@repo/ui/elements/Button"
import React from "react"

type TodoProps = {
  doneTask: React.ComponentPropsWithoutRef<"button">["onClick"]
  task: Pick<TB_TodoSelect, "description" | "id" | "title">
}

const Todo: React.FC<TodoProps> = ({
  doneTask,
  task: { description, id, title },
}) => {
  return (
    <div className="flex flex-row gap-x-4" key={id}>
      <p className="inline-flex min-w-20 flex-col flex-nowrap">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-zinc-500">{description}</span>
      </p>
      <div>
        <Button
          className="font-bold"
          onClick={doneTask}
          type="button"
          variant={{ color: "green", size: "md", variant: "normal" }}
        >
          done
        </Button>
      </div>
    </div>
  )
}

export default Todo
