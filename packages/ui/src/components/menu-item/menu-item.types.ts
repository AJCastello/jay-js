import type { TListItem } from "@jay-js/elements";
import type { TBaseTagMap } from "@jay-js/system";

export type TMenuItem<T extends TBaseTagMap> = {
	disabled?: boolean;
	active?: boolean;
	focus?: boolean;
} & TListItem<T>;
