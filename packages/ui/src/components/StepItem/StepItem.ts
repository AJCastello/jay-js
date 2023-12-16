import { ListItem } from "../ListItem/ListItem.js";
import { TStepItem } from "./StepItem.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function StepItem<T extends TBaseTagMap = "li">({
  color,
  ...props
}: TStepItem<T> = { tag: "li"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "step",
    color,
    props.className
  ]);

  return ListItem({
    ...props,
    className
  }) as HTMLElementTagNameMap[T];
}
