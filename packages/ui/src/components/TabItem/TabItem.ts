import { Link } from "../Link/Link.js";
import { Input } from "../Input/Input.js";
import { ITabItem } from "./TabItem.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function TabItem({
  size,
  active,
  type,
  disabled,
  ...props
}: ITabItem = {}): HTMLAnchorElement | HTMLInputElement {
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