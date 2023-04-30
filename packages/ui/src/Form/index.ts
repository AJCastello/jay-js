import { BaseElement, IBaseElement } from "..";

export type IForm = IBaseElement

export function Form({ content, ...props }: IForm): HTMLFormElement {
  const form = BaseElement({
    tag: "form",
    ...props,
  }) as HTMLFormElement;

  content && (form.content = content);
  return form;
}
