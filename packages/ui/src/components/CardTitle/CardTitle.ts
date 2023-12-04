import { mergeClasses } from "../../utils/mergeClasses.js";
import { Typography } from "../Typography/index.js";
import { ICardTitle } from "./CardTitle.types.js";

export function CardTitle({ ...props }: ICardTitle): HTMLElement {
  const className = mergeClasses([
    "card-title",
    props.className
  ]);
  
  return Typography({
    ...props,
    className
  });
}