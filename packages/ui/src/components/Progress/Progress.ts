import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TProgress } from "./Progress.types.js";

export function Progress<T extends TBaseTagMap = "progress">(
	{ color, ...props }: TProgress<T> = { tag: "progress" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["progress", color, props.className]);

	return Base<"base">({
		...props,
		tag: "progress",
		className,
	}) as HTMLElementTagNameMap[T];
}
