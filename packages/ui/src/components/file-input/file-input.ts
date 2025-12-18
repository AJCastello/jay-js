import { Input } from "@jay-js/elements";
import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils";
import type { TFileInput } from "./file-input.types";

export function FileInput<T extends TBaseTagMap = "input">(
	{ className, variant, color, size, fullWidth, ...props }: TFileInput<T> = { tag: "input" },
): HTMLElementTagNameMap[T] {
	return Input({
		...props,
		tag: "input",
		type: "file",
		className: cn("file-input", variant, color, size, fullWidth ? "w-full" : "", className),
	}) as HTMLElementTagNameMap[T];
}
