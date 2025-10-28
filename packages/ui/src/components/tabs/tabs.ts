import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TTabs } from "./tabs.types";

export function Tabs<T extends TBaseTagMap = "div">(
	{ variant, ...props }: TTabs<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("tabs", variant, props.className);

	return Base({
		...props,
		role: "tablist",
		className,
	}) as HTMLElementTagNameMap[T];
}
