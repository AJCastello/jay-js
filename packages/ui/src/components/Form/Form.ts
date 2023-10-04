import { BaseElement, IBaseElement } from "..";

export type IForm = IBaseElement & Partial<Omit<HTMLFormElement, "style">>;

export function Form({ ...props }: IForm): HTMLFormElement {
  const form = BaseElement<IForm>({
    ...props,
    tag: "form",
  }) as HTMLFormElement;
  return form;
}