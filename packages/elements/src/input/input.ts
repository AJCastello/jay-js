import { TBaseTagMap, Base } from "../base";
import { TInput } from "./input.types";

export function Input<T extends TBaseTagMap = "input">(
	{ ...props }: TInput<T> = { tag: "input" },
): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tag: "input",
	}) as HTMLElementTagNameMap[T];
}
