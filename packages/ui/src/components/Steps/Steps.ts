import { List } from "../List/List.js";
import { TSteps } from "./Steps.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Steps<T extends TBaseTagMap = "ul">({
  orientation = "steps-horizontal",
  ...props
}: TSteps<T> = { tag: "ul"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "steps",
    orientation,
    props.className,
  ]);

  return List({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
