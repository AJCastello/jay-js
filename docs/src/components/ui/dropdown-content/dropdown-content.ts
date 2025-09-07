import { Base, type TBaseTagMap } from "@jay-js/elements";
import type { TDropdownContent } from "./dropdown-content.types";
import { cn } from "../../../utils/cn";

export function DropdownContent<T extends TBaseTagMap = "div">(
	{ ...props }: TDropdownContent<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("dropdown-content", props.className);

	return Base({
		...props,
		className,
		tabIndex: 0,
	}) as HTMLElementTagNameMap[T];
}
