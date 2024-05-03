import type { TB_TodoSelect } from "@repo/module/zod"

import Todo from "@/app/routes/app._index/Todo"
import { AnimatePresence } from "framer-motion"
import { LazyMotion, domAnimation } from "framer-motion"

type TodoWrapperProps = {
  todos: Pick<TB_TodoSelect, "description" | "id" | "title">[]
}

const TodoWrapper: React.FC<TodoWrapperProps> = ({ todos }) => {
  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence mode="wait">
        <div className="flex max-h-[80vh] flex-col gap-y-1.5 overflow-y-auto scrollbar scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full scrollbar-w-2 md:gap-y-3">
          {todos.map((task, i) => {
            return <Todo key={i} task={task} />
          })}
        </div>
      </AnimatePresence>
    </LazyMotion>
  )
}

export default TodoWrapper
