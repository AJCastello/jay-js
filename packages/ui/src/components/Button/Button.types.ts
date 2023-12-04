import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IButtonExt extends IBaseElement {
  type?: "button" | "submit" | "reset";
  size?: "btn-lg" | "btn-md" | "btn-sm" | "btn-xs";
  format?: "btn-circle" | "btn-square";
  color?: "btn-primary" | "btn-secondary" | "btn-accent" | "btn-info" | "btn-success" | "btn-warning" | "btn-error";
  variant?: "btn-ghost" | "btn-link" | "btn-outline";
  active?: "btn-active" | "btn-disabled";
  glass?: boolean;
  ripple?: boolean;
  fullWidth?: boolean;
  animation?: boolean;
}

export type IButton = IButtonExt & Partial<Omit<HTMLButtonElement, "style" | "children">>;
