import { TLink } from "./Link.types.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Link<T extends TBaseTagMap = "a">({
  ...props
}: TLink<T> = { tag: "a" }): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "link",
    props.className,
  ]);

  return Base({
    ...props,
    tag: "a",
    className,
  }) as HTMLElementTagNameMap[T];
}
