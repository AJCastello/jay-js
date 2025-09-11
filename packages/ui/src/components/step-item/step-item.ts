import { ListItem, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TStepItem } from "./step-item.types";

export function StepItem<T extends TBaseTagMap = "li">(
	{ color, ...props }: TStepItem<T> = { tag: "li" },
): HTMLElementTagNameMap[T] {
	const className = cn("step", color, props.className);

	return ListItem({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
