import { mergeClasses } from "../../utils/mergeClasses.js";
import { List } from "../List/List.js";
import { TTimeline } from "./Timeline.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Timeline<T extends TBaseTagMap = "ul">({
  direction,
  compact,
  ...props
}: TTimeline<T> = { tag: "ul" }): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "timeline",
    direction,
    compact ? "timeline-compact" : "",
    props.className,
  ]);

  return List({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
