import { TAlert } from "./Alert.types.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Alert<T extends TBaseTagMap = "div">({
  severity = "alert-info",
  ...props
}: TAlert<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "alert",
    severity,
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
