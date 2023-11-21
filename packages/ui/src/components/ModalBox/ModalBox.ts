import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box, IBox } from "../Box/index.js";

export function ModalBox({ ...props }: IBox): HTMLDivElement {
  const className = mergeClasses(["modal-box", props.className]);
  const modalContent = Box({
    ...props,
    className
  });
  return modalContent;
}