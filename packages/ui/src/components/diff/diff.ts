import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TDiff } from "./diff.types";

export function Diff<T extends TBaseTagMap = "div">({ ...props }: TDiff<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
	const className = mergeClasses("diff", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
