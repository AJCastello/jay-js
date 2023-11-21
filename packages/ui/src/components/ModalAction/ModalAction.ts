import { mergeClasses } from "../../utils/mergeClasses.js";
import { Box, IBox } from "../Box/index.js";

export function ModalAction({ ...props }: IBox): HTMLDivElement {
  const className = mergeClasses(["modal-action", props.className]);
  const modalContent = Box({
    ...props,
    className
  });
  return modalContent;
}
