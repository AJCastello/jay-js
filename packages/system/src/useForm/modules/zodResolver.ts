import type { ZodObject } from "zod";
import { TResolver } from "../types";

export function zodResolver<T>(schema: ZodObject<any, any>): TResolver<T> {
  return async (values: T, fieldName?: string) => {
    try {
      if (fieldName) {
        const singleFieldObject = { [fieldName]: values[fieldName as keyof T] };
        const fieldSchema = schema.pick({ [fieldName]: true });
        fieldSchema.parse(singleFieldObject);
      } else {
        schema.parse(values);
      }
      return { errors: [] };
    } catch (error: any) {
      if (error && error.errors.length > 0) {
        const errors = error.errors.map((err: any) => ({
          path: err.path.join(".") || "unknown",
          message: err.message,
        }));
        return { errors };
      }
      return { errors: [{ path: "unknown", message: "Unknown error" }] };
    }
  };
}

