import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TNavbar } from "./Navbar.types.js";

export function Navbar<T extends TBaseTagMap = "nav">(
	{ ...props }: TNavbar<T> = { tag: "nav" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["navbar", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
