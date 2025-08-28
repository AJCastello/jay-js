import { TBaseTagMap, mergeClasses, ListItem } from "@jay-js/elements";
import { TStepItem } from "./step-item.types";

export function StepItem<T extends TBaseTagMap = "li">(
	{ color, ...props }: TStepItem<T> = { tag: "li" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("step", color, props.className);

	return ListItem({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
