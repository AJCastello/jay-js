import { TBase, TBaseTagMap } from "../Base/index.js";

export type TTextarea<T extends TBaseTagMap> = {
  label?: string;
  labelAlt?: string;
  helpers?: Array<HTMLElement>;
  placeholder?: string;
  bordered?: boolean;
  ghost?: boolean;
  color?: "textarea-primary" | "textarea-secondary" | "textarea-accent" | "textarea-success" | "textarea-warning" | "textarea-info" | "textarea-error";
  size?: "textarea-lg" | "textarea-md" | "textarea-sm" | "textarea-xs";
} & TBase<T>;

