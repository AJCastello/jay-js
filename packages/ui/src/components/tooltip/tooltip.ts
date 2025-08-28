import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TTooltip } from "./tooltip.types";

export function Tooltip<T extends TBaseTagMap = "div">(
	{ tip, color, position = "tooltip-top", forceOpen = false, ...props }: TTooltip<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("tooltip", position, forceOpen ? "tooltip-open" : "", color, props.className);

	const tooltipContainer = Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];

	tooltipContainer.setAttribute("data-tip", tip || "");

	return tooltipContainer;
}
