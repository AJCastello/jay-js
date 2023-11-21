import { mergeClasses } from "../../utils";
import { Box, IBox } from "../Box";

export function ModalBox({ ...props }: IBox): HTMLDivElement {
  const className = mergeClasses(["modal-box", props.className]);
  const modalContent = Box({
    ...props,
    className
  });
  return modalContent;
}