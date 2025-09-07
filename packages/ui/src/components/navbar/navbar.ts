import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TNavbar } from "./navbar.types";

export function Navbar<T extends TBaseTagMap = "nav">(
	{ ...props }: TNavbar<T> = { tag: "nav" },
): HTMLElementTagNameMap[T] {
	const className = cn("navbar", props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
