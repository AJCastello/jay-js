import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { ITimelineItem } from "./TimelineItem.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function TimelineItem<T extends TBaseTagMap = "div">({
  component,
  boxed,
  ...props
}: ITimelineItem<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    component,
    boxed ? "timeline-box" : "",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
