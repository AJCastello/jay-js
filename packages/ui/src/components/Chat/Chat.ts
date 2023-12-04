import { IChat } from "./Chat.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";

export function Chat({
  position = "chat-start",
  ...props
}: IChat = {}): HTMLDivElement {
  const className = mergeClasses([
    "chat",
    position,
    props.className,
  ]);

  return BaseElement<IChat>({
    ...props,
    className
  }) as HTMLDivElement;
}
