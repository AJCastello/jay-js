import * as yup from "yup";

export interface IUseFormProps<T> {
  initialValues: T;
  validationSchema: yup.ObjectSchema<any>;
  onError?: (error: any) => void;
  options?: Partial<IUseFormOptions>;
}

export interface IUseForm<T> {
  values: T;
  onChange: (ev: Event) => Promise<void>;
  onSubmit: (ev: Event, callback: (data: T) => void) => Promise<void>;
}

export interface IUseFormOptions {
  showHelper: boolean;
  onChangeValidation: boolean;
  customHelperContainer?: (error: yup.ValidationError) => HTMLElement;
}
