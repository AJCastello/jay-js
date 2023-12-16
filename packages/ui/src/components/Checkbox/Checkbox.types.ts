import { TBase, TBaseTagMap } from "../Base/Base.types.js";

export type TCheckbox<T extends TBaseTagMap> = {
  label?: string | Node | (string | Node)[];
  checked?: boolean;
  color?: "checkbox-primary" | "checkbox-secondary" | "checkbox-accent" | "checkbox-success" | "checkbox-warning" | "checkbox-info" | "checkbox-error";
  size?: "checkbox-lg" | "checkbox-md" | "checkbox-sm" | "checkbox-xs";
  position?: "checkbox-before" | "checkbox-after";
  formControl?: TBase<"div">;
} & TBase<T>;
