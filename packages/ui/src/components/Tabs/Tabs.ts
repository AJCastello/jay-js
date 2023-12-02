import { IBaseElement } from "../BaseElement/index.js";
import { Box } from "../Box/Box.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

interface ITabs extends IBaseElement {
  variant?: "tabs-boxed" | "tabs-bordered" | "tabs-lifted";
}

export function Tabs({
  variant,
  ...props
}: ITabs): HTMLDivElement {
  const className = mergeClasses([
    "tabs",
    variant,
    props.className,
  ]);

  const tabs = Box({
    ...props,
    role: "tablist",
    className,
  });

  return tabs;
}
