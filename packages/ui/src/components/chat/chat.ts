import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TChat } from "./chat.types";

export function Chat<T extends TBaseTagMap = "div">(
	{ position = "chat-start", ...props }: TChat<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("chat", position, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
