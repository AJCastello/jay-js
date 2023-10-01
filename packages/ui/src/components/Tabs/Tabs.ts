import { IBaseElement, Box } from "..";
import { mergeClasses } from "../../utils";

interface ITabs extends IBaseElement {
  boxed?: boolean;
}

export function Tabs({
  boxed,
  ...props
}: ITabs): HTMLDivElement {
  const className = mergeClasses([
    "tabs",
    boxed ? "tab-boxed" : "",
    props.className,
  ]);

  const tabs = Box({
    ...props,
    className,
  });

  return tabs;
}
