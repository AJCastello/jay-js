import { ISection } from "./Section.js";
import { BaseElement } from "../BaseElement/BaseElement.js";

export function Section({
  variant = "section",
  ...props
}: ISection = {}): HTMLDivElement {
   return BaseElement({
    tag: variant,
    ...props
  }) as HTMLDivElement;
}
