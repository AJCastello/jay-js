import { BaseElement, IBaseElement } from "..";

export interface IImg extends IBaseElement {
  src: string;
  alt?: string;
}

export function Img({ src, alt, ...props }: IImg): HTMLImageElement {
  const img = BaseElement({
    tag: "img",
    ...props,
  }) as HTMLImageElement;

  src && (img.src = src);
  alt && (img.alt = alt);

  return img;
}
