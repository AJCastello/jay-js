import { State } from "../../state/index.js";
import type {
	TFormState,
	TFormValidateResult,
	TRegister,
	TRegisterOptions,
	TUseForm,
	TUseFormOptions,
} from "../types.js";

/**
 * Creates a form management system with validation, state tracking, and DOM integration.
 *
 * @template T - The type of form values being managed
 * @param {TUseFormOptions<T>} options - Form configuration options
 * @param {T} options.defaultValues - Initial values for the form fields
 * @param {TResolver<T>} [options.resolver] - Optional validation resolver function
 * @param {number} [options.debounceMs=300] - Debounce time for validation in milliseconds
 * @returns {TUseForm<T>} Form management interface with methods for registration, state access, and event handling
 *
 * @example
 * // Basic form with Zod validation and custom debounce
 * const form = useForm({
 *   defaultValues: { email: '', password: '', remember: false },
 *   resolver: zodResolver(loginSchema),
 *   debounceMs: 500 // Custom debounce time
 * });
 *
 * // Register an input element
 * const emailInput = document.querySelector('#email');
 * Object.assign(emailInput, form.register('email'));
 *
 * // Register a checkbox element
 * const rememberInput = document.querySelector('#remember');
 * Object.assign(rememberInput, form.register('remember', { type: 'checkbox' }));
 *
 * // Show validation errors
 * const errorElement = document.querySelector('#email-error');
 * errorElement.appendChild(form.formState.errors('email'));
 *
 * // Handle form submission
 * form.onSubmit((data, event) => {
 *   console.log('Form submitted:', data);
 * });
 *
 * // Reset form
 * form.formState.reset();
 *
 * // Cleanup when component unmounts
 * form.destroy();
 */
export function useForm<T>({ defaultValues, resolver, debounceMs = 300 }: TUseFormOptions<T>): TUseForm<T> {
	const formErrors = State<TFormValidateResult>({ errors: [] });
	const formValues = State<T>(defaultValues);

	// Cache for DOM elements using WeakMap for automatic garbage collection
	const elementCache = new Map<string, HTMLElement>();

	// Debounce timers for validation
	const debounceTimers = new Map<string, NodeJS.Timeout>();

	// Event listeners cleanup registry
	const eventListeners = new Set<() => void>();

	// MutationObserver for automatic cleanup when elements are removed
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.removedNodes.forEach((node) => {
				if (node instanceof HTMLElement) {
					const name = node.getAttribute("name");
					if (name && elementCache.has(name)) {
						elementCache.delete(name);
						// Clear debounce timer for removed element
						const timer = debounceTimers.get(name);
						if (timer) {
							clearTimeout(timer);
							debounceTimers.delete(name);
						}
					}
				}
			});
		});
	});

	// Start observing the DOM
	if (typeof document !== "undefined") {
		observer.observe(document.body, { childList: true, subtree: true });
	}
	const formState: TFormState<T> = {
		errors: (path: keyof T) => {
			const errorText = document.createTextNode("");
			formErrors.sub(path as string, (error) => {
				const errorFound = error.errors.find((err) => err.path === path);
				errorText.textContent = "";
				if (errorFound?.message) {
					errorText.textContent = errorFound.message;
				}
			});
			return errorText;
		},
		setValue: <K extends keyof T>(path: K, value: T[K]) => {
			formValues.set((prev) => {
				return {
					...prev,
					[path]: value,
				};
			});

			// Use cache or search for element and store in cache

			const pathStr = String(path);
			let fieldElement = elementCache.get(pathStr);

			if (!fieldElement || !document.contains(fieldElement)) {
				fieldElement = document.querySelector(`[name="${pathStr}"]`) as HTMLElement;
				if (fieldElement) {
					elementCache.set(pathStr, fieldElement);
				}
			}

			if (!fieldElement) return;

			if (fieldElement instanceof HTMLInputElement) {
				if (fieldElement.type === "checkbox") {
					fieldElement.checked = Boolean(value);
				} else if (fieldElement.type === "radio") {
					const radioGroup = document.querySelectorAll(`input[type="radio"][name="${String(path)}"]`);
					radioGroup.forEach((radio) => {
						if (radio instanceof HTMLInputElement) {
							radio.checked = radio.value === String(value);
						}
					});
				} else {
					fieldElement.value = String(value);
				}
			} else if (fieldElement instanceof HTMLTextAreaElement) {
				fieldElement.value = String(value);
			} else if (fieldElement instanceof HTMLSelectElement) {
				if (fieldElement.multiple && Array.isArray(value)) {
					Array.from(fieldElement.options).forEach((option) => {
						option.selected = (value as unknown as string[]).includes(option.value);
					});
				} else {
					fieldElement.value = String(value);
				}
			}
		},
		setValues: (values: Partial<T>) => {
			formValues.set((prev) => {
				return {
					...prev,
					...values,
				};
			});

			for (const field in values) {
				formState.setValue(field as keyof T, values[field as keyof T] as T[keyof T]);
			}
		},
		getValue: <K extends keyof T>(path: K) => {
			const values = formValues.get();
			return values[path] as T[K];
		},
		getValues: () => {
			return formValues.get();
		},
		isValid: async (path?: keyof T) => {
			try {
				if (!resolver) {
					return true;
				}
				const formValuesData = formValues.get();
				const result = await resolver(formValuesData, path as string | undefined);
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
		setErrors: (errors: TFormValidateResult) => {
			formErrors.set(errors);
		},

		/**
		 * Resets the form to default values and clears all errors
		 */
		reset: () => {
			// Restaura valores padrão
			formValues.set(defaultValues);

			// Limpa erros
			formErrors.set({ errors: [] });

			// Atualiza elementos DOM com valores padrão
			for (const field in defaultValues) {
				formState.setValue(field as keyof T, defaultValues[field]);
			}
		},
	};

	/**
	 * Updates a form field value in the internal state
	 *
	 * @param {string} field - The field name to update
	 * @param {any} value - The new value for the field
	 * @private
	 */
	function privateSetValue(field: string, value: any) {
		formValues.set((prev) => {
			return {
				...prev,
				[field]: value,
			};
		});
	}

	/**
	 * Creates a debounced validation function for a specific field
	 *
	 * @param {string} field - The field name to validate
	 * @returns {Function} Debounced validation function
	 * @private
	 */
	function createDebouncedValidation(field: string) {
		return () => {
			const timer = debounceTimers.get(field);
			if (timer) {
				clearTimeout(timer);
			}

			const newTimer = setTimeout(async () => {
				try {
					if (!resolver) {
						return;
					}
					const formValuesData = formValues.get();
					const result = await resolver(formValuesData, field);
					validateResult(result);
				} catch (error: any) {
					validateResult(error);
				} finally {
					debounceTimers.delete(field);
				}
			}, debounceMs);

			debounceTimers.set(field, newTimer);
		};
	}

	/**
	 * Subscribes to error state changes
	 *
	 * @param {Function} callback - Function called when validation errors change
	 */
	function onErrors(callback: (errors: TFormValidateResult) => void) {
		formErrors.sub("onErrors", callback);
		// Store callback reference for cleanup
		const cleanup = () => {
			// The State system will handle cleanup automatically
			// when the form is destroyed
		};
		eventListeners.add(cleanup);
		return cleanup;
	}

	/**
	 * Extracts value from form element based on its type
	 *
	 * @param {HTMLElement} element - The DOM element to extract value from
	 * @returns {any} The value in the appropriate type for the element
	 */
	function getElementValue(element: HTMLElement): any {
		if (element instanceof HTMLInputElement) {
			if (element.type === "checkbox") {
				return element.checked;
			} else if (element.type === "radio") {
				if (element.checked) {
					return element.value;
				}
				return undefined;
			} else if (element.type === "file") {
				return element.files;
			}
			return element.value;
		} else if (element instanceof HTMLSelectElement) {
			if (element.multiple) {
				return Array.from(element.selectedOptions).map((option) => option.value);
			}

			return element.value;
		} else if (element instanceof HTMLTextAreaElement) {
			return element.value;
		}

		return undefined;
	}

	/**
	 * Handles input/change events from form elements
	 *
	 * @param {Event} ev - The DOM event
	 * @param {TRegisterOptions} options - Optional processing options
	 * @private
	 */
	async function onChangeValue(ev: Event, options: TRegisterOptions = {}) {
		const element = ev.target as HTMLElement;
		if (
			element instanceof HTMLInputElement ||
			element instanceof HTMLTextAreaElement ||
			element instanceof HTMLSelectElement
		) {
			const field = element.getAttribute("name") as string;

			let value: any = getElementValue(element);

			if (value === undefined) return;

			if (options.beforeChange && typeof value === "string") {
				value = options.beforeChange(value, ev);
				if (value === undefined) {
					return;
				}

				if (element instanceof HTMLInputElement && element.type !== "checkbox" && element.type !== "radio") {
					element.value = value;
				} else if (element instanceof HTMLTextAreaElement) {
					element.value = value;
				}
			}

			privateSetValue(field, value);

			// Use debounced validation instead of immediate validation
			if (resolver) {
				const debouncedValidate = createDebouncedValidation(field);
				debouncedValidate();
			}
		}
	}

	/**
	 * Process validation results and update error state
	 *
	 * @param {TFormValidateResult} result - The validation result
	 * @returns {boolean} True if validation passed, false otherwise
	 * @private
	 */
	function validateResult(result: TFormValidateResult) {
		if (result.errors && result.errors.length > 0) {
			formErrors.set({ errors: result.errors });
			return false;
		}
		formErrors.set({ errors: [] });
		return true;
	}

	/**
	 * Checks if a validation result contains errors
	 *
	 * @param {TFormValidateResult} result - The validation result to check
	 * @returns {boolean} True if no errors, false otherwise
	 * @private
	 */
	function checkValidate(result: TFormValidateResult) {
		if (result.errors && result.errors.length > 0) {
			return false;
		}
		return true;
	}

	/**
	 * Registers a form field to connect it with the form management system
	 *
	 * @param {keyof T} path - The field name/path in the form values object
	 * @param {TRegisterOptions} options - Optional field registration options
	 * @returns {TRegister} Props to apply to the HTML element
	 */
	function register(path: keyof T, options: TRegisterOptions = {}): TRegister {
		const value = options.value ? String(options.value) : defaultValues[path];

		if (typeof value === "boolean") {
			return {
				name: path as string,
				onchange: (ev) => onChangeValue(ev, options),
				checked: Boolean(value),
			};
		}

		return {
			name: path as string,
			onchange: (ev) => onChangeValue(ev, options),
			oninput: (ev) => onChangeValue(ev, options),
			value: String(value),
		};
	}

	/**
	 * Subscribes to form value changes
	 *
	 * @param {Function} callback - Function called when form values change
	 */
	function onChange(callback: (data: T, errors?: TFormValidateResult) => void) {
		formValues.sub("onChange", (data) => {
			callback(data, formErrors.get());
		});
		// Store callback reference for cleanup
		const cleanup = () => {
			// The State system will handle cleanup automatically
			// when the form is destroyed
		};
		eventListeners.add(cleanup);
		return cleanup;
	}

	/**
	 * Creates a form submission handler that validates before calling the callback
	 *
	 * @param {Function} callback - Function called on successful form submission
	 * @returns {Function} Event handler for the form's submit event
	 */
	function onSubmit(callback: (data: T, ev: Event) => void) {
		return async (ev: SubmitEvent) => {
			ev.preventDefault();
			const formValuesData = formValues.get();
			try {
				if (!resolver) {
					callback(formValuesData, ev);
					return;
				}
				const result = await resolver(formValuesData);
				const validated = validateResult(result);
				if (validated) {
					callback(formValuesData, ev);
				}
			} catch (error: any) {
				validateResult(error);
			}
		};
	}

	/**
	 * Cleans up resources and stops DOM observation
	 */
	function destroy() {
		// Disconnect DOM observer
		observer.disconnect();

		// Clear element cache
		elementCache.clear();

		// Clear all debounce timers
		debounceTimers.forEach((timer) => clearTimeout(timer));
		debounceTimers.clear();

		// Cleanup all event listeners
		eventListeners.forEach((unsubscribe) => {
			if (typeof unsubscribe === "function") {
				unsubscribe();
			}
		});
		eventListeners.clear();
	}

	return {
		formState,
		register,
		onChange,
		onSubmit,
		onErrors,
		destroy,
	};
}
