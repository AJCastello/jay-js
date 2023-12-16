import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TToast<T extends TBaseTagMap> = {
  horizontal?: "toast-start" | "toast-center" | "toast-end";
  vertical?: "toast-top" | "toast-middle" | "toast-bottom";
  duration?: number;
  asChild?: boolean;
  children?: HTMLElement;
} & TBase<T>;
