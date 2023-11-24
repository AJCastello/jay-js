import { mergeClasses } from "../../utils/mergeClasses.js";
import { IBaseElement } from "../BaseElement/index.js";
import { Box } from "../Box/index.js";

export type ICollapseContent = IBaseElement;

export function CollapseContent({
  ...props
}: ICollapseContent = {}): HTMLDivElement {
  const className = mergeClasses([
    "collapse-content",
    props.className
  ]);

  return Box({
    ...props,
    className
  }) 
}