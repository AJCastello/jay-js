import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TAlert } from "./Alert.types.js";

export function Alert<T extends TBaseTagMap = "div">(
	{ severity = "alert-info", direction, variation, ...props }: TAlert<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["alert", severity, direction, variation, props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
