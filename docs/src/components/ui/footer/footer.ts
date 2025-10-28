import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../../utils/cn";
import type { TFooter } from "./footer.types";

export function Footer<T extends TBaseTagMap = "footer">(
	{ position, direction, ...props }: TFooter<T> = { tag: "footer" },
): HTMLElementTagNameMap[T] {
	const className = cn("footer", position, direction, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
