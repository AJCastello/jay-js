import { BaseElement } from "../BaseElement/BaseElement.js";
import { ICardActions } from "./CardActions.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function CardActions({ ...props }: ICardActions): HTMLDivElement {
  const className = mergeClasses([
    "card-actions",
    props.className
  ]);
  return BaseElement<ICardActions>({
    ...props,
    className
  }) as HTMLDivElement;
}