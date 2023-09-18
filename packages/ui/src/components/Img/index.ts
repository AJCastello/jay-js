import { BaseElement, IBaseElement } from "..";

export type IImg = IBaseElement & Partial<Omit<HTMLImageElement, "style">>;

export function Img({ ...props }: IImg = {}): HTMLImageElement {
  const img = BaseElement<IImg>({
    ...props,
    tag: "img",
  }) as HTMLImageElement;

  return img;
}
