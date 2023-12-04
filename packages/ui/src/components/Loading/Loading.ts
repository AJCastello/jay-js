import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { ILoading } from "./Loading.types.js";

export function Loading({
  type = "loading-spinner",
  size = "loading-md",
  ...props
}: ILoading = {}): HTMLSpanElement {
  const className = mergeClasses([
    "loading",
    type,
    size,
    props.className
  ]);

  return BaseElement<ILoading>({
    tag: "span",
    ...props,
    className,
  }) as HTMLSpanElement;
}
