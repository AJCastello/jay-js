import { Box, TextInput } from "../../../../packages/elements/src";
// import { Kbd } from "../ui";

export function SearchForm() {
	return Box({
		children: TextInput({
			//bordered: true,
			placeholder: "Search",
			className: "w-64 pr-24",
			// endAdornment: Box({
			// 	children: [
			// 		Kbd({
			// 			size: "kbd-sm",
			// 			children: "Ctrl",
			// 		}),
			// 		"+",
			// 		Kbd({
			// 			size: "kbd-sm",
			// 			children: "K",
			// 		}),
			// 	],
			// }),
		}),
	});
}
