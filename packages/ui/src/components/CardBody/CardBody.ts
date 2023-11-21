import { mergeClasses } from "../../utils/mergeClasses.js";
import { IBox, Box } from "../Box/index.js";

export function CardBody({ ...props }: IBox): HTMLElement {
  const className = mergeClasses([
    "card-body",
    props.className
  ]);
  const cardBody = Box({
    ...props,
    className
  });
  return cardBody;
}