import { mergeClasses } from "../../utils/mergeClasses.js";
import { List } from "../List/List.js";
import { ITimeline } from "./Timeline.types.js";

export function Timeline({
  direction,
  compact,
  ...props
}: ITimeline = {}): HTMLUListElement {
  const className = mergeClasses([
    "timeline",
    direction,
    compact ? "timeline-compact" : "",
    props.className,
  ]);

  return List({
    ...props,
    className,
  });
}
