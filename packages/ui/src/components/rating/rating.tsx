import { cn } from "../../utils/cn";
import type { TRating } from "./rating.types";

export function Rating({ size, half, hidden, className, children, ...props }: TRating = {}) {
	const mergedClassName = cn("rating", size, half ? "rating-half" : "", hidden ? "rating-hidden" : "", className);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
