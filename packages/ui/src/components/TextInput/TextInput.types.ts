import { IBaseElement } from "../BaseElement/BaseElement.types";

export interface ITextInputExt extends IBaseElement {
  label?: string;
  labelAlt?: string;
  helpers?: Array<HTMLElement>;
  placeholder?: string;
  bordered?: boolean;
  ghost?: boolean;
  color?: "input-primary" | "input-secondary" | "input-accent" | "input-success" | "input-warning" | "input-info" | "input-error";
  inputSize?: "input-lg" | "input-md" | "input-sm" | "input-xs";
  startAdornment?: HTMLElement | ((inputElement: HTMLInputElement) => HTMLElement);
  endAdornment?: HTMLElement | ((inputElement: HTMLInputElement) => HTMLElement);
}

export type ITextInput = ITextInputExt & Partial<Omit<HTMLInputElement, "style" | "size" | "label">>;