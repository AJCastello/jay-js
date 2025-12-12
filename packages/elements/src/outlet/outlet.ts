import { Base } from "@jay-js/system";

export function Outlet(): HTMLDivElement {
	return Base({
		style: {
			display: "contents",
		},
		dataset: {
			router: "outlet",
		},
	}) as HTMLDivElement;
}
