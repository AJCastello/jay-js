import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TButton<T extends TBaseTagMap> = {
  size?: "btn-lg" | "btn-md" | "btn-sm" | "btn-xs";
  format?: "btn-circle" | "btn-square";
  color?: "btn-primary" | "btn-secondary" | "btn-accent" | "btn-info" | "btn-success" | "btn-warning" | "btn-error";
  variant?: "btn-ghost" | "btn-link" | "btn-outline";
  active?: "btn-active" | "btn-disabled";
  glass?: boolean;
  ripple?: boolean;
  fullWidth?: boolean;
  animation?: boolean;
} & TBase<T>;
