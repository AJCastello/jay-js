import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TNavbar } from "./navbar.types";

export function Navbar<T extends TBaseTagMap = "nav">(
	{ ...props }: TNavbar<T> = { tag: "nav" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("navbar", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
