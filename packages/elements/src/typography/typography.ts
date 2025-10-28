import { Base, type TBaseTagMap } from "../base";
import type { TTypography } from "./typography.types";

export function Typography<T extends TBaseTagMap = "p">(
	{ ...props }: TTypography<T> = { tag: "p" },
): HTMLElementTagNameMap[T] {
	return Base({
		...props,
	}) as HTMLElementTagNameMap[T];
}
