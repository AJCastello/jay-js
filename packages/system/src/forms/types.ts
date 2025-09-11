export type TResolver<T> = (values: T, fieldName?: string) => Promise<TFormValidateResult>;

export type TUseFormOptions<T> = {
	defaultValues: T;
	resolver?: TResolver<T>;
	debounceMs?: number;
};

export type TRegister = {
	name: string;
	onchange: (ev: Event) => void;
	oninput?: (ev: Event) => void;
	value?: string;
	checked?: boolean;
};

export type TRegisterOptions = {
	beforeChange?: (value: string, ev: Event) => string | undefined;
	value?: string;
};

export type TUseForm<T> = {
	register: (path: keyof T, options?: TRegisterOptions) => TRegister;
	formState: TFormState<T>;
	onChange: (callback: (data: T) => void) => void;
	onSubmit: (callback: (data: T, ev: Event) => void) => (ev: SubmitEvent) => void;
	onErrors: (callback: (errors: TFormValidateResult) => void) => void;
	destroy: () => void;
};

export type TFormState<T> = {
	errors: (path: keyof T) => HTMLElement | Text;
	setValue: <K extends keyof T>(path: K, value: T[K]) => void;
	setValues: (values: Partial<T>) => void;
	getValue: <K extends keyof T>(path: K) => T[K];
	getValues: () => T;
	isValid: (path?: keyof T) => Promise<boolean>;
	getErrors: () => TFormValidateResult;
	setError: (field: keyof T, message: string) => void;
	setErrors: (errors: TFormValidateResult) => void;
	reset: () => void;
};

export type TFormValidateResult = {
	errors: Array<{ path: string; message: string }>;
};
