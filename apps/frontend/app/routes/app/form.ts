import { z } from "zod"

const NewTodoSchema = z.object({
  description: z.string().min(1, "Description is required"),
  title: z.string().min(1, "Title is required"),
})
export { NewTodoSchema }
