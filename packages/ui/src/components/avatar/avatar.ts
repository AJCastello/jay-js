import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { IAvatar } from "./avatar.types";

export function Avatar<T extends TBaseTagMap = "div">(
	{ state, ...props }: IAvatar<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("avatar", state, props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
