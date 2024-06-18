import type { TB_TodoSelect } from "@repo/module/zod";

import Todo from "./Todo";

type TodoWrapperProps = {
  todos: Pick<TB_TodoSelect, "description" | "id" | "title">[];
};

const TodoWrapper: React.FC<TodoWrapperProps> = ({ todos }) => {
  return (
    <div className="flex max-h-[80vh] flex-col gap-y-1.5 overflow-y-auto scrollbar scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full scrollbar-w-2 md:gap-y-3">
      {todos.map((task, i) => {
        return <Todo key={i} task={task} />;
      })}
    </div>
  );
};

export default TodoWrapper;
