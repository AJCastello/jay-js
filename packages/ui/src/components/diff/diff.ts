import { Base, type TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils";
import type { TDiff } from "./diff.types";

export function Diff<T extends TBaseTagMap = "div">({ ...props }: TDiff<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
	const className = cn("diff", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
