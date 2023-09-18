import { mergeClasses } from "../../utils";
import { ITypography, Typography } from "../Typography";

export function CardDescription({ ...props }: ITypography): HTMLElement {
  const className = mergeClasses([
    "card-description",
    props.className
  ]);
  const cardDescription = Typography({
    ...props,
    className
  });
  return cardDescription;
}
