import { Base, type TBaseTagMap } from "@jay-js/system";
import type { TInput } from "./input.types";

export function Input<T extends TBaseTagMap = "input">(
	{ ...props }: TInput<T> = { tag: "input" },
): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tag: "input",
	}) as HTMLElementTagNameMap[T];
}
