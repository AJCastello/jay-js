import { ICard } from "./Card.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { RippleEffect } from "../RippleEffect/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

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

  const cardElement = BaseElement<ICard>({ ...props, className }) as HTMLDivElement;

  ripple && cardElement.addEventListener("click", event => {
    const ripple = RippleEffect(event);
    cardElement.append(ripple);
  });

  return cardElement;
}
