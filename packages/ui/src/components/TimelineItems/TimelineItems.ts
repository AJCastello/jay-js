import { ListItem } from "../ListItem/ListItem.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TTimelineItems } from "./TimelineItems.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function TimelineItems<T extends TBaseTagMap = "li">({
  ...props
}: TTimelineItems<T> = { tag: "li" }): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    props.className
  ]);

  return ListItem({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
