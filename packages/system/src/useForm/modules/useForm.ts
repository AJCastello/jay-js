
import * as yup from "yup";
import { IUseForm, IUseFormProps } from "../types";
import { updateUI } from "../utils/updateUI";
import { useFormDefineOptions } from "./useFormDefineOptions";

export function useForm<T>({
  initialValues,
  validationSchema,
  onError,
  options
}: IUseFormProps<T>): IUseForm<T> {
  const values: T = { ...initialValues };

  if (options) {
    useFormDefineOptions(options);
  };

  function onValidateError(error: yup.ValidationError) {
    if (onError) {
      onError(error);
    }
  }

  async function validateAndUpdateUI(element: HTMLElement, name: keyof T, value: any) {
    try {
      await validationSchema.validateAt(name as any, { [name]: value });
      updateUI(element, null);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        onValidateError(error);
        updateUI(element, error);
      }
    }
  }

  async function onChange(ev: Event) {
    const element = ev.target as HTMLElement;
    if (element instanceof HTMLInputElement) {
      const name = element.name as keyof T;
      const value = element.value;
      values[name] = value as any;
      await validateAndUpdateUI(element, name, value);
    }
  }

  async function onSubmit(ev: Event, callback: (data: T) => void) {
    ev.preventDefault();
    const formElement = ev.target as HTMLFormElement;

    try {
      await validationSchema.validate(values, { abortEarly: false });

      callback(values);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        onValidateError(error);
        const allWarnings = error.inner.every((err) => err.type?.startsWith("warning"));
        if (allWarnings) {
          callback(values);
          return;
        }
        error.inner.forEach((error) => {
          const inputErrorElement = formElement.querySelector(`[name="${error.path}"]`) as HTMLElement;
          if (inputErrorElement) {
            validateAndUpdateUI(inputErrorElement, error.path as keyof T, values[error.path as keyof T]);
          }
        });
      }
    }
  }

  return {
    values,
    onChange,
    onSubmit
  };
}
