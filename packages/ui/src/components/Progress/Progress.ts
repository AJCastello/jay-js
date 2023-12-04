import { IProgress } from "./Progress.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Progress({
  color,
  ...props
}: IProgress = {}): HTMLProgressElement {
  const className = mergeClasses([
    "progress", 
    color, 
    props.className
  ]);

  return BaseElement({
    tag: "progress",
    ...props,
    className,
  }) as HTMLProgressElement;
}
