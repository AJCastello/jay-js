import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TLoading } from "./Loading.types.js";

export function Loading<T extends TBaseTagMap = "span">(
	{ type = "loading-spinner", size = "loading-md", ...props }: TLoading<T> = { tag: "span" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["loading", type, size, props.className]);

	return Base({
		tag: "span",
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
