import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { IDivider } from "./Divider.types.js";

export function Divider({ orientation, ...props }: IDivider = {}): HTMLDivElement {
  return BaseElement<IDivider>({
    ...props,
    className: mergeClasses([
      "divider",
      orientation,
      props.className
    ])
  }) as HTMLDivElement;
}
