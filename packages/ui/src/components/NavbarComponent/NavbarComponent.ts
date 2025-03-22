import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TNavbarComponent } from "./NavbarComponent.types.js";

export function NavbarComponent<T extends TBaseTagMap = "nav">(
	{ component = "navbar-start", ...props }: TNavbarComponent<T> = { tag: "nav" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses([component, props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
