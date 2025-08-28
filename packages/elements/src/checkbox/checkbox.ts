import { TBaseTagMap, Base } from "../base";
import { TCheckbox } from "./checkbox.types";

export function Checkbox<T extends TBaseTagMap = "input">(
	props: TCheckbox<T> = { tag: "input" },
): HTMLElementTagNameMap[T] {
	return Base<"input">({
		tag: "input",
		type: "checkbox",
		...props,
	}) as HTMLElementTagNameMap[T];
}
