import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { ITimelineItem } from "./TimelineItem.types.js";

export function TimelineItem({
  component,
  boxed,
  ...props
}: ITimelineItem = {}): HTMLDivElement {
  const className = mergeClasses([
    component,
    boxed ? "timeline-box" : "",
    props.className,
  ]);

  return BaseElement({
    ...props,
    className,
  }) as HTMLDivElement;
}
