import { ITypography, Typography } from "../Typography/index.js";

export function DropdownLabel({ ...props }: ITypography): HTMLLabelElement {
  const dropdownLabel = Typography({
    ...props,
    tabIndex: 0,
    variant: "label"
  }) as HTMLLabelElement;
  return dropdownLabel;
}