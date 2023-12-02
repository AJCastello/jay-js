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

  const element = BaseElement({
    tag: "div",
    ...props,
    className,
    role: "progressbar",
  }) as HTMLDivElement;

  element.setAttribute(
    "style",
    `
    --value: ${value};
    --size: ${size};
    --thickness: ${thickness};`
  );


  

  return element;
}
