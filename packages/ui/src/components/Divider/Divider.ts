import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TDivider } from "./Divider.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Divider<T extends TBaseTagMap = "div">({
  orientation,
  ...props
}: TDivider<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "divider",
    orientation,
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
