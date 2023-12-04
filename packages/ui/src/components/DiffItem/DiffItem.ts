import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { IDiffItem } from "./DiffItem.types.js";

export function DiffItem({ side, ...props }: IDiffItem = {}): HTMLDivElement {
  const className = mergeClasses([
    side === "left" ? "diff-item-1" : "diff-item-2",
    props.className,
  ]);

  return BaseElement({
    ...props,
    className,
  }) as HTMLDivElement;
}
