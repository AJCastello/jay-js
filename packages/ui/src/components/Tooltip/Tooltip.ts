import { Base } from "../Base/Base.js";
import { TTooltip } from "./Tooltip.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Tooltip<T extends TBaseTagMap = "div">({
  tip,
  color,
  position = "tooltip-top",
  forceOpen = false,
  ...props
}: TTooltip<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "tooltip",
    position,
    forceOpen ? "tooltip-open" : "",
    color,
    props.className,
  ]);

  const tooltipContainer = Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];

  tooltipContainer.setAttribute("data-tip", tip || "");

  return tooltipContainer;
}
