import { BaseElement, IBaseElement } from "..";

export interface IIcon extends IBaseElement {
  icon?: string;
  type?: string;
  prefix?: string;
}

export function Icon({
  icon = "circle",
  type = "solid",
  ...props
}: IIcon): HTMLElement {
  const iconElement = BaseElement({
    tag: "i",
    ...props,
    className: `${type} ${icon} ${props.className || ""}`,
  });

  return iconElement;
}
