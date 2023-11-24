import { mergeClasses } from "../../utils/mergeClasses.js";
import { IListItem, ListItem } from "../ListItem/ListItem.js";

export interface IStepItem extends IListItem {
  color?: "step-primary" | "step-secondary" | "step-accent" | "step-info" | "step-success" | "step-warning" | "step-error";
}

export function StepItem({ color, ...props }: IStepItem): HTMLElement {
  const className = mergeClasses([
    "step",
    color,
    props.className
  ]);
  const stepItem = ListItem({ ...props, className });
  return stepItem;
}