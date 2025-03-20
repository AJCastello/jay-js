import { type ZodObject, ZodEffects, type ZodTypeAny } from "zod";
import { TResolver } from "../types";

type ValidZodSchema = ZodObject<any, any> | ZodEffects<ZodObject<any, any>>;

/**
 * Creates a resolver function for validating form values using a Zod schema.
 * 
 * @template T - The type of the form values.
 * @param {ValidZodSchema} schema - The Zod schema to validate the form values against.
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
export function zodResolver<T>(schema: ValidZodSchema): TResolver<T> {
  return async (values: T, fieldName?: string) => {
    try {
      if (fieldName) {
        const singleFieldObject = { [fieldName]: values[fieldName as keyof T] };
        // For ZodEffects, we need to validate the whole object even for single field
        if (schema instanceof ZodEffects) {
          await schema.parseAsync(values);
        } else {
          const fieldSchema = schema.pick({ [fieldName]: true });
          await fieldSchema.parseAsync(singleFieldObject);
        }
      } else {
        await schema.parseAsync(values);
      }
      return { errors: [] };
    } catch (error: any) {
      if (error && error.errors && error.errors.length > 0) {
        const errors = error.errors.map((err: any) => ({
          path: Array.isArray(err.path) ? err.path.join(".") : err.path || "unknown",
          message: err.message,
        }));
        return { errors };
      }
      return { errors: [{ path: "unknown", message: "Unknown error" }] };
    }
  };
}