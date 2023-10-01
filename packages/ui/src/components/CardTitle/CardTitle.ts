import { mergeClasses } from "../../utils";
import { ITypography, Typography } from "../Typography";

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