import { Base } from "../Base/Base.js";
import { TDropdown } from "./Dropdown.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Dropdown<T extends TBaseTagMap = "div">({
  position = "dropdown-bottom",
  openOnHover,
  forceOpen,
  toEnd,
  ...props
}: TDropdown<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "dropdown",
    position,
    openOnHover ? "dropdown-hover" : "",
    forceOpen ? "dropdown-open" : "",
    toEnd ? "dropdown-end" : "",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
