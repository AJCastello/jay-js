import { IListItem } from "../ListItem/ListItem.types.js";

export interface IStepItem extends IListItem {
  color?: "step-primary" | "step-secondary" | "step-accent" | "step-info" | "step-success" | "step-warning" | "step-error";
}
