import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { IDiff } from "./Diff.types.js";

export function Diff({ ...props }: IDiff = {}): HTMLDivElement {
  const className = mergeClasses([
    "diff",
    props.className
  ]);

  return BaseElement({
    ...props,
    className,
  }) as HTMLDivElement;
}
