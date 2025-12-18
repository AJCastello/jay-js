import type { YupObjectSchema, ZodSchema } from "../types/external-types.js";

export const createMockZodSchema = <T>(validationFn: (data: T) => void): ZodSchema<T> => {
	return {
		_output: {} as T,
		_input: {} as T,
		_def: {},
		parseAsync: async (data: unknown) => {
			validationFn(data as T);
			return data as T;
		},
		parse: (data: unknown) => {
			validationFn(data as T);
			return data as T;
		},
	};
};

export const createMockYupSchema = <T>(validationFn: (data: T) => void): YupObjectSchema<T> => {
	return {
		validate: async (value: any) => {
			validationFn(value);
			return value;
		},
		validateAt: async (path: string, value: any) => {
			validationFn(value);
			return value;
		},
	};
};
