import { cn } from "../../utils/cn";
import type { TModalBox } from "./modal-box.types";

export function ModalBox({ className, children, ...props }: TModalBox = {}) {
	return (
		<div {...(props as any)} className={cn("modal-box", className)}>
			{children}
		</div>
	);
}
