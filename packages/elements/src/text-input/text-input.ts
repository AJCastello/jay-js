import { TBaseTagMap } from "../base";
import { Input } from "../input";
import { TTextInput } from "./text-input.types";

export function TextInput<T extends TBaseTagMap = "input">(
	props: TTextInput<T> = { tag: "input" },
): HTMLElementTagNameMap[T] {
	return Input<"input">({
		...props,
		tag: "input",
		type: "text",
	}) as HTMLElementTagNameMap[T];
}