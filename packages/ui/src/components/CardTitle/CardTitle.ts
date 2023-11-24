import { mergeClasses } from "../../utils/mergeClasses.js";
import { ITypography, Typography } from "../Typography/index.js";

export function CardTitle({ ...props }: ITypography): HTMLElement {
  const className = mergeClasses([
    "card-title",
    props.className
  ]);
  const cardTitle = Typography({
    ...props,
    className
  });
  return cardTitle;
}