import { IBaseElement } from "../BaseElement/BaseElement.types.js";

type ProgressColor =
  | "progress-primary"
  | "progress-secondary"
  | "progress-accent"
  | "progress-info"
  | "progress-success"
  | "progress-warning"
  | "progress-error";

export interface IProgressExt extends IBaseElement {
  color?: ProgressColor;
}

export type IProgress = IProgressExt & Partial<Omit<HTMLProgressElement, "style" | "children">>