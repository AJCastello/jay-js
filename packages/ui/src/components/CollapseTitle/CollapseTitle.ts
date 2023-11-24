import { mergeClasses } from "../../utils/mergeClasses.js";
import { IBaseElement } from "../BaseElement/index.js";
import { Box } from "../Box/index.js";

export type ICollapseTitle = IBaseElement;

export function CollapseTitle({
  ...props
}: ICollapseTitle = {}): HTMLDivElement {
  const className = mergeClasses([
    "collapse-title",
    props.className
  ]);

  return Box({
    ...props,
    className
  }) 
}