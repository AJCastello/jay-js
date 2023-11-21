import { IBaseElement } from "../BaseElement/index.js";
import { Box } from "../Box/Box.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

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
