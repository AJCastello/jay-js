import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TIcon } from "./Icon.types.js";

export function Icon<T extends TBaseTagMap = "i">(
	{ icon, type, ...props }: TIcon<T> = { tag: "i" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses([type, icon, props.className]);

	return Base({
		...props,
		tag: "i",
		className,
	}) as HTMLElementTagNameMap[T];
}
