import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TTooltip } from "./tooltip.types";

export function Tooltip<T extends TBaseTagMap = "div">(
	{ tag, className, tip, color, position = "tooltip-top", forceOpen = false, children, ...props }: TTooltip<T> = {
		tag: "div" as T,
	},
): HTMLElementTagNameMap[T] {
	const Tag = (tag ?? "div") as any;
	const tooltipClassName = cn("tooltip", position, forceOpen ? "tooltip-open" : "", color, className);

	const tooltipContainer = (
		<Tag {...(props as any)} className={tooltipClassName}>
			{children}
		</Tag>
	) as unknown as HTMLElementTagNameMap[T];

	tooltipContainer.setAttribute("data-tip", tip || "");
	return tooltipContainer;
}
