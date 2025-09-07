import { Base, type TBaseTagMap } from "@jay-js/elements";
import type { TDropdown } from "./dropdown.types";
import { cn } from "../../../utils/cn";

export function Dropdown<T extends TBaseTagMap = "div">(
	{ position = "dropdown-bottom", openOnHover, forceOpen, toEnd, ...props }: TDropdown<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn(
		"dropdown",
		position,
		openOnHover ? "dropdown-hover" : "",
		forceOpen ? "dropdown-open" : "",
		toEnd ? "dropdown-end" : "",
		props.className,
	);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
