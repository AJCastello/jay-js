import { Box, Typography } from "../../../../packages/elements/src";

export function Introduction() {
	return Box({
		children: [
			Typography({
				tag: "h1",
				className: "text-3xl font-bold max-w-xl mx-auto h-60 flex items-center text-center",
				children: "The High-Performance JavaScript Framework for Modern Web Applications",
			}),
			Typography({
				children:
					"Welcome to Jay JS, a cutting-edge JavaScript framework designed to power high-performance web applications. With a focus on freedom and flexibility, Jay JS empowers developers to build dynamic and interactive web interfaces, leveraging the power of TypeScript/JavaScript vanilla.",
			}),
		],
	});
}
