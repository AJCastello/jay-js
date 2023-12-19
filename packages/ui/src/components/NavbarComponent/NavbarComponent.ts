import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TNavbarComponent } from "./NavbarComponent.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function NavbarComponent<T extends TBaseTagMap = "nav">({
  component = "navbar-start",
  ...props
}: TNavbarComponent<T> = { tag: "nav" }): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    component,
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
