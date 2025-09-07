import type { TBaseTagMap, TListItem } from "@jay-js/elements";

export type TMenuItem<T extends TBaseTagMap> = {
	disabled?: boolean;
	active?: boolean;
	focus?: boolean;
} & TListItem<T>;
