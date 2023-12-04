import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export interface IBadgeExt extends IBaseElement {
  variant?: "badge-outline";
  color?: "badge-primary" | "badge-secondary" | "badge-accent" | "badge-ghost" | "badge-info" | "badge-success" | "badge-warning" | "badge-error";
  size?: "badge-lg" | "badge-md" | "badge-sm" | "badge-xs";
}

export type IBadge = IBadgeExt & Partial<Omit<HTMLSpanElement, "style" | "children">>;
