import { IAvatar } from "./Avatar.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Avatar({
  state,
  ...props
}: IAvatar = {}): HTMLDivElement {
  const className = mergeClasses([
    "avatar",
    state,
    props.className,
  ]);

  return BaseElement<IAvatar>({
    ...props,
    className
  }) as HTMLDivElement;
}
