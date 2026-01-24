import { cn } from "../../utils/cn";
import type { TModal } from "./modal.types";

export function Modal({ className, position, children, ...props }: TModal = {}) {
	return (
		<dialog {...(props as any)} className={cn("modal", position, className)}>
			{children}
		</dialog>
	);
}
