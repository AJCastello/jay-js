import { TIcon } from "./Icon.types.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Icon<T extends TBaseTagMap = "i">({
  icon,
  type,
  ...props
}: TIcon<T> = { tag: "i"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    type,
    icon,
    props.className,
  ]);

  return Base({
    ...props,
    tag: "i",
    className,
  }) as HTMLElementTagNameMap[T];
}
