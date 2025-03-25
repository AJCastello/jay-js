import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TChat } from "./Chat.types.js";

export function Chat<T extends TBaseTagMap = "div">(
	{ position = "chat-start", ...props }: TChat<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses([position, props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
