import { IBaseElement, RippleEffect, Box } from "..";
import { mergeClasses } from "../../";

export interface ICard extends IBaseElement {
  imagePosition?: "left" | "right";
  imageFull?: boolean;
  variant?: "card-outline";
  format?: "card-compact" | "card-normal";
  ripple?: boolean;
}

export function Card({
  imagePosition,
  imageFull,
  variant,
  format,
  ripple = true,
  ...props
}: ICard = {}): HTMLDivElement {
  const className = mergeClasses([
    "card shadow-md hover:shadow-xl transition-all duration-500 ease-in-out",
    ripple ? "relative overflow-hidden" : "",
    variant,
    format,
    imagePosition == "left" || imagePosition == "right" ? "card-side" : "",
    imageFull ? "image-full" : "",
    props.className
  ]);

  const cardElement = Box({ ...props, className });

  ripple && cardElement.addEventListener("click", event => {
    const ripple = RippleEffect(event);
    cardElement.append(ripple);
  });

  return cardElement;
}
