import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TModalBox } from "./modal-box.types";

export function ModalBox<T extends TBaseTagMap = "div">(
	{ tag, className, children, ...props }: TModalBox<T> = { tag: "div" as T },
): HTMLElementTagNameMap[T] {
	const Tag = (tag ?? "div") as any;

	return (
		<Tag {...(props as any)} className={cn("modal-box", className)}>
			{children}
		</Tag>
	) as unknown as HTMLElementTagNameMap[T];
}
