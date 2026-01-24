import { cn } from "../../utils/cn";
import type { TCard } from "./card.types";

export function Card({
	className,
	imagePosition,
	imageFull,
	variant,
	size,
	children,
	...props
}: TCard = {}): HTMLDivElement {
	return (
		<div
			{...(props as any)}
			className={cn(
				"card shadow-md hover:shadow-xl transition-all duration-500 ease-in-out",
				variant,
				size,
				(imagePosition === "left" || imagePosition === "right") && "card-side",
				imageFull && "image-full",
				className,
			)}
		>
			{children}
		</div>
	) as unknown as HTMLDivElement;
}
