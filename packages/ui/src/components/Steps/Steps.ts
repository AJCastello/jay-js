import { List } from "../List/List.js";
import { mergeClasses } from "../../utils/mergeClasses.js";
import { ISteps } from "./Steps.types.js";

export function Steps({
  orientation = "steps-horizontal",
  ...props
}: ISteps = {}): HTMLUListElement {
  const className = mergeClasses([
    "steps",
    orientation,
    props.className,
  ]);

  return List({
    ...props,
    className,
  });
}
