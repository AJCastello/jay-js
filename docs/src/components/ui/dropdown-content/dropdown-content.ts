import { Base, mergeClasses, type TBaseTagMap } from "@jay-js/elements";
import type { TDropdownContent } from "./dropdown-content.types";

export function DropdownContent<T extends TBaseTagMap = "div">(
	{ ...props }: TDropdownContent<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("dropdown-content", props.className);

	return Base({
		...props,
		className,
		tabIndex: 0,
	}) as HTMLElementTagNameMap[T];
}
