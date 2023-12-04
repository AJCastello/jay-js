import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { IModalAction } from "./ModalAction.types.js";

export function ModalAction({
  ...props
}: IModalAction = {}): HTMLDivElement {
  const className = mergeClasses([
    "modal-action",
    props.className
  ]);

  return BaseElement<IModalAction>({
    ...props,
    className
  }) as HTMLDivElement;
}
