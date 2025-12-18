import type { TResolver } from "../types.js";
import { standardSchemaResolver, type StandardSchemaV1 } from "./standard-schema-resolver.js";
import { zodResolver } from "./zod-resolver.js";
import { yupResolver } from "./yup-resolver.js";

export function resolver<T>(schema: any): TResolver<T> {
	if (schema["~standard"]) {
		return standardSchemaResolver<T>(schema as StandardSchemaV1);
	}

	if (schema._def && typeof schema.parseAsync === "function") {
		return zodResolver(schema);
	}

	if (typeof schema.validate === "function") {
		return yupResolver<T>(schema);
	}

	throw new Error(
		"Unsupported schema type. Please use Zod, Yup, or a Standard Schema compatible library.",
	);
}
