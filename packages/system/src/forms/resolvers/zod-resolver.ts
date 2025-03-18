import type { ZodObject } from "zod";
import { TResolver } from "../types";

/**
 * Creates a resolver function for validating form values using a Zod schema.
 * 
 * @template T - The type of the form values.
 * @param {ZodObject<any, any>} schema - The Zod schema to validate the form values against.
 * @returns {TResolver<T>} A resolver function that validates the form values and returns validation errors, if any.
 * 
 * The resolver supports validating either the entire form or a single field:
 * - If `fieldName` is provided, only the specified field is validated.
 * - If `fieldName` is not provided, the entire form is validated.
 * 
 * The returned resolver function:
 * - Accepts the form values and an optional field name.
 * - Returns an object containing an array of validation errors, or an empty array if validation passes.
 */
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