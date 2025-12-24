import { ListItem } from "@jay-js/elements";
import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils";
import type { TMenuItem } from "./menu-item.types";

export function MenuItem<T extends TBaseTagMap = "li">(
	{ disabled, active, focus, ...props }: TMenuItem<T> = { tag: "li" },
): HTMLElementTagNameMap[T] {
	const className = cn(disabled ? "disabled" : "", active ? "active" : "", focus ? "focus" : "", props.className);

	return ListItem({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
