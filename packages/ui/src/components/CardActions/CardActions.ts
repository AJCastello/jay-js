import { mergeClasses } from "../../utils/mergeClasses.js";
import { IBox, Box } from "../Box/index.js";

export function CardActions({ ...props }: IBox): HTMLElement {
  const className = mergeClasses([
    "card-actions",
    props.className
  ]);
  const cardActions = Box({
    ...props,
    className
  });
  return cardActions;
}