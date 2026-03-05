import { AppError } from "./AppError.js";

export class AuthError extends AppError {
  constructor(message: string = "Invalid credentials", cause?: unknown) {
    super(message, 401, cause);
  }
}
