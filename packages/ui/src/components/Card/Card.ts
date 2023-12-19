import { TCard } from "./Card.types.js";
import { Base } from "../Base/Base.js";
import { RippleEffect } from "../RippleEffect/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Card<T extends TBaseTagMap = "div">({
  imagePosition,
  imageFull,
  variant,
  format,
  ripple = true,
  ...props
}: TCard<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
  const className = mergeClasses([
    "card shadow-md hover:shadow-xl transition-all duration-500 ease-in-out",
    ripple ? "relative overflow-hidden" : "",
    variant,
    format,
    imagePosition == "left" || imagePosition == "right" ? "card-side" : "",
    imageFull ? "image-full" : "",
    props.className
  ]);

  const cardElement = Base({
    ...props,
    className,
  });

  ripple && cardElement.addEventListener("click", event => {
    const ripple = RippleEffect(event as MouseEvent);
    cardElement.append(ripple);
  });

  return cardElement as HTMLElementTagNameMap[T];
}
