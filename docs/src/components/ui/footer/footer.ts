import { Base, mergeClasses, type TBaseTagMap } from "@jay-js/elements";
import type { TFooter } from "./footer.types";

export function Footer<T extends TBaseTagMap = "footer">(
	{ position, direction, ...props }: TFooter<T> = { tag: "footer" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("footer", position, direction, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
