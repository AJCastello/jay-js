import { Base } from "../Base/Base.js";
import { TInput } from "./Input.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Input<T extends TBaseTagMap = "input">({
  ...props
}: TInput<T> = { tag: "input"}): HTMLElementTagNameMap[T] {
  return Base({
    ...props,
    tag: "input",
  }) as HTMLElementTagNameMap[T];
}
