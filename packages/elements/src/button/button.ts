import { TBaseTagMap, Base } from "../base";
import { TButton } from "./button.types";

export function Button<T extends TBaseTagMap = "button">(
	props: TButton<T> = { tag: "button" },
): HTMLElementTagNameMap[T] {
	return Base({
		type: "button",
		...props,
		tag: "button",
	}) as HTMLElementTagNameMap[T];
}
