import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TFooter } from "./footer.types";

export function Footer<T extends TBaseTagMap = "footer">(
	{ position, direction, ...props }: TFooter<T> = { tag: "footer" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("footer", position, direction, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
