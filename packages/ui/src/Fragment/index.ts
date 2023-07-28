interface IFragment extends Partial<DocumentFragment> {
  content: string | HTMLElement | Node | (string | HTMLElement | Node)[];
}

export function Fragment({ content, ...props }: IFragment) {
  const fragment = document.createDocumentFragment();

  props && Object.entries(props).forEach(([key, value]) => {
    try {
      (fragment as any)[key] = value;
    } catch (error) {
      if (error instanceof TypeError) {
        console.warn(`JayJS: Cannot set property '${key}' of type '${typeof value}' to '${value}'.`);
        throw error;
      }
    }
  });

  if (Array.isArray(content)) {
    content.forEach((item) => {
      fragment.append(item);
    });
  } else {
    content && fragment.append(content);
  }

  return fragment;
}