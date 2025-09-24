import { Box, Typography } from "@jay-js/elements";
import { Extra } from "./extra";

export function MyComponent() {
	return Box({
		className: "p-4 bg-white border rounded shadow",
		children: [
			"Componente de Teste",
			Extra(),
			Typography({
				className: "text-sm text-gray-500",
				children: "Um componente tipográfico dentro do MyComponent"
			}),
		],
	})
}