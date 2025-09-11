import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../../utils/cn";
import type { TDropdown } from "./dropdown.types";

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
