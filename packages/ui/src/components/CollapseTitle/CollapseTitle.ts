import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { ICollapseTitle } from "./CollapseTitle.types.js";

export function CollapseTitle({
  summary,
  ...props
}: ICollapseTitle = {}): HTMLDivElement {
  const className = mergeClasses([
    "collapse-title",
    props.className
  ]);

  return BaseElement({
    tag: summary ? "details" : "div",
    ...props,
    className
  }) as HTMLDivElement;
}