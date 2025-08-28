import { TBaseTagMap, mergeClasses, List } from "@jay-js/elements";
import { TSteps } from "./steps.types";

export function Steps<T extends TBaseTagMap = "ul">(
	{ orientation = "steps-horizontal", ...props }: TSteps<T> = { tag: "ul" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("steps", orientation, props.className);

	return List({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
