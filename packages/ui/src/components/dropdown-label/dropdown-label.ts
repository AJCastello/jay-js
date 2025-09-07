import { Base, type TBase, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";

export function DropdownLabel<T extends TBaseTagMap = "label">(
	{ ...props }: TBase<T> = { tag: "label" },
): HTMLElementTagNameMap[T] {
	return Base({
		...props,
		tabIndex: 0,
		tag: "label",
	}) as HTMLElementTagNameMap[T];
}
