import { Form } from "../Form/Form.js";
import { Base } from "../Base/Base.js";
import { TForm } from "../Form/Form.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function ModalBackdrop<T extends TBaseTagMap = "form">({
  ...props
}: TForm<T> = { tag: "form" }): HTMLFormElement {
  const className = mergeClasses([
    "modal-backdrop",
    props.className
  ]);

  return Form({
    className,
    children: Base({
      tag: "button",
      children: "close"
    })
  }) as HTMLFormElement;
}
