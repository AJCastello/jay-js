import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TToggle<T extends TBaseTagMap> = {
  label?: string;
  color?: "toggle-primary" | "toggle-secondary" | "toggle-accent" | "toggle-neutral" | "toggle-success" | "toggle-warning" | "toggle-info" | "toggle-error";
  size?: "toggle-xl" | "toggle-lg" | "toggle-md" | "toggle-sm" | "toggle-xs";
  position?: "toggle-before" | "toggle-after";
  formControl?: TBase<T>;
} & TBase<T>;
