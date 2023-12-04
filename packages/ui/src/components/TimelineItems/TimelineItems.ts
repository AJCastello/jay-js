import { ListItem } from "../ListItem/ListItem.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { ITimelineItems } from "./TimelineItems.types.js";

export function TimelineItems({
  ...props
}: ITimelineItems = {}): HTMLLIElement {
  const className = mergeClasses([
    props.className
  ]);

  return ListItem({
    ...props,
    className,
  });
}
