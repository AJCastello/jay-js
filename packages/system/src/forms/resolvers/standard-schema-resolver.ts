import type { TFormValidateResult, TResolver } from "../types.js";

export interface StandardSchemaV1 {
	"~standard": {
		version: 1;
		vendor: string;
		validate: (
			value: unknown,
		) =>
			| { value: unknown; issues?: undefined }
			| { issues: Array<{ message: string; path?: (string | number)[] }> };
	};
}

export function standardSchemaResolver<T>(schema: StandardSchemaV1): TResolver<T> {
	return async (values: T, fieldName?: string) => {
		const standard = schema["~standard"];

		if (!standard || standard.version !== 1) {
			throw new Error("Invalid Standard Schema: missing or incompatible version");
		}

		const result = standard.validate(values);

		if (result.issues) {
			const errors: TFormValidateResult["errors"] = result.issues
				.filter((issue) => {
					if (!fieldName) return true;
					const path = Array.isArray(issue.path) ? issue.path.join(".") : String(issue.path || "");
					return path === fieldName || path.startsWith(`${fieldName}.`);
				})
				.map((issue) => ({
					path: Array.isArray(issue.path) ? issue.path.join(".") : String(issue.path || ""),
					message: issue.message,
				}));

			return { errors };
		}

		return { errors: [] };
	};
}
