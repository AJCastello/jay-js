import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TTooltip } from "./tooltip.types";

export function Tooltip<T extends TBaseTagMap = "div">(
	{ tip, color, position = "tooltip-top", forceOpen = false, ...props }: TTooltip<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("tooltip", position, forceOpen ? "tooltip-open" : "", color, props.className);

	const tooltipContainer = Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];

	tooltipContainer.setAttribute("data-tip", tip || "");

	return tooltipContainer;
}
