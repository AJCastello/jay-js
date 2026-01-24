import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TModalBackdrop } from "./modal-backdrop.types";

export function ModalBackdrop<T extends TBaseTagMap = "div">(
	{ tag: _tag, className, children, ...props }: TModalBackdrop<T> = { tag: "div" as T },
): HTMLDivElement {
	return (
		<div className={cn("modal-backdrop", className)}>
			<button type="button" {...(props as any)} className={className}>
				{children}
			</button>
		</div>
	) as unknown as HTMLDivElement;
}
