import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TChat } from "./Chat.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Chat<T extends TBaseTagMap = "div">({
  position = "chat-start",
  ...props
}: TChat<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    position,
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
