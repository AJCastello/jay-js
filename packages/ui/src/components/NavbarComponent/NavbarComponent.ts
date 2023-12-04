import { mergeClasses } from "../../utils/mergeClasses.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { INavbarComponent } from "./NavbarComponent.types.js";

export function NavbarComponent({
  component = "navbar-start",
  ...props
}: INavbarComponent = {}): HTMLDivElement {
  const className = mergeClasses([
    component, 
    props.className]);

  return BaseElement({
    ...props,
    className,
  }) as HTMLDivElement;
}
