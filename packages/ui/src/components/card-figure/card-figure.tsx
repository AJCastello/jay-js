import type { TCardFigure } from "./card-figure.types";

export function CardFigure({ className, children, ...props }: TCardFigure = {}): HTMLElement {
	return (
		<figure {...(props as any)} className={className}>
			{children}
		</figure>
	) as unknown as HTMLElement;
}
