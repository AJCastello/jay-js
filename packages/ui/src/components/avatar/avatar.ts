import { Base, type TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils";
import type { IAvatar } from "./avatar.types";

export function Avatar<T extends TBaseTagMap = "div">(
	{ state, ...props }: IAvatar<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("avatar", state, props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
