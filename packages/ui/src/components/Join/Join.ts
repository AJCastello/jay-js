import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TJoin } from "./Join.types.js";

export function Join<T extends TBaseTagMap = "div">({ ...props }: TJoin<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["join", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
