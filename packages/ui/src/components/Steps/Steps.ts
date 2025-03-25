import { mergeClasses } from "../../utils/merge-classes.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import { List } from "../List/List.js";
import type { TSteps } from "./Steps.types.js";

export function Steps<T extends TBaseTagMap = "ul">(
	{ orientation = "steps-horizontal", ...props }: TSteps<T> = { tag: "ul" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["steps", orientation, props.className]);

	return List({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
