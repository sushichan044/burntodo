import type { z } from "zod"

import { eq } from "drizzle-orm"
import { randomUUID } from "node:crypto"
import { Err, Ok, type Result } from "ts-results"

import type { DBType } from "../core/db"
import type { TB_UserSelect } from "../zod"

import { TB_user } from "../schema"
import { TB_userInsertSchema } from "../zod"

const CreateUserSchema = TB_userInsertSchema.pick({ name: true })
type CreateUserInput = z.infer<typeof CreateUserSchema>

const createUser = async (
  input: CreateUserInput,
  db: DBType,
): Promise<Result<TB_UserSelect, string>> => {
  const id = randomUUID()
  const userParse = await TB_userInsertSchema.safeParseAsync({ ...input, id })
  if (!userParse.success) {
    return Err(userParse.error.errors.map((e) => e.message).join(", "))
  }
  const user = userParse.data

  try {
    const [already] = await db
      .select()
      .from(TB_user)
      .limit(1)
      .where(eq(TB_user.name, user.name))
    if (already) {
      return Err("User already exists")
    }

    const [inserted] = await db.insert(TB_user).values(user).returning()
    if (!inserted) {
      return Err("Failed to create user")
    }

    return Ok(inserted)
  } catch (e) {
    if (e instanceof Error) {
      return Err(e.message)
    }
    return Err(String(e))
  }
}

const GetUserSchema = TB_userInsertSchema.pick({ name: true })
type GetUserInput = z.infer<typeof GetUserSchema>

const getUser = async (
  input: GetUserInput,
  db: DBType,
): Promise<Result<TB_UserSelect, string>> => {
  try {
    const [user] = await db
      .select()
      .from(TB_user)
      .where(eq(TB_user.name, input.name))
      .limit(1)

    if (!user) {
      return Err("User not found")
    }

    return Ok(user)
  } catch (e) {
    if (e instanceof Error) {
      return Err(e.message)
    }
    return Err(String(e))
  }
}

const getUserByNameSchema = TB_userInsertSchema.pick({ name: true })
type GetUserByNameInput = z.infer<typeof getUserByNameSchema>

const getUserByName = async (
  input: GetUserByNameInput,
  db: DBType,
): Promise<Result<TB_UserSelect, string>> => {
  try {
    const [user] = await db
      .select()
      .from(TB_user)
      .where(eq(TB_user.name, input.name))
      .limit(1)

    if (!user) {
      return Err("User not found")
    }

    return Ok(user)
  } catch (e) {
    if (e instanceof Error) {
      return Err(e.message)
    }
    return Err(String(e))
  }
}

const getUserWithTodos = async (
  input: GetUserInput,
  db: DBType,
): Promise<
  Result<
    | {
        createdAt: Date
        name: string
        todos: {
          createdAt: Date
          description: string
          id: string
          title: string
          updatedAt: Date
          userName: string
        }[]
        updatedAt: Date
      }
    | undefined,
    string
  >
> => {
  try {
    const user = await db.query.TB_user.findFirst({
      where: (fields, { eq }) => eq(fields.name, input.name),
      with: {
        todos: true,
      },
    })
    if (!user) {
      return Err("User not found")
    }

    return Ok(user)
  } catch (e) {
    if (e instanceof Error) {
      return Err(e.message)
    }
    return Err(String(e))
  }
}

const DeleteUserSchema = TB_userInsertSchema.pick({ name: true })
type DeleteUserInput = z.infer<typeof DeleteUserSchema>

const deleteUser = async (
  input: DeleteUserInput,
  db: DBType,
): Promise<Result<null, string>> => {
  try {
    const [deleted] = await db
      .delete(TB_user)
      .where(eq(TB_user.name, input.name))
      .returning({ name: TB_user.name })

    if (!deleted) {
      return Err("User not found")
    }

    return Ok(null)
  } catch (e) {
    if (e instanceof Error) {
      return Err(e.message)
    }
    return Err(String(e))
  }
}

export { createUser, deleteUser, getUser, getUserByName, getUserWithTodos }
export {
  CreateUserSchema,
  DeleteUserSchema,
  GetUserSchema,
  getUserByNameSchema,
}
