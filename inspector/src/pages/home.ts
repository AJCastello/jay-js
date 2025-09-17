import { Box, Typography } from "@jay-js/elements";

export function Home() {
	return Box({
		style: {
			padding: "20px",
			border: "1px solid #ccc",
			margin: "20px"
		},
		children: [
			Typography({
				tag: "h1",
				children: "Teste do Inspector"
			}),
			Typography({
				tag: "p",
				children: "Este elemento deveria ter overlay verde no hover"
			})
		]
	});
}