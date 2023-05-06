interface IFragment {
  content: string | HTMLElement | Node | (string | HTMLElement | Node)[];
}

export function Fragment({ content }: IFragment) {
  const fragment = document.createDocumentFragment();

  if (Array.isArray(content)) {
    content.forEach((item) => {
      fragment.append(item);
    });
  } else {
    content && fragment.append(content);
  }

  return fragment;
}