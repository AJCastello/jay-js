
import type { ObjectSchema } from "yup";
import { TResolver } from "../types";

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
			if (error && error.inner) {
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