import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TInput } from "./Input.types.js";

export function Input<T extends TBaseTagMap = "input">(
	{ ...props }: TInput<T> = { tag: "input" },
): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tag: "input",
	}) as HTMLElementTagNameMap[T];
}
