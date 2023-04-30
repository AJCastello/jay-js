import { BaseElement, IBaseElement } from "..";

export interface ILink extends IBaseElement {
  id?: string;
  href?: string;
  content: string;
  className?: string;
}

export function Link({ id, href, content, ...props }: ILink): HTMLAnchorElement {
  const link = BaseElement({
    tag: "a",
    ...props,
    className: `link ${props.className ? props.className : ""}`,
  }) as HTMLAnchorElement;

  link.innerText = content;
  href && (link.href = href);

  return link;
}
