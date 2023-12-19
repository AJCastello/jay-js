import { IAvatar } from "./Avatar.types.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Avatar<T extends TBaseTagMap = "div">({
  state,
  ...props
}: IAvatar<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "avatar",
    state,
    props.className,
  ]);

  return Base({
    ...props,
    className
  }) as HTMLElementTagNameMap[T];
}