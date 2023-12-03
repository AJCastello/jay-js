import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { IDiffResizer } from "./DiffResizer.types.js";

export function DiffResizer({ ...props }: IDiffResizer = {}): HTMLDivElement {
  const className = mergeClasses([
    "diff-resizer",
    props.className
  ]);

  return BaseElement({
    ...props,
    className,
  }) as HTMLDivElement;
}
