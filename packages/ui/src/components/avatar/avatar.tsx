import { cn } from "../../utils";
import type { IAvatar } from "./avatar.types";

export function Avatar({ state, className, children, ...props }: IAvatar = {}) {
	const mergedClassName = cn("avatar", state, className);
	return (
		<div {...props} className={mergedClassName}>
			{children}
		</div>
	);
}
