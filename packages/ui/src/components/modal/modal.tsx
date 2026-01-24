import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TModal } from "./modal.types";

export function Modal<T extends TBaseTagMap = "dialog">(
	{ tag: _tag, className, position, children, ...props }: TModal<T> = { tag: "dialog" as T },
): HTMLElementTagNameMap[T] {
	return (
		<dialog {...(props as any)} className={cn("modal", position, className)}>
			{children}
		</dialog>
	) as unknown as HTMLElementTagNameMap[T];
}
