import { Base } from "../base/base.js";

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
