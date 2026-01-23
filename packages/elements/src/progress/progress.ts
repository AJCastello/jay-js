import { Base, type TBaseTagMap } from "@jay-js/system";
import type { TProgress } from "./progress.types";

export function Progress<T extends TBaseTagMap = "progress">(
	props: TProgress<T> = { tag: "progress" },
): HTMLElementTagNameMap[T] {
	return Base<"base">({
		...props,
		tag: "progress",
	}) as HTMLElementTagNameMap[T];
}
