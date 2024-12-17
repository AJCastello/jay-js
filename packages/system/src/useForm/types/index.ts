export type TResolver<T> = (
  values: T,
  fieldName?: string,
) => Promise<IFormValidateResult>;

export interface IUseFormProps<T> {
  defaultValues: T;
  resolver: TResolver<T>;
}

export interface IRegister {
  name: string;
  onchange: (ev: Event) => void;
  oninput: (ev: Event) => void;
  value: string;
}

export interface IRegisterOptions {
  beforeChange?: (ev: Event, value: string) => string | undefined;
}

export interface IUseForm<T> {
  register: (path: keyof T, options?: IRegisterOptions) => IRegister;
  formState: IFormState<T>;
  onChange: (callback: (data: T) => void) => void;
  onSubmit: (
    callback: (ev: Event, data: T) => void,
  ) => (ev: SubmitEvent) => void;
  onErrors: (callback: (errors: IFormValidateResult) => void) => void;
}

export interface IFormState<T> {
  errors: (path: keyof T, container?: HTMLElement) => HTMLElement | Text;
  setValue: (path: string, value: string) => void;
  setValues: (values: any) => void;
  getValue: (path: keyof T) => string;
  isValid: (path?: keyof T) => Promise<boolean>;
  getErrors: () => IFormValidateResult;
  setError: (field: keyof T, message: string) => void;
  setErrors: (errors: IFormValidateResult) => void;
}

export interface IFormValidateResult {
  errors: Array<{ path: string; message: string }>;
}