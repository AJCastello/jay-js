import { BaseElement, IBaseElement } from "..";
import { mergeClasses } from "../../";

export type ILink = IBaseElement & Partial<Omit<HTMLAnchorElement, "style">>;

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
