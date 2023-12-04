import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { IRadialProgress } from "./RadialProgress.types.js";

export function RadialProgress({
  value = 0,
  size,
  thickness,
  ...props
}: IRadialProgress = {}): HTMLDivElement {
  const className = mergeClasses([
    "radial-progress", 
    props.className
  ]);

  const element = BaseElement({
    ...props,
    className,
    role: "progressbar",
  }) as HTMLDivElement; 
  
  if(value){
    const currentStyle = element.getAttribute("style");
    element.setAttribute("style", `${currentStyle} --value: ${value};`);
  }

  if(size){
    const currentStyle = element.getAttribute("style");
    element.setAttribute("style", `${currentStyle} --size: ${size};`);
  }

  if(thickness){
    const currentStyle = element.getAttribute("style");
    element.setAttribute("style", `${currentStyle} --thickness: ${thickness};`);
  }
  
  return element;
}
