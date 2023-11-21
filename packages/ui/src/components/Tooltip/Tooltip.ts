import { BaseElement, IBaseElement } from "../BaseElement/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

interface ITooltip extends IBaseElement {
  tip: string;
  position?: "tooltip-top" | "tooltip-bottom" | "tooltip-left" | "tooltip-right";
  forceOpen?: boolean;
  color?: "tooltip-primary" | "tooltip-secondary" | "tooltip-accent" | "tooltip-info" | "tooltip-success" | "tooltip-warning" | "tooltip-error";
}

export function Tooltip({
  tip,
  position = "tooltip-top",
  forceOpen = false,
  color,
  ...props
}: ITooltip) {
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

  tooltipContainer.setAttribute("data-tip", tip);

  return tooltipContainer;
}
