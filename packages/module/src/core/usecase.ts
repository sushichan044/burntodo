import type { DBType } from "./db";

class BaseUseCase {
  protected db: DBType;
  constructor(db: DBType) {
    this.db = db;
  }
}

export { BaseUseCase };
