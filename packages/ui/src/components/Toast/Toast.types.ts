import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IToastExt extends IBaseElement {
  horizontal?: "toast-start" | "toast-center" | "toast-end";
  vertical?: "toast-top" | "toast-middle" | "toast-bottom";
  duration?: number;
  asChild?: boolean;
  children?: HTMLElement;
}

export type IToast = IToastExt & Partial<Omit<HTMLDivElement, "style" | "children">>;
