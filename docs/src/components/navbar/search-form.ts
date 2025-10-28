import { Box, Input } from "@jay-js/elements";

export function SearchForm() {
	return Box({
		children: Input({
			type: "search",
			placeholder: "Search",
			className: "w-64 pr-24",
		}),
	});
}
