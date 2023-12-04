import { IInput } from "../Input/Input.types.js";

export interface IRange extends IInput {
  size?: "range-lg" | "range-md" | "range-sm" | "range-xs";
  color?: "range-primary" | "range-secondary" | "range-accent" | "range-success" | "range-warning" | "range-info" | "range-error"
}
