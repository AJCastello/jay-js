import type { ZodType } from "zod";
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
				// Para validação de campo único, validamos o objeto inteiro e depois filtramos
				try {
					await schema.parseAsync(values);
					return { errors: [] };
				} catch (error: any) {
					// Filtra apenas os erros do campo específico
					if (error && error.issues && Array.isArray(error.issues)) {
						const fieldErrors = error.issues
							.map((issue: any) => ({
								path: Array.isArray(issue.path) ? issue.path.join(".") : String(issue.path || "unknown"),
								message: issue.message || "Validation error",
							}))
							.filter((err: any) =>
								err.path === fieldName || err.path.startsWith(`${fieldName}.`)
							);

						return { errors: fieldErrors };
					}
					throw error;
				}
			} else {
				await schema.parseAsync(values);
				return { errors: [] };
			}
		} catch (error: any) {
			if (error && error.issues && Array.isArray(error.issues)) {
				const errors = error.issues.map((issue: any) => ({
					path: Array.isArray(issue.path) ? issue.path.join(".") : String(issue.path || "unknown"),
					message: issue.message || "Validation error",
				}));
				return { errors };
			}
			return { errors: [{ path: "unknown", message: "Unknown error" }] };
		}
	};
}
