import { Box, List, ListItem, Typography } from "../../../../packages/elements/src";

export function WhyChoose() {
	return Box({
		className: "mt-12",
		children: [
			Typography({
				children: "Why Choose Jay JS?",
				className: "font-bold italic mb-8",
			}),
			List({
				className: "pl-4 ml-4 border-l-4 border-primary space-y-4",
				children: [
					ListItem({
						children: [
							Typography({
								className: "font-bold",
								tag: "span",
								children: "Unmatched Performance:",
							}),
							" Built to optimize speed and efficiency, Jay JS allows you to work directly with the pure language, without unnecessary additional layers.",
						],
					}),
					ListItem({
						children: [
							Typography({
								className: "font-bold",
								tag: "span",
								children: "Total Flexibility:",
							}),
							" Forget about limitations. With Jay JS, you have the freedom to apply your own solutions and resources, adapting the framework to your specific needs.",
						],
					}),
					ListItem({
						children: [
							Typography({
								className: "font-bold",
								tag: "span",
								children: "Complete Ecosystem:",
							}),
							" Jay JS offers a comprehensive set of packages, from essential system tools to sophisticated UI components and a powerful CLI to accelerate your workflow.",
						],
					}),
				],
			}),
		],
	});
}
