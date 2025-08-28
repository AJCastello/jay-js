import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TDropdownContent } from "./dropdown-content.types";

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
