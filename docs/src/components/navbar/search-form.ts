import { Box, Input } from "../../../../packages/elements/src";

export function SearchForm() {
	return Box({
		children: Input({
			type: "search",
			placeholder: "Search",
			className: "w-64 pr-24",
		}),
	});
}
