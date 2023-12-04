import { mergeClasses } from "../../utils/mergeClasses.js";
import { Typography } from "../Typography/index.js";
import { ICardDescription } from "./CardDescription.types.js";

export function CardDescription({ ...props }: ICardDescription): HTMLElement {
  const className = mergeClasses([
    "card-description",
    props.className
  ]);
  
  return Typography({
    ...props,
    className
  });
}
