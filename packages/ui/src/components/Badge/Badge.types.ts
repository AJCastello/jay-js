import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type IBadge<T extends TBaseTagMap> = {
  variant?: "badge-outline";
  color?: "badge-primary" | "badge-secondary" | "badge-accent" | "badge-ghost" | "badge-info" | "badge-success" | "badge-warning" | "badge-error";
  size?: "badge-lg" | "badge-md" | "badge-sm" | "badge-xs";
} & TBase<T>;
