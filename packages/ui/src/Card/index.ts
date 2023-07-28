
import { BaseElement, IBaseElement, Img, RippleEffect, Box, IBox, Typography, ITypography, IImg } from "..";

export interface ICard extends IBaseElement {
  className?: string;
  
  image?: IImg;
  imagePosition?: "left" | "right" | "top" | "bottom";
  imageFull?: boolean;
  
  cardTitle?: ITypography;
  cardDescription?: ITypography;
  cardActions?: IBox;
  cardBody?: IBox;

  bordered?: boolean;
  compact?: boolean;
  ripple?: boolean;
}

export function Card({
  className,
  
  image,
  imagePosition,
  imageFull,
  
  cardTitle,
  cardDescription,
  cardActions,
  cardBody,

  bordered,
  compact,
  ripple = true,
  ...props
}: ICard): HTMLDivElement {

  const classNameData = [
    "card shadow-md hover:shadow-xl transition-all duration-500 ease-in-out",
    ripple ? "relative overflow-hidden" : "",
    bordered ? "card-bordered" : "",
    compact ? "card-compact" : "card-normal",
    imagePosition == "left" || imagePosition == "right" ? "card-side" : "",
    imageFull ? "image-full" : "",
    className || ""
  ].filter(Boolean).join(" ").trim();
  
  // Create the card element
  const cardElement = Box({
    className: classNameData,
    ...props,
  });

  if (props.content) {
    cardElement.content = props.content;
  } else {

    // Create the card body
    const cardBodyBox = Box({
      ...cardBody,
      className: `card-body ${cardBody?.className || ""}`,
    });

    // Create and append the title if provided
    if (cardTitle) {
      const titleElement = Typography({
        ...cardTitle,
        variant: "h2",
        className: `card-title ${cardTitle.className || ""}`,
      });
      cardBodyBox.append(titleElement);
    }

    // Create and append the content if provided
    if (cardDescription) {
      const descriptionElement = Typography({
        variant: "p",
        ...cardDescription,
        className: `card-description ${cardDescription.className || ""}`,
      });
      cardBodyBox.append(descriptionElement);
    }

    // Create and append the card actions if provided
    if (cardActions) {
      const actionsElement = Box({
        ...cardActions,
        className: `card-actions ${cardActions.className || ""}`,
      });
      cardBodyBox.append(actionsElement);
    }

    cardElement.append(cardBodyBox);

    // Create the figure if image is provided
    if (image) {
      const figureElement = BaseElement({
        tag: "figure"
      });

      const imgElement = Img(image);
      figureElement.append(imgElement);

      if (imagePosition == "left" || imagePosition == "top" || !imagePosition) {
        cardElement.prepend(figureElement);
      } else {
        cardElement.append(figureElement);
      }
    }
  }

  ripple && cardElement.addEventListener("click", event => {
    const ripple = RippleEffect(event);
    cardElement.append(ripple);
  });

  return cardElement;
}

