import { BaseElement } from "../BaseElement/BaseElement.js";
import { ITypography, TTypographyMap, TTypographyVariants } from "./Typography.types.js";

export function Typography<T extends TTypographyVariants = "p">({
  variant,
  ...props
}: ITypography<T> = {}): TTypographyMap[T] {
  return BaseElement({
    tag: variant || "p",
    ...props
  }) as TTypographyMap[T]
}
