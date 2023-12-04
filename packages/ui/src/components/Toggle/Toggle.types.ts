import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IToggleExt extends IBaseElement {
  label?: string;
  className?: string;
  color?: "toggle-primary" | "toggle-secondary" | "toggle-accent" | "toggle-success" | "toggle-warning" | "toggle-info" | "toggle-error";
  size?: "toggle-lg" | "toggle-md" | "toggle-sm" | "toggle-xs";
  position?: "toggle-before" | "toggle-after";
  formControl?: IBaseElement;
}

export type IToggle = IToggleExt & Partial<Omit<HTMLInputElement, "style" | "size" | "label">>;

