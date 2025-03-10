import { State } from "../../state";
import { IFormState, IFormValidateResult, IRegister, IRegisterOptions, IUseForm, IUseFormProps } from "../types";

export function useForm<T>({
	defaultValues,
	resolver,
}: IUseFormProps<T>): IUseForm<T> {
	const formErrors = State<IFormValidateResult>({ errors: [] });
	const formValues = State<T>(defaultValues);

	const formState: IFormState<T> = {
		errors: (path: keyof T, container?: HTMLElement) => {
			const errorText = document.createTextNode("");
			formErrors.sub(path as string, (error) => {
				const errorFound = error.errors.find((err) => err.path === path);
				errorText.textContent = "";
				if (errorFound && errorFound.message) {
					errorText.textContent = errorFound.message;
				}
			});
			return errorText;
		},
		setValue: (field: string, value: string) => {
			formValues.set((prev) => {
				return {
					...prev,
					[field]: value,
				};
			});
			const fieldElement = document.querySelector(`[name="${field}"]`);
			if (
				(fieldElement && fieldElement instanceof HTMLInputElement) ||
				fieldElement instanceof HTMLTextAreaElement
			) {
				fieldElement.value = value;
			}
		},
		setValues: (values: T) => {
			formValues.set(values);
			for (const field in values) {
				const fieldElement = document.querySelector(`[name="${field}"]`);
				if (
					(fieldElement && fieldElement instanceof HTMLInputElement) ||
					fieldElement instanceof HTMLTextAreaElement
				) {
					fieldElement.value = values[field as keyof T] as string;
				}
			}
		},
		getValue: (field: keyof T) => {
			const values = formValues.get();
			return values[field] as string;
		},
		isValid: async (path?: keyof T) => {
			try {
				if (!resolver) {
					return true;
				}
				const formValuesData = formValues.get();
				const result = await resolver(
					formValuesData,
					path as string | undefined,
				);
				return checkValidate(result);
			} catch (error: any) {
				return checkValidate(error);
			}
		},
		getErrors: () => formErrors.get(),
		setError: (field: keyof T, message: string) => {
			formErrors.set((prev) => {
				return {
					errors: [
						...prev.errors,
						{
							path: field as string,
							message,
						},
					],
				};
			});
		},
		setErrors: (errors: IFormValidateResult) => {
			formErrors.set(errors);
		},
	};

	function privateSetValue(field: string, value: string) {
		formValues.set((prev) => {
			return {
				...prev,
				[field]: value,
			};
		});
	}

	function onErrors(callback: (errors: IFormValidateResult) => void) {
		formErrors.sub("onErrors", callback);
	}

	async function onChangeValue(ev: Event, options: IRegisterOptions = {}) {
		const element = ev.target as HTMLElement;
		if (
			element instanceof HTMLInputElement ||
			element instanceof HTMLTextAreaElement ||
			element instanceof HTMLSelectElement
		) {
			const field = element.getAttribute("name") as string;
			let value: string | undefined = element.value;
			if (options) {
				if (options.beforeChange) {
					value = options.beforeChange(ev, value);
					if (value === undefined) {
						return;
					}
				}
			}
			element.value = value;
			privateSetValue(field, value);
			try {
				if (!resolver) {
					return;
				}
				const formValuesData = formValues.get();
				const result = await resolver(formValuesData, field);
				validateResult(result);
			} catch (error: any) {
				validateResult(error);
			}
		}
	}

	function validateResult(result: IFormValidateResult) {
		if (result.errors && result.errors.length > 0) {
			formErrors.set({ errors: result.errors });
			return false;
		}
		formErrors.set({ errors: [] });
		return true;
	}

	function checkValidate(result: IFormValidateResult) {
		if (result.errors && result.errors.length > 0) {
			return false;
		}
		return true;
	}

	function register(path: keyof T, options: IRegisterOptions = {}): IRegister {
		return {
			name: path as string,
			onchange: (ev) => onChangeValue(ev, options),
			oninput: (ev) => onChangeValue(ev, options),
			value: defaultValues[path] as string,
		};
	}

	function onChange(callback: (data: T, errors?: IFormValidateResult) => void) {
		formValues.sub("onChange", (data) => {
			callback(data, formErrors.get());
		});
	}

	function onSubmit(callback: (ev: Event, data: T) => void) {
		return async (ev: SubmitEvent) => {
			ev.preventDefault();
			const formValuesData = formValues.get();
			try {
				if (!resolver) {
					callback(ev, formValuesData);
					return;
				}
				const result = await resolver(formValuesData);
				const validated = validateResult(result);
				if (validated) {
					callback(ev, formValuesData);
				}
			} catch (error: any) {
				validateResult(error);
			}
		};
	}

	return {
		formState,
		register,
		onChange,
		onSubmit,
		onErrors,
	};
}
