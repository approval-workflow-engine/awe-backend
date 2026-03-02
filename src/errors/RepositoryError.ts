import { AppError } from "./AppError.js";

export class RepositoryError extends AppError {
  constructor(message = "Database operation failed", cause?: unknown) {
    super(message, 500, cause);
  }
}
