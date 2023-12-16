import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TNavbarComponent<T extends TBaseTagMap> = {
  component?: "navbar-start" | "navbar-center" | "navbar-end";
} & TBase<T>;
