import { IBaseElement } from "../BaseElement/BaseElement.types.js";

export type TTypographyMap = {
  label: HTMLLabelElement;
  p: HTMLParagraphElement;
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  h3: HTMLHeadingElement;
  h4: HTMLHeadingElement;
  h5: HTMLHeadingElement;
  h6: HTMLHeadingElement;
  span: HTMLSpanElement;
  blockquote: HTMLQuoteElement;
  pre: HTMLPreElement;
  a: HTMLAnchorElement;
};

export type TTypographyVariants = keyof TTypographyMap;

type TTypography<T extends TTypographyVariants> = {
  variant?: T;
} & Partial<Omit<TTypographyMap[T], "children" | "style">>;

export type ITypography<T extends TTypographyVariants> =  IBaseElement & TTypography<T>;
