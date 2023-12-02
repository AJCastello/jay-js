import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement, IBaseElement } from "../BaseElement/BaseElement.js";

export interface IMenuTitleExt extends IBaseElement {
  tag?: string;
}

export type IMenuTitle = IMenuTitleExt &
  Partial<Omit<HTMLElement, "style" | "children">>;

export function MenuTitle({
  tag = "li",
  ...props
}: IMenuTitle = {}): HTMLElement {
  const className = mergeClasses(["menu-title", props.className]);

  return BaseElement({
    tag,
    ...props,
    className,
  });
}
