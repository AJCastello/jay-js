import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { IChatComponent } from "./ChatComponent.types.js";

export function ChatComponent({
  color,
  component = "chat-bubble",
  ...props
}: IChatComponent = {}): HTMLDivElement {
  const className = mergeClasses([
    component,
    props.className,
  ]);

  return BaseElement({
    ...props,
    className
  }) as HTMLDivElement;
}