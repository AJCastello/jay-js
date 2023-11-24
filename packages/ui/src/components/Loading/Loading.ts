import { BaseElement, IBaseElement } from "../BaseElement/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

interface ILoadingExt extends IBaseElement {
  type?: "loading-spinner" | "loading-dots" | "loading-ring" | "loading-ball" | "loading-bars" | "loading-infinity";
  size?: "loading-xs" | "loading-sm" | "loading-md" | "loading-lg";
}

export type ILoading = ILoadingExt & Partial<Omit<HTMLSpanElement, "style">>;

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
  const loadingElement = BaseElement<ILoading>({
    tag: "span",
    ...props,
    className,
  }) as HTMLSpanElement;

  return loadingElement;
}
