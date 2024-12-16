import * as z from "zod";
import { TResolver } from "../types";

export function zodResolver<T>(schema: z.ZodObject<any, any>): TResolver<T> {
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
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => ({
          path: err.path.join(".") || "unknown",
          message: err.message,
        }));
        return { errors };
      }
      return { errors: [{ path: "unknown", message: "Unknown error" }] };
    }
  };
}

