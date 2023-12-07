import { ITypography, Typography } from "../Typography/index.js";

export function DropdownLabel({ ...props }: ITypography<"label">): HTMLLabelElement {
  return Typography({
    ...props,
    tabIndex: 0,
    variant: "label"
  }) as HTMLLabelElement;
}