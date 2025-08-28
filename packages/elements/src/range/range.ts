import { TBaseTagMap } from "../base";
import { Input } from "../input";
import { TRange } from "./range.types";

export function Range<T extends TBaseTagMap = "input">(
	props: TRange<T> = { tag: "input" },
): HTMLElementTagNameMap[T] {
	return Input<"input">({
		...props,
		tag: "input",
		type: "range",
	}) as HTMLElementTagNameMap[T];
}
