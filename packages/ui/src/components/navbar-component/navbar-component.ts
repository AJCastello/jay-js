import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TNavbarComponent } from "./navbar-component.types";

export function NavbarComponent<T extends TBaseTagMap = "nav">(
	{ component = "navbar-start", ...props }: TNavbarComponent<T> = { tag: "nav" },
): HTMLElementTagNameMap[T] {
	const className = cn(component, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
