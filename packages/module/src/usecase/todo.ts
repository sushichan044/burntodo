import type { z } from "zod"

import { eq } from "drizzle-orm"
import { randomUUID } from "node:crypto"
import { Err, Ok, type Result } from "ts-results"

import type { DBType } from "../core/db"
import type { TB_TodoSelect } from "../zod"

import { TB_todo } from "../schema"
import { TB_todoInsertSchema } from "../zod"

const CreateTodoSchema = TB_todoInsertSchema.pick({
  description: true,
  title: true,
  userName: true,
})
type CreateTodoInput = z.infer<typeof CreateTodoSchema>

const createTodo = async (
  input: CreateTodoInput,
  db: DBType,
): Promise<Result<TB_TodoSelect, string>> => {
  const id = randomUUID()
  const TodoParse = await TB_todoInsertSchema.safeParseAsync({ ...input, id })
  if (!TodoParse.success) {
    return Err(TodoParse.error.errors.map((e) => e.message).join(", "))
  }
  const todo = TodoParse.data

  try {
    const [already] = await db
      .select({ id: TB_todo.id })
      .from(TB_todo)
      .limit(1)
      .where(eq(TB_todo.id, todo.id))
    if (already?.id) {
      return Err("Todo already exists")
    }

    const [inserted] = await db.insert(TB_todo).values(todo).returning()
    if (!inserted) {
      return Err("Failed to create Todo")
    }

    return Ok(inserted)
  } catch (e) {
    if (e instanceof Error) {
      return Err(e.message)
    }
    return Err(String(e))
  }
}

const GetTodoSchema = TB_todoInsertSchema.pick({ id: true })
type GetTodoInput = z.infer<typeof GetTodoSchema>

const getTodo = async (
  input: GetTodoInput,
  db: DBType,
): Promise<Result<TB_TodoSelect, string>> => {
  try {
    const [Todo] = await db
      .select()
      .from(TB_todo)
      .where(eq(TB_todo.id, input.id))
      .limit(1)
    if (!Todo) {
      return Err("Todo not found")
    }
    return Ok(Todo)
  } catch (e) {
    if (e instanceof Error) {
      return Err(e.message)
    }
    return Err(String(e))
  }
}

const GetTodosByUserIdSchema = TB_todoInsertSchema.pick({ userName: true })
type GetTodosByUserIdInput = z.infer<typeof GetTodosByUserIdSchema>

const getTodosByUserId = async (
  input: GetTodosByUserIdInput,
  db: DBType,
): Promise<Result<TB_TodoSelect[], string>> => {
  try {
    const todos = await db
      .select()
      .from(TB_todo)
      .where(eq(TB_todo.userName, input.userName))
    return Ok(todos)
  } catch (e) {
    if (e instanceof Error) {
      return Err(e.message)
    }
    return Err(String(e))
  }
}

const DeleteTodoSchema = TB_todoInsertSchema.pick({ id: true })
type DeleteTodoInput = z.infer<typeof DeleteTodoSchema>

const deleteTodo = async (
  input: DeleteTodoInput,
  db: DBType,
): Promise<Result<null, string>> => {
  try {
    const [deleted] = await db
      .delete(TB_todo)
      .where(eq(TB_todo.id, input.id))
      .returning({ id: TB_todo.id })

    if (!deleted?.id) {
      return Err("Todo not found")
    }

    return Ok(null)
  } catch (e) {
    if (e instanceof Error) {
      return Err(e.message)
    }
    return Err(String(e))
  }
}

export { createTodo, deleteTodo, getTodo, getTodosByUserId }
export {
  CreateTodoSchema,
  DeleteTodoSchema,
  GetTodoSchema,
  GetTodosByUserIdSchema,
}
