import { IBaseElement } from "../BaseElement/index.js";

export interface ITextareaExt extends IBaseElement {
  label?: string;
  labelAlt?: string;
  helpers?: Array<HTMLElement>;
  placeholder?: string;
  bordered?: boolean;
  ghost?: boolean;
  color?: "textarea-primary" | "textarea-secondary" | "textarea-accent" | "textarea-success" | "textarea-warning" | "textarea-info" | "textarea-error";
  size?: "textarea-lg" | "textarea-md" | "textarea-sm" | "textarea-xs";
}

export type ITextarea = ITextareaExt & Partial<Omit<HTMLTextAreaElement, "style" | "children">>;
