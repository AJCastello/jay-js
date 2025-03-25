import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TChatComponent } from "./ChatComponent.types.js";

export function ChatComponent<T extends TBaseTagMap = "div">(
	{ component = "chat-bubble", color, ...props }: TChatComponent<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses([component, color, props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
