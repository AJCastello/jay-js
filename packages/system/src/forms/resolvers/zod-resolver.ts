import type { ZodObject, ZodType } from "zod";
import type { TResolver } from "../types";

/**
 * Creates a resolver function for validating form values using a Zod schema.
 *
 * @template T - The type of the form values.
 * @param {ZodType} schema - The Zod schema to validate the form values against.
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
export function zodResolver<T>(schema: ZodType<T>): TResolver<T> {
	return async (values: T, fieldName?: string) => {
		try {
			if (fieldName) {
				// Para validação de campo único, tentamos criar um schema parcial
				// Se o schema for um objeto, tentamos usar pick, senão validamos o campo diretamente
				const fieldValue = values[fieldName as keyof T];

				// Verifica se o schema tem o método pick (é um ZodObject)
				if (typeof (schema as any).pick === 'function') {
					const fieldSchema = (schema as any).pick({ [fieldName]: true });
					const singleFieldObject = { [fieldName]: fieldValue };
					await fieldSchema.parseAsync(singleFieldObject);
				} else {
					// Para outros tipos de schema, validamos o valor diretamente
					await schema.parseAsync(fieldValue);
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
