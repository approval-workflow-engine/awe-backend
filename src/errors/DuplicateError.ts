import { AppError } from "./AppError.js";

export class DuplicateError extends AppError {
  constructor(resource: string) {
    super(`${resource} already exists`, 409);
  }
}
