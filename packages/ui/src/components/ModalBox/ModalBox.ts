import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TModalBox } from "./ModalBox.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function ModalBox<T extends TBaseTagMap = "div">({
  ...props
}: TModalBox<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "modal-box",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
