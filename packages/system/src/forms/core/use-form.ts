import { State } from "../../state/index.js";
import {
  IFormState,
  IFormValidateResult,
  IRegister,
  IRegisterOptions,
  IUseForm,
  IUseFormProps
} from "../types.js";

/**
 * Creates a form management system with validation, state tracking, and DOM integration.
 * 
 * @template T - The type of form values being managed
 * @param {IUseFormProps<T>} props - Form configuration options
 * @param {T} props.defaultValues - Initial values for the form fields
 * @param {TResolver<T>} [props.resolver] - Optional validation resolver function
 * @returns {IUseForm<T>} Form management interface with methods for registration, state access, and event handling
 * 
 * @example
 * // Basic form with Zod validation
 * const form = useForm({
 *   defaultValues: { email: '', password: '' },
 *   resolver: zodResolver(loginSchema)
 * });
 * 
 * // Register an input element
 * const emailInput = document.querySelector('#email');
 * Object.assign(emailInput, form.register('email'));
 * 
 * // Show validation errors
 * const errorElement = document.querySelector('#email-error');
 * errorElement.appendChild(form.formState.errors('email'));
 * 
 * // Handle form submission
 * form.onSubmit((event, data) => {
 *   console.log('Form submitted:', data);
 * });
 */
export function useForm<T>({
  defaultValues,
  resolver,
}: IUseFormProps<T>): IUseForm<T> {
  const formErrors = State<IFormValidateResult>({ errors: [] });
  const formValues = State<T>(defaultValues);
  const formState: IFormState<T> = {
    errors: (path: keyof T) => {
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
    setValue: <K extends keyof T>(path: K, value: T[K]) => {
      formValues.set((prev) => {
        return {
          ...prev,
          [path]: value,
        };
      });
      const fieldElement = document.querySelector(`[name="${String(path)}"]`);
      if (
        (fieldElement && fieldElement instanceof HTMLInputElement) ||
        fieldElement instanceof HTMLTextAreaElement
      ) {
        fieldElement.value = value as string;
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
        const fieldElement = document.querySelector(`[name="${field}"]`);
        if (
          (fieldElement && fieldElement instanceof HTMLInputElement) ||
          fieldElement instanceof HTMLTextAreaElement
        ) {
          fieldElement.value = values[field as keyof T] as string;
        }
      }
    },
    getValue: <K extends keyof T>(path: K) => {
      const values = formValues.get();
      return values[path] as T[K];
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

  /**
   * Updates a form field value in the internal state
   * 
   * @param {string} field - The field name to update
   * @param {string} value - The new value for the field
   * @private
   */
  function privateSetValue(field: string, value: string) {
    formValues.set((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  }

  /**
   * Subscribes to error state changes
   * 
   * @param {Function} callback - Function called when validation errors change
   */
  function onErrors(callback: (errors: IFormValidateResult) => void) {
    formErrors.sub("onErrors", callback);
  }

  /**
   * Handles input/change events from form elements
   * 
   * @param {Event} ev - The DOM event
   * @param {IRegisterOptions} options - Optional processing options
   * @private
   */
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

  /**
   * Process validation results and update error state
   * 
   * @param {IFormValidateResult} result - The validation result
   * @returns {boolean} True if validation passed, false otherwise
   * @private
   */
  function validateResult(result: IFormValidateResult) {
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
   * @param {IFormValidateResult} result - The validation result to check
   * @returns {boolean} True if no errors, false otherwise
   * @private
   */
  function checkValidate(result: IFormValidateResult) {
    if (result.errors && result.errors.length > 0) {
      return false;
    }
    return true;
  }

  /**
   * Registers a form field to connect it with the form management system
   * 
   * @param {keyof T} path - The field name/path in the form values object
   * @param {IRegisterOptions} options - Optional field registration options
   * @returns {IRegister} Props to apply to the HTML element
   */
  function register(path: keyof T, options: IRegisterOptions = {}): IRegister {
    return {
      name: path as string,
      onchange: (ev) => onChangeValue(ev, options),
      oninput: (ev) => onChangeValue(ev, options),
      value: defaultValues[path] as string,
    };
  }

  /**
   * Subscribes to form value changes
   * 
   * @param {Function} callback - Function called when form values change
   */
  function onChange(callback: (data: T, errors?: IFormValidateResult) => void) {
    formValues.sub("onChange", (data) => {
      callback(data, formErrors.get());
    });
  }

  /**
   * Creates a form submission handler that validates before calling the callback
   * 
   * @param {Function} callback - Function called on successful form submission
   * @returns {Function} Event handler for the form's submit event
   */
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