import { mergeClasses } from "../../utils";
import { IListItem, ListItem } from "../ListItem";

export interface IStepItem extends IListItem {
  color?: "step-primary" | "step-secondary" | "step-accent" | "step-info" | "step-success" | "step-warning" | "step-error";
}

export function StepItem({ ...props }: IStepItem): HTMLElement {
  const className = mergeClasses([
    "step",
    props.color,
    props.className
  ]);
  const stepItem = ListItem({ ...props, className });
  return stepItem;
}