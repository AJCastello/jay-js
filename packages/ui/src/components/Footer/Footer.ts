import { TFooter } from "./Footer.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Footer<T extends TBaseTagMap = "footer">({
  position,
  ...props
}: TFooter<T> = { tag: "footer"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "footer",
    position,
    props.className,
  ]);

  return Base({
    ...props,
    className
  }) as HTMLElementTagNameMap[T];
}
