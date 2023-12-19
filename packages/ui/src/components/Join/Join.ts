import { Base } from "../Base/Base.js";
import { TJoin } from "./Join.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Join<T extends TBaseTagMap = "div">({ ...props }: TJoin<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "join",
    props.className
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
