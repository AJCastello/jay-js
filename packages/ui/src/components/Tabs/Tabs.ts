import { ITabs } from "./Tabs.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Tabs({
  variant,
  ...props
}: ITabs = {}): HTMLDivElement {
  const className = mergeClasses([
    "tabs",
    variant,
    props.className,
  ]);

  return BaseElement<ITabs>({
    ...props,
    role: "tablist",
    className,
  }) as HTMLDivElement;
}
