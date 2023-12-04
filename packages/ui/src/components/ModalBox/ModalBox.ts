import { IModalBox } from "./ModalBox.types.js";
import { BaseElement } from "../BaseElement/BaseElement.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function ModalBox({
  ...props
}: IModalBox = {}): HTMLDivElement {
  const className = mergeClasses([
    "modal-box",
    props.className
  ]);

  return BaseElement<IModalBox>({
    ...props,
    className
  }) as HTMLDivElement;
}
