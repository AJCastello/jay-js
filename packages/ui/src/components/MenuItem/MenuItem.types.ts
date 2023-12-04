import { IListItem } from "../ListItem/ListItem.types.js";

export interface IMenuItem extends Omit<IListItem, "focus"> {
  disabled?: boolean;
  active?: boolean;
  focus?: boolean;
}