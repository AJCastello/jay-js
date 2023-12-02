import { BaseElement, IBaseElement } from "../BaseElement/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export interface IRadialProgress extends IBaseElement {
  value?: number;
  size?: string;
  thickness?: string;
}

export function RadialProgress({
  value = 0,
  size = "12rem",
  thickness = "2px",
  ...props
}: IRadialProgress = {}): HTMLDivElement {
  const className = mergeClasses(["radial-progress", props.className]);

  return BaseElement({
    tag: "div",
    ...props,
    className,
    style: {
      "--value": value,
      "--size": size,
      "--thickness": thickness,
    },
    role: "progressbar",
  }) as HTMLDivElement;
}
