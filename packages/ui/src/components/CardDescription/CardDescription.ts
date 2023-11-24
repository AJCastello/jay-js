import { mergeClasses } from "../../utils/mergeClasses.js";
import { ITypography, Typography } from "../Typography/index.js";

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
