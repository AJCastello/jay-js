import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { ICardBody } from "./CardBody.types.js";

export function CardBody({ ...props }: ICardBody): HTMLDivElement {
  const className = mergeClasses([
    "card-body",
    props.className
  ]);
  
  return BaseElement<ICardBody>({
    ...props,
    className
  }) as HTMLDivElement;
}