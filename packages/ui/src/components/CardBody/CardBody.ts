import { mergeClasses } from "../../utils/mergeClasses.js";
import { Base } from "../Base/Base.js";
import { TCardBody } from "./CardBody.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function CardBody<T extends TBaseTagMap = "div">({
  ...props
}: TCardBody<T> = { tag: "div"}): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "card-body",
    props.className,
  ]);

  return Base({
    ...props,
    className,
  }) as HTMLElementTagNameMap[T];
}
