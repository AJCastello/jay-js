import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TModal } from "./modal.types";

export function Modal<T extends TBaseTagMap = "dialog">(
	{ position, ...props }: TModal<T> = { tag: "dialog" },
): HTMLElementTagNameMap[T] {
	const className = cn("modal", position, props.className);

	return Base({
		...props,
		tag: "dialog",
		className,
	}) as HTMLElementTagNameMap[T];
}
