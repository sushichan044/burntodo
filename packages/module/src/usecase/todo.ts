import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { Err, Ok, type Result } from "ts-results";
import { z } from "zod";

import type { TB_TodoSelect } from "../zod";

import { BaseUseCase } from "../core/usecase";
import { TB_todo } from "../schema";
import { TB_todoInsertSchema } from "../zod";

const CreateTodoSchema = TB_todoInsertSchema.pick({
  description: true,
  title: true,
  userName: true,
});
type CreateTodoInput = z.infer<typeof CreateTodoSchema>;

const GetTodoSchema = TB_todoInsertSchema.pick({ id: true });
type GetTodoInput = z.infer<typeof GetTodoSchema>;

const GetTodoByUserNameSchema = z.object({ name: z.string() });
type GetTodoByUserNameInput = z.infer<typeof GetTodoByUserNameSchema>;

const DeleteTodoSchema = TB_todoInsertSchema.pick({ id: true });
type DeleteTodoInput = z.infer<typeof DeleteTodoSchema>;

class TodoUseCase extends BaseUseCase {
  async createTodo(
    input: CreateTodoInput,
  ): Promise<Result<TB_TodoSelect, string>> {
    const id = randomUUID();
    const TodoParse = await TB_todoInsertSchema.safeParseAsync({
      ...input,
      id,
    });
    if (!TodoParse.success) {
      return Err(TodoParse.error.errors.map((e) => e.message).join(", "));
    }
    const todo = TodoParse.data;

    try {
      const [already] = await this.db
        .select({ id: TB_todo.id })
        .from(TB_todo)
        .limit(1)
        .where(eq(TB_todo.id, todo.id));
      if (already?.id != null) {
        return Err("Todo already exists");
      }

      const [inserted] = await this.db.insert(TB_todo).values(todo).returning();
      if (!inserted) {
        return Err("Failed to create Todo");
      }

      return Ok(inserted);
    } catch (e) {
      if (e instanceof Error) {
        return Err(e.message);
      }
      return Err(String(e));
    }
  }

  async deleteTodo(input: DeleteTodoInput): Promise<Result<null, string>> {
    try {
      const [deleted] = await this.db
        .delete(TB_todo)
        .where(eq(TB_todo.id, input.id))
        .returning({ id: TB_todo.id });

      if (deleted?.id == null) {
        return Err("Todo not found");
      }

      return Ok(null);
    } catch (e) {
      if (e instanceof Error) {
        return Err(e.message);
      }
      return Err(String(e));
    }
  }

  async getAllTodo(
    options?: { limit: number; offset: number } | undefined,
  ): Promise<Result<TB_TodoSelect[], string>> {
    options ??= { limit: 100, offset: 0 };

    try {
      const todoItems = await this.db
        .select()
        .from(TB_todo)
        .limit(options.limit)
        .offset(options.offset);
      return Ok(todoItems);
    } catch (e) {
      if (e instanceof Error) {
        return Err(e.message);
      }
      return Err(String(e));
    }
  }

  async getTodo(input: GetTodoInput): Promise<Result<TB_TodoSelect, string>> {
    try {
      const [Todo] = await this.db
        .select()
        .from(TB_todo)
        .where(eq(TB_todo.id, input.id))
        .limit(1);
      if (!Todo) {
        return Err("Todo not found");
      }
      return Ok(Todo);
    } catch (e) {
      if (e instanceof Error) {
        return Err(e.message);
      }
      return Err(String(e));
    }
  }

  async getTodosByUserName(
    input: GetTodoByUserNameInput,
  ): Promise<Result<TB_TodoSelect[], string>> {
    try {
      const todos = await this.db
        .select()
        .from(TB_todo)
        .where(eq(TB_todo.userName, input.name));
      return Ok(todos);
    } catch (e) {
      if (e instanceof Error) {
        return Err(e.message);
      }
      return Err(String(e));
    }
  }
}

export { TodoUseCase };
export {
  CreateTodoSchema,
  DeleteTodoSchema,
  GetTodoByUserNameSchema as GetTodosByUserNameSchema,
  GetTodoSchema,
};
