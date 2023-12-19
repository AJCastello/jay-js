import { Base } from "../Base/Base.js";
import { TForm } from "./Form.types.js";
import { TBaseTagMap } from "../Base/Base.types.js";

export function Form<T extends TBaseTagMap = "form">({
  ...props
}: TForm<T>): HTMLElementTagNameMap[T]  {
  return Base({
    ...props,
    tag: "form",
  }) as HTMLElementTagNameMap[T] ;
}