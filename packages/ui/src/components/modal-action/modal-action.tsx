import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TModalAction } from "./modal-action.types";

export function ModalAction<T extends TBaseTagMap = "div">(
	{ tag, className, children, ...props }: TModalAction<T> = { tag: "div" as T },
): HTMLElementTagNameMap[T] {
	const Tag = (tag ?? "div") as any;

	return (
		<Tag {...(props as any)} className={cn("modal-action", className)}>
			{children}
		</Tag>
	) as unknown as HTMLElementTagNameMap[T];
}
