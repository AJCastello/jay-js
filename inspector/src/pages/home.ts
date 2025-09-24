import { MyComponent } from "@/components/my-component";
import { Box, Button, Typography } from "@jay-js/elements";

export function Home() {
	return Box({
		className: "p-8 font-sans mt-4 bg-gray-100 rounded-lg",
		children: [
			Button({
				className: "mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600",
				children: [
					"Hi",
					Typography({
						className: "text-lg font-medium text-green-400",
						children: "Box com Typography dentro"
					}),
				]
			}),
			MyComponent()
		]
	});
}