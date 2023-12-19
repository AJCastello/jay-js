import { TModal } from "./Modal.types.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Modal<T extends TBaseTagMap = "dialog">({
  position,
  ...props
}: TModal<T> = { tag: "dialog"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "modal",
    position,
    props.className
  ]);

  return Base({
    ...props,
    tag: "dialog",
    className,
  }) as HTMLElementTagNameMap[T];
}
