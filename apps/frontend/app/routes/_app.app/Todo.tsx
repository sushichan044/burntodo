import Button from "@/components/element/Button"
import { TodoSelect } from "@repo/api/schema/zod"
import React from "react"

type TodoProps = {
  task: TodoSelect
  doneTask: React.ComponentPropsWithoutRef<"button">["onClick"]
}

const Todo: React.FC<TodoProps> = ({
  task: { id, description, title },
  doneTask,
}) => {
  return (
    <div className="flex flex-row gap-x-4" key={id}>
      <p className="inline-flex flex-col flex-nowrap min-w-20">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-zinc-500">{description}</span>
      </p>
      <div>
        <Button
          className="font-bold"
          onClick={doneTask}
          variant={{ color: "green", size: "md", variant: "normal" }}
          type="button"
        >
          done
        </Button>
      </div>
    </div>
  )
}

export default Todo
