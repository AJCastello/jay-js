import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TDiff } from "./diff.types";

export function Diff<T extends TBaseTagMap = "div">({ ...props }: TDiff<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
	const className = cn("diff", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
