import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import { RippleEffect } from "../RippleEffect/index.js";
import type { TCard } from "./Card.types.js";

export function Card<T extends TBaseTagMap = "div">(
	{ imagePosition, imageFull, variant, size, ripple = true, ...props }: TCard<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses([
		"card shadow-md hover:shadow-xl transition-all duration-500 ease-in-out",
		ripple ? "relative overflow-hidden" : "",
		variant,
		size,
		imagePosition == "left" || imagePosition == "right" ? "card-side" : "",
		imageFull ? "image-full" : "",
		props.className,
	]);

	const cardElement = Base({
		...props,
		className,
	});

	ripple &&
		cardElement.addEventListener("click", (event) => {
			const ripple = RippleEffect(event as MouseEvent);
			cardElement.append(ripple);
		});

	return cardElement as HTMLElementTagNameMap[T];
}
