import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TTabs } from "./tabs.types";

export function Tabs<T extends TBaseTagMap = "div">(
	{ variant, ...props }: TTabs<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("tabs", variant, props.className);

	return Base({
		...props,
		role: "tablist",
		className,
	}) as HTMLElementTagNameMap[T];
}
