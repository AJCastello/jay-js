import { ITooltip } from "./Tooltip.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Tooltip({
  tip,
  color,
  position = "tooltip-top",
  forceOpen = false,
  ...props
}: ITooltip = {}) {
  const className = mergeClasses([
    "tooltip",
    position,
    forceOpen ? "tooltip-open" : "",
    color,
    props.className,
  ]);

  const tooltipContainer = BaseElement({
    tag: "div",
    ...props,
    className,
  }) as HTMLDivElement;

  tooltipContainer.setAttribute("data-tip", tip || "");

  return tooltipContainer;
}
