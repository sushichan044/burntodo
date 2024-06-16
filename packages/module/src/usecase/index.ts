export {
  CreateTodoSchema,
  DeleteTodoSchema,
  GetTodoSchema,
  GetTodosByUserNameSchema,
} from "./todo";
export {
  CreateUserSchema,
  DeleteUserSchema,
  GetUserSchema,
  VerifyUserSchema,
} from "./user";

import { BaseUseCase } from "../core/usecase";
import { TodoUseCase } from "./todo";
import { UserUseCase } from "./user";

class UseCase extends BaseUseCase {
  readonly todo = new TodoUseCase(this.db);
  readonly user = new UserUseCase(this.db);
}

export { UseCase };
