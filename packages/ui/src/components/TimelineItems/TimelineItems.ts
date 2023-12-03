import { mergeClasses } from "../../utils/mergeClasses.js";
import { ListItem } from "../ListItem/ListItem.js";
import { ITimelineItems } from "./TimelineItems.types.js";

export function TimelineItems({
  ...props
}: ITimelineItems = {}): HTMLUListElement {
  const className = mergeClasses([props.className]);

  return ListItem({
    ...props,
    className,
  });
}
