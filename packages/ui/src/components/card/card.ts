import { Base, type TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils";
import type { TCard } from "./card.types";

export function Card<T extends TBaseTagMap = "div">(
	{ imagePosition, imageFull, variant, size, ...props }: TCard<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn(
		"card shadow-md hover:shadow-xl transition-all duration-500 ease-in-out",
		variant,
		size,
		imagePosition === "left" || imagePosition === "right" ? "card-side" : "",
		imageFull ? "image-full" : "",
		props.className,
	);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
