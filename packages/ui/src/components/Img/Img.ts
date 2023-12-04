import { IImg } from "./Img.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";

export function Img({ ...props }: IImg = {}): HTMLImageElement {
  return BaseElement<IImg>({
    ...props,
    tag: "img",
  }) as HTMLImageElement;
}
