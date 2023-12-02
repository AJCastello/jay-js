import { BaseElement, IBaseElement } from "../BaseElement/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

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

type IProgress = IProgressExt & Partial<Omit<HTMLProgressElement, "style" | "children">>

export function Progress({
  color,
  ...props
}: IProgress = {}): HTMLProgressElement {
  const className = mergeClasses(["progress", color, props.className]);

  return BaseElement({
    tag: "progress",
    ...props,
    className,
  }) as HTMLProgressElement;
}
