import { IUseFormOptions } from "../types/index.js";

export let useFormOptions: IUseFormOptions = {
  showHelper: true,
  onChangeValidation: true,
};

export function useFormDefineOptions(options: Partial<IUseFormOptions>) {
  useFormOptions = { ...useFormOptions, ...options };
}