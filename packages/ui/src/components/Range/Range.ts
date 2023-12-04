import { Input } from "../Input/Input.js";
import { IRange } from "./Range.types.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export function Range({
  size,
  color,
  ...props
}: IRange = {}): HTMLInputElement {
  const className = mergeClasses([
    "range",
    size,
    color,
    props.className,
  ]);

  return Input({
    type: "range",
    ...props,
    className
  });
}