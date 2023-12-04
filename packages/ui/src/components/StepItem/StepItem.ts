import { ListItem } from "../ListItem/ListItem.js";
import { IStepItem } from "./StepItem.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function StepItem({
  color,
  ...props
}: IStepItem = {}): HTMLElement {
  const className = mergeClasses([
    "step",
    color,
    props.className
  ]);

  return ListItem({
    ...props,
    className
  });
}