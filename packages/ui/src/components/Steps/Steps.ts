import { List, IList } from "../List/List.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

interface ISteps extends IList {
  orientation?: "steps-vertical" | "steps-horizontal";
}

export function Steps({
  orientation = "steps-horizontal",
  ...props
}: ISteps): HTMLUListElement {
  const className = mergeClasses([
    "steps",
    orientation,
    props.className,
  ]);

  const stepList = List({
    ...props,
    className,
  });

  return stepList;
}
