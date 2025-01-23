import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";
import { Box } from "../Box/Box.js";
import { TButton } from "../Button/Button.types.js";

export function ModalBackdrop<T extends TBaseTagMap = "div">({
  ...props
}: TButton<T> = { tag: "div" }): HTMLDivElement {
  const className = mergeClasses([
    "modal-backdrop",
    props.className
  ]);

  return Box({
    className,
    children: Base({
      tag: "button",
      ...props
    })
  }) as HTMLDivElement;
}
