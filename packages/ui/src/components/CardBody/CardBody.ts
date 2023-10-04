import { mergeClasses } from "../../utils";
import { IBox, Box } from "../Box";

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