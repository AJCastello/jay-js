import { mergeClasses } from "../../utils/merge-classes.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import { ListItem } from "../ListItem/ListItem.js";
import type { TStepItem } from "./StepItem.types.js";

export function StepItem<T extends TBaseTagMap = "li">(
	{ color, ...props }: TStepItem<T> = { tag: "li" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["step", color, props.className]);

	return ListItem({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
