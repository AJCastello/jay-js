import { TBase, TBaseTagMap } from "../Base/index.js";

export type TTextInput<T extends TBaseTagMap> = {
  label?: string;
  labelAlt?: string;
  helpers?: Array<HTMLElement>;
  placeholder?: string;
  bordered?: boolean;
  ghost?: boolean;
  color?: "input-primary" | "input-secondary" | "input-accent" | "input-success" | "input-warning" | "input-info" | "input-error";
  inputSize?: "input-xl" | "input-lg" | "input-md" | "input-sm" | "input-xs";
  startAdornment?: HTMLElement | ((inputElement: HTMLInputElement) => HTMLElement);
  endAdornment?: HTMLElement | ((inputElement: HTMLInputElement) => HTMLElement);
} & TBase<T>;