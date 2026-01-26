import { cn } from "../../utils/cn";
import type { TModalBackdrop } from "./modal-backdrop.types";

export function ModalBackdrop({ className, children, ...props }: TModalBackdrop = {}) {
	return (
		<div className={cn("modal-backdrop", className)}>
			<button type="button" {...(props as any)} className={className}>
				{children}
			</button>
		</div>
	);
}
