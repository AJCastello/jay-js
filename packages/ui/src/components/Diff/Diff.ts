import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TDiff } from "./Diff.types.js";

export function Diff<T extends TBaseTagMap = "div">({ ...props }: TDiff<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["diff", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
