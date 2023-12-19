import { Base } from "../Base/Base.js";
import { TBaseTagMap } from "../Base/Base.types.js";
import { TTypography } from "./Typography.types.js";

export function Typography<T extends TBaseTagMap = "p">({
  ...props
}: TTypography<T> = { tag: "p" }): HTMLElementTagNameMap[T] {
  return Base({
    ...props
  }) as HTMLElementTagNameMap[T];
}
