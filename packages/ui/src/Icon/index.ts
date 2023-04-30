import { BaseElement, IBaseElement } from "..";

export interface IIcon extends IBaseElement {
  icon?: string;
  type?: string;
}

export function Icon({
  icon = "circle",
  type = "solid",
  ...props
}: IIcon): HTMLElement {
  const iconElement = BaseElement({
    tag: "i",
    ...props,
    className: `fa-${type} fa-${icon} ${props.className || ""}`,
  });

  return iconElement;
}
