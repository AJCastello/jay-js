import { TBase, TBaseTagMap } from "../Base/Base.types.js";
import { TListItem } from "../ListItem/ListItem.types.js";

export type TMenuItem<T extends TBaseTagMap> = {
  disabled?: boolean;
  active?: boolean;
  focus?: boolean;
} & TListItem<T>;
