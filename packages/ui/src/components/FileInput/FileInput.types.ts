import { TBase, TBaseTagMap } from "../Base";

export type TFileInput<T extends TBaseTagMap> = {
  label?: string;
  labelAlt?: string;
  helpers?: Array<HTMLElement>;
  bordered?: boolean;
  ghost?: boolean;
  color?: "file-input-primary" | "file-input-secondary" | "file-input-accent" | "file-input-success" | "file-input-warning" | "file-input-info" | "file-input-error";
  inputSize?: "file-input-lg" | "file-input-md" | "file-input-sm" | "file-input-xs";
} & TBase<T>;
