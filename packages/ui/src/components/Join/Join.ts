import { IJoin } from "./Join.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Join({ ...props }: IJoin = {}): HTMLDivElement {
  const className = mergeClasses([
    "join",
    props.className
  ]);

  return BaseElement({
    ...props,
    className,
  }) as HTMLDivElement;
}
