import { z } from "zod"

const NewTodoSchema = z.object({
  description: z.string().optional(),
  title: z.string({ required_error: "Title is required." }).min(1),
})

const DeleteTodoSchema = z.object({
  id: z.string(),
})

export { DeleteTodoSchema, NewTodoSchema }
