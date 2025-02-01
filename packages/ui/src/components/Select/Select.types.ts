import { TBase, TBaseTagMap } from "../Base";

export type TSelect<T extends TBaseTagMap> = {
  bordered?: boolean;
  ghost?: boolean;
  color?: "select-primary" | "select-secondary" | "select-accent" | "select-success" | "select-warning" | "select-info" | "select-error";
  size?: "select-xl" | "select-lg" | "select-md" | "select-sm" | "select-xs";
  label?: string;
  labelAlt?: string;
  helpers?: Array<HTMLElement>;
} & TBase<T>;
