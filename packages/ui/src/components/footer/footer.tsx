import { cn } from "../../utils/cn";
import type { TFooter } from "./footer.types";

export function Footer({ position, direction, className, children, ...props }: TFooter = {}) {
	const mergedClassName = cn("footer", position, direction, className);
	return (
		<footer {...props} className={mergedClassName}>
			{children}
		</footer>
	);
}
