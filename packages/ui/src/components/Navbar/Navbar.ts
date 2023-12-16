import { Base } from "../Base/Base.js";
import { TNavbar } from "./Navbar.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Navbar<T extends TBaseTagMap = "nav">({
  ...props
}: TNavbar<T> = { tag: "nav"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "navbar",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
