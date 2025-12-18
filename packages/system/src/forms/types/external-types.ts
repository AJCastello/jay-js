export interface ZodIssue {
	path: (string | number)[];
	message: string;
	code?: string;
}

export interface ZodError {
	issues: ZodIssue[];
}

export interface ZodSchema<T = any> {
	_output: T;
	_input: T;
	_def?: any;
	parseAsync(data: unknown): Promise<T>;
	parse(data: unknown): T;
}

export interface YupValidationError {
	path?: string;
	message: string;
	inner: YupValidationError[];
}

export interface YupObjectSchema<T = any> {
	validate(value: any, options?: any): Promise<T>;
	validateAt(path: string, value: any, options?: any): Promise<any>;
}
