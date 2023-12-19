import { TTabs } from "./Tabs.types.js";
import { Base } from "../Base/Base.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Tabs<T extends TBaseTagMap = "div">({
  variant,
  ...props
}: TTabs<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "tabs",
    variant,
    props.className,
  ]);

  return Base({
    ...props,
    role: "tablist",
    className,
  }) as HTMLElementTagNameMap[T];
}
