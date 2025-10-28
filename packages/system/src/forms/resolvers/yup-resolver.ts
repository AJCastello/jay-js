import type { ObjectSchema } from "yup";
import type { TResolver } from "../types";

/**
 * A resolver function for validating form values using a Yup schema.
 *
 * @template T - The type of the form values.
 * @param {ObjectSchema<any>} schema - The Yup schema to validate against.
 * @returns {TResolver<T>} - A resolver function that validates the form values and returns validation errors, if any.
 *
 * The resolver function takes the form values and an optional field name as input.
 * If a field name is provided, it validates only that field. Otherwise, it validates the entire form.
 *
 * The function returns an object containing an array of errors. Each error includes:
 * - `path`: The path of the field with the error.
 * - `message`: The error message.
 *
 * If no errors are found, the `errors` array will be empty.
 */
export function yupResolver<T>(schema: ObjectSchema<any>): TResolver<T> {
	return async (values: T, fieldName?: string) => {
		try {
			if (fieldName) {
				await schema.validateAt(fieldName, values, { abortEarly: false });
			} else {
				await schema.validate(values, { abortEarly: false });
			}
			return { errors: [] };
		} catch (error: any) {
			if (error?.inner) {
				const formattedErrors = error.inner.length > 0 ? error.inner : [error];
				return {
					errors: formattedErrors.map((err: any) => ({
						path: err.path || "unknown",
						message: err.message,
					})),
				};
			}
			return { errors: [{ path: "unknown", message: "Unknown error" }] };
		}
	};
}
