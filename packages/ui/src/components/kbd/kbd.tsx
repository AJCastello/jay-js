import { cn } from "../../utils/cn";
import type { TKbd } from "./kbd.types";

export function Kbd({ size, className, children, ...props }: TKbd = {}) {
	const mergedClassName = cn("kbd", size, className);
	return (
		<kbd {...props} className={mergedClassName}>
			{children}
		</kbd>
	);
}
