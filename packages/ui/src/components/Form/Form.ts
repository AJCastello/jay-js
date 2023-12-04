import { BaseElement } from "../BaseElement/BaseElement.js";
import { IForm } from "./Form.types.js";

export function Form({ ...props }: IForm): HTMLFormElement {
  return BaseElement<IForm>({
    ...props,
    tag: "form",
  }) as HTMLFormElement;
}
