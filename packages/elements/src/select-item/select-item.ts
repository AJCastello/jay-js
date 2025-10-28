import { Base, type TBaseTagMap } from "../base";
import type { TSelectItem } from "./select-item.types";

export function SelectItem<T extends TBaseTagMap = "option">(
	{ ...props }: TSelectItem<T> = { tag: "option" },
): HTMLElementTagNameMap[T] {
	return Base({
		tag: "option",
		...props,
	}) as HTMLElementTagNameMap[T];
}
