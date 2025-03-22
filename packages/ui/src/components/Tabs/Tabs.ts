import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TTabs } from "./Tabs.types.js";

export function Tabs<T extends TBaseTagMap = "div">(
	{ variant, ...props }: TTabs<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["tabs", variant, props.className]);

	return Base({
		...props,
		role: "tablist",
		className,
	}) as HTMLElementTagNameMap[T];
}
