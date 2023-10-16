interface ISetChildrenOptions {
  clean?: boolean;
  deepClean?: boolean;
}

type TChildren = (string | Node) | (string | Node)[];

export function setChildren(element: HTMLElement, children: TChildren, options: ISetChildrenOptions = { clean: true }) {
  if (options?.deepClean) {
    element.childNodes.forEach((child) => {
      element.removeChild(child);
    });
  }

  if (options?.clean) {
    element.innerHTML = "";
  }

  if (Array.isArray(children)) {
    element.append(...children);
  } else {
    element.append(children);
  }
}