import { BaseElement, IBaseElement } from "../BaseElement/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export type ILink = IBaseElement & Partial<Omit<HTMLAnchorElement, "style" | "children">>;

export function Link({ ...props }: ILink = {}): HTMLAnchorElement {
  const className = mergeClasses([
    "link",
    props.className,
  ]);

  const link = BaseElement<ILink>({
    ...props,
    tag: "a",
    className 
  }) as HTMLAnchorElement;
    
  return link;
}
