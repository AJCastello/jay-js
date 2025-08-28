import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TNavbarComponent } from "./navbar-component.types";

export function NavbarComponent<T extends TBaseTagMap = "nav">(
	{ component = "navbar-start", ...props }: TNavbarComponent<T> = { tag: "nav" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(component, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
