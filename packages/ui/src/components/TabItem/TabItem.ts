import { mergeClasses } from "../../utils/mergeClasses.js";
import { IBaseElement } from "../BaseElement/BaseElement.js";
import { Input } from "../Input/Input.js";
import { Link } from "../Link/Link.js";

interface ITabItemExt extends IBaseElement {
  size?: "tab-xs" | "tab-sm" | "tab-md" | "tab-lg";
  type?: "input" | "link";
  active?: boolean;
  disabled?: boolean;
}

export type ITabItem = ITabItemExt & Partial<Omit<HTMLAnchorElement, "style" | "children">>;

export function TabItem({
  size,
  active,
  type,
  disabled,
  ...props
}: ITabItem): HTMLAnchorElement | HTMLInputElement {
  const className = mergeClasses([
    "tab",
    active ? "tab-active" : "",
    disabled ? "tab-disabled" : "",
    size,
    props.className,
  ]);

  if(type === "input") {
    return Input({
      className,
      type: "radio",
      name: (props as Partial<HTMLInputElement>).name,
      role: "tab",
      ariaLabel: props.children?.toString() ?? "",
    });
  }

  return Link({
    ...props,
    role: "tab",
    className,
  });
}