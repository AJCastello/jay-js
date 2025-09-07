import { Base, type TBaseTagMap } from "@jay-js/elements";
import type { TFooter } from "./footer.types";
import { cn } from "../../../utils/cn";

export function Footer<T extends TBaseTagMap = "footer">(
	{ position, direction, ...props }: TFooter<T> = { tag: "footer" },
): HTMLElementTagNameMap[T] {
	const className = cn("footer", position, direction, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
