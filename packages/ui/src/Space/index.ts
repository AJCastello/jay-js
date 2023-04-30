import { Section, ISection } from "../Section";

export interface ISpace extends ISection {
  height?: number;
}

export function Space({ height = 10, ...props }: ISpace = {}): HTMLElement {
  const space = Section({
    style: {
      height: `${height}px`,
    },
    ...props
  });

  return space;
}
