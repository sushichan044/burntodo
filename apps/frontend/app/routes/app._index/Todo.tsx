import type { TB_TodoSelect } from "@repo/module/zod"

import { cn } from "@/lib/cn"
import { useFetcher } from "@remix-run/react"
import React from "react"
import { FaFire } from "react-icons/fa6"

type TodoProps = {
  task: Pick<TB_TodoSelect, "description" | "id" | "title">
}

const Todo: React.FC<TodoProps> = ({ task: { description, id, title } }) => {
  const fetcher = useFetcher()

  const submitDelete = () => {
    const formData = new FormData()
    formData.append("id", id)
    fetcher.submit(formData, {
      action: "/app?index",
      method: "DELETE",
    })
  }

  return (
    <div
      className="flex flex-row items-center gap-x-4 rounded-xl bg-white p-4"
      key={id}
    >
      <button
        className={cn(
          "block aspect-square rounded-full p-[3px] font-bold",
          "border-2 text-white border-orange-500",
          "hover:border-orange-600 focus-within:border-orange-600 hover:bg-orange-600 focus-within:bg-orange-600",
          "transition duration-200 ease-in-out",
          "focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-[3px]",
          "group",
        )}
        onClick={submitDelete}
        type="button"
      >
        <FaFire
          className="text-current opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"
          size={20}
          strokeWidth={1}
        />
      </button>
      <div className="inline-flex flex-col flex-nowrap">
        <span className="text-xl font-bold text-slate-700">{title}</span>
        <span className="text-sm text-slate-500">{description}</span>
      </div>
    </div>
  )
}

export default Todo
