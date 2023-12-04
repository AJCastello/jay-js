import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { ICollapseContent } from "./CollapseContent.types.js";

export function CollapseContent({
  ...props
}: ICollapseContent = {}): HTMLDivElement {
  const className = mergeClasses([
    "collapse-content",
    props.className
  ]);

  return BaseElement({
    ...props,
    className
  }) as HTMLDivElement;
}