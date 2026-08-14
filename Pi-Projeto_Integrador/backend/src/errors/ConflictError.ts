import { AppError } from "./AppError";
export class ConflictError extends AppError {
  constructor(readonly fields: string[]) {
    super(
      fields.length > 1
        ? `Os seguintes campos já estão em uso: ${fields.join(", ")}`
        : `O seguinte campo já está em uso: ${fields[0]}`,
      409,
    );
  }
  override toJSON() {
    return {
      success: false,
      message: this.message,
      fields: this.fields,
    };
  }
}