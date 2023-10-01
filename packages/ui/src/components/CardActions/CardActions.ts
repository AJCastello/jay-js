import { mergeClasses } from "../../utils";
import { IBox, Box } from "../Box";

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