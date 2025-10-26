import { Base } from "../base/base.js";
import type { TBaseTagMap } from "../base/base.types.js";
import type { TFileInput } from "./file-input.types.js";

export function FileInput<T extends TBaseTagMap = "div">(
	props: TFileInput<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	return Base<"input">({
		tag: "input",
		type: "file",
		...props,
	}) as HTMLElementTagNameMap[T];
}
