import { mergeClasses } from "../../utils";
import { ILink, Link } from "../Link";

interface ITabItem extends ILink {
  size?: "tab-xs" | "tab-sm" | "tab-md" | "tab-lg";
  variant?: "tab-bordered" | "tab-lifted";
  active?: boolean;
  disabled?: boolean;
}

export function TabItem({
  size,
  variant,
  active,
  disabled,
  ...props
}: ITabItem): HTMLAnchorElement {
  const className = mergeClasses([
    "tab",
    "no-underline",
    active ? "tab-active" : "",
    disabled ? "tab-disabled" : "",
    size,
    variant,
    props.className,
  ]);

  const tabButton = Link({
    ...props,
    className,
  });

  return tabButton;
}