import type { z } from "zod";

import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { Err, Ok, type Result } from "ts-results";

import type { TB_TodoSelect, TB_UserInsert, TB_UserSelect } from "../zod";

import { hashPassword, verifyPassword } from "../core/auth";
import { BaseUseCase } from "../core/usecase";
import { TB_user } from "../schema";
import { TB_userInsertSchema, TB_userSelectSchema } from "../zod";

const CreateUserSchema = TB_userInsertSchema.pick({
  name: true,
  password: true,
});
type CreateUserInput = z.infer<typeof CreateUserSchema>;

const GetUserSchema = TB_userInsertSchema.pick({ name: true });
type GetUserInput = z.infer<typeof GetUserSchema>;
type GetUserReturn = Omit<TB_UserSelect, "password">;
type GetUserWithTodoReturn = { todos: TB_TodoSelect[] } & GetUserReturn;

const VerifyUserSchema = TB_userSelectSchema.pick({
  name: true,
  password: true,
});
type VerifyUserInput = z.infer<typeof VerifyUserSchema>;

const DeleteUserSchema = TB_userInsertSchema.pick({ name: true });
type DeleteUserInput = z.infer<typeof DeleteUserSchema>;

class UserUseCase extends BaseUseCase {
  async createUser(
    input: CreateUserInput,
    salt: string,
  ): Promise<Result<TB_UserInsert, string>> {
    const id = randomUUID();
    const { password, ...rest } = input;
    const hashed = await hashPassword({ rawPassword: password, salt });
    const userParse = await TB_userInsertSchema.safeParseAsync({
      ...rest,
      id,
      password: hashed,
    });
    if (!userParse.success) {
      return Err(userParse.error.errors.map((e) => e.message).join(", "));
    }
    const user = userParse.data;

    try {
      const already = await this.db.query.TB_user.findFirst({
        columns: {
          name: true,
        },
        where: (fields, { eq }) => eq(fields.name, user.name),
      });
      if (already) {
        return Err("User already exists");
      }

      const [inserted] = await this.db.insert(TB_user).values(user).returning();
      if (!inserted) {
        return Err("Failed to create user");
      }

      return Ok(inserted);
    } catch (e) {
      if (e instanceof Error) {
        return Err(e.message);
      }
      return Err(String(e));
    }
  }

  async deleteUser(input: DeleteUserInput): Promise<Result<null, string>> {
    try {
      const [deleted] = await this.db
        .delete(TB_user)
        .where(eq(TB_user.name, input.name))
        .returning({ name: TB_user.name });

      if (!deleted) {
        return Err("User not found");
      }

      return Ok(null);
    } catch (e) {
      if (e instanceof Error) {
        return Err(e.message);
      }
      return Err(String(e));
    }
  }

  async getManyUsers(
    options?: { limit: number; offset: number } | undefined,
  ): Promise<Result<GetUserReturn[], string>> {
    options ??= { limit: 100, offset: 0 };
    try {
      const users = await this.db.query.TB_user.findMany({
        columns: {
          password: false,
        },
        limit: options.limit,
        offset: options.offset,
      });
      return Ok(users);
    } catch (e) {
      if (e instanceof Error) {
        return Err(e.message);
      }
      return Err(String(e));
    }
  }

  async getUser(input: GetUserInput): Promise<Result<GetUserReturn, string>> {
    try {
      const user = await this.db.query.TB_user.findFirst({
        columns: {
          password: false,
        },
        where: (fields, { eq }) => eq(fields.name, input.name),
      });

      if (!user) {
        return Err("User not found");
      }

      return Ok(user);
    } catch (e) {
      if (e instanceof Error) {
        return Err(e.message);
      }
      return Err(String(e));
    }
  }

  async getUserWithTodo(
    input: GetUserInput,
  ): Promise<Result<GetUserWithTodoReturn, string>> {
    try {
      const user = await this.db.query.TB_user.findFirst({
        columns: {
          password: false,
        },
        where: (fields, { eq }) => eq(fields.name, input.name),
        with: {
          todos: true,
        },
      });
      if (!user) {
        return Err("User not found");
      }

      return Ok(user);
    } catch (e) {
      if (e instanceof Error) {
        return Err(e.message);
      }
      return Err(String(e));
    }
  }

  async verifyUser(input: VerifyUserInput): Promise<Result<null, string>> {
    try {
      const user = await this.db.query.TB_user.findFirst({
        columns: {
          password: true,
        },
        where: (fields, { eq }) => eq(fields.name, input.name),
      });

      if (!user) {
        return Err("User not found");
      }

      const valid = await verifyPassword(input.password, user.password);
      if (!valid) {
        return Err("Invalid password");
      }

      return Ok(null);
    } catch (e) {
      if (e instanceof Error) {
        return Err(e.message);
      }
      return Err(String(e));
    }
  }
}

export { UserUseCase };
export { CreateUserSchema, DeleteUserSchema, GetUserSchema, VerifyUserSchema };
