import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface ISelectExt extends IBaseElement {
  bordered?: boolean;
  ghost?: boolean;
  color?: "select-primary" | "select-secondary" | "select-accent" | "select-success" | "select-warning" | "select-info" | "select-error";
  size?: "select-lg" | "select-md" | "select-sm" | "select-xs";
  label?: string;
  labelAlt?: string;
  helpers?: Array<HTMLElement>;
}

export type ISelect = ISelectExt & Partial<Omit<HTMLSelectElement, "style" | "children" | "size">>;
