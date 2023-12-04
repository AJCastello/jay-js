import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { ILink } from "./Link.types.js";

export function Link({ ...props }: ILink = {}): HTMLAnchorElement {
  const className = mergeClasses([
    "link",
    props.className,
  ]);

  return BaseElement<ILink>({
    ...props,
    tag: "a",
    className
  }) as HTMLAnchorElement;
}
