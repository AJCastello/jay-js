
import { BaseElement, IBaseElement, Img, RippleEffect, Section, ISection, Typography, ITypography, IImg, useListener } from "..";

export interface ICard extends IBaseElement {
  className?: string;
  
  image?: IImg;
  imagePosition?: "left" | "right" | "top" | "bottom";
  imageFull?: boolean;
  
  cardTitle?: ITypography;
  cardDescription?: ITypography;
  cardActions?: ISection;
  //content?: HTMLElement[];

  variant?: boolean;
  compact?: boolean;
}

export function Card({
  className,
  
  image,
  imagePosition,
  imageFull,
  
  cardTitle,
  cardDescription,
  cardActions,

  variant,
  compact,
  ...props
}: ICard): HTMLDivElement {
  
  const classNameData = [
    "card shadow-md hover:shadow-xl transition-all duration-500 ease-in-out relative overflow-hidden",
    variant ? "card-bordered" : "",
    compact ? "card-compact" : "card-normal",
    imagePosition == "left" || imagePosition == "right" ? "card-side" : "",
    imageFull ? "image-full" : "",
    className || ""
  ].filter(Boolean).join(" ").trim();
  
  // Create the card element
  const cardElement = Section({
    className: classNameData,
    ...props,
  });

  if (props.content) {
    cardElement.content = props.content;
  } else {

    // Create the card body
    const cardBody = Section({
      className: "card-body",
    });

    // Create and append the title if provided
    if (cardTitle) {
      const titleElement = Typography({
        ...cardTitle,
        variant: "h2",
        className: `card-title ${cardTitle.className || ""}`,
      });
      cardBody.append(titleElement);
    }

    // Create and append the content if provided
    if (cardDescription) {
      const descriptionElement = Typography({
        variant: "p",
        ...cardDescription,
        className: `card-description ${cardDescription.className || ""}`,
      });
      cardBody.append(descriptionElement);
    }

    // Create and append the card actions if provided
    if (cardActions) {
      const actionsElement = Section({
        ...cardActions,
        className: `card-actions ${cardActions.className || ""}`,
      });
      cardBody.append(actionsElement);
    }

    cardElement.append(cardBody);

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

  cardElement.addEventListener("click", event => {
    const ripple = RippleEffect(event);
    cardElement.append(ripple);
    props.listeners && useListener("click", props.listeners);
    props.onclick?.bind(cardElement)(event);
  });

  return cardElement;
}

