import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TChatComponent } from "./ChatComponent.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function ChatComponent<T extends TBaseTagMap = "div">({
  component = "chat-bubble",
  color,
  ...props
}: TChatComponent<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    component,
    color,
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
