import { Section, ISection } from "../Section";

export type IDivider = ISection

export function Divider(props: IDivider = {}): HTMLDivElement {
  const divider = Section({
    className: "divider",
    ...props,
  });
  return divider;
}
