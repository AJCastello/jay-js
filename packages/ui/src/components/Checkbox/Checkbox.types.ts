import { IBaseElement } from "../BaseElement";

export interface ICheckboxExt extends IBaseElement {
  value?: string;
  label?: string | Node | (string | Node)[];
  checked?: boolean;
  color?: "checkbox-primary" | "checkbox-secondary" | "checkbox-accent" | "checkbox-success" | "checkbox-warning" | "checkbox-info" | "checkbox-error";
  size?: "checkbox-lg" | "checkbox-md" | "checkbox-sm" | "checkbox-xs";
  position?: "checkbox-before" | "checkbox-after";
  formControl?: IBaseElement;
}

export type ICheckbox = ICheckboxExt & Partial<Omit<HTMLInputElement, "style" | "size" | "label">>;
