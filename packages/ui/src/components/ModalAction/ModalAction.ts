import { mergeClasses } from "../../utils";
import { Box, IBox } from "../Box";

export function ModalAction({ ...props }: IBox): HTMLDivElement {
  const className = mergeClasses(["modal-action", props.className]);
  const modalContent = Box({
    ...props,
    className
  });
  return modalContent;
}
