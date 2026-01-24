import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TAlert } from "./alert.types";

export function Alert<T extends TBaseTagMap = "div">(
	{ tag, className, severity = "alert-info", direction, variation, children, ...props }: TAlert<T> = {
		tag: "div" as T,
	},
): HTMLElementTagNameMap[T] {
	const Tag = (tag ?? "div") as any;

	return (
		<Tag {...(props as any)} className={cn("alert", severity, direction, variation, className)}>
			{children}
		</Tag>
	) as unknown as HTMLElementTagNameMap[T];
}
