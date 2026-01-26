import { cn } from "../../utils/cn";
import type { TModalAction } from "./modal-action.types";

export function ModalAction({ className, children, ...props }: TModalAction = {}) {
	return (
		<div {...(props as any)} className={cn("modal-action", className)}>
			{children}
		</div>
	);
}
