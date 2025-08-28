import { TBaseTagMap, Base } from "../base";
import { TRadio } from "./radio.types";

export function Radio<T extends TBaseTagMap = "input">(
	props: TRadio<T> = { tag: "input" },
): HTMLElementTagNameMap[T] {
	return Base<"input">({
		...props,
		tag: "input",
		type: "radio",
	}) as HTMLElementTagNameMap[T];
}
