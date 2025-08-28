import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TChat } from "./chat.types";

export function Chat<T extends TBaseTagMap = "div">(
	{ position = "chat-start", ...props }: TChat<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("chat", position, props.className);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
