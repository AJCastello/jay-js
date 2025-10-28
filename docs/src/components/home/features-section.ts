import { Box, Section, Typography } from "@jay-js/elements";
import {
	IconBracketsCurlyDuotone,
	IconCodeDuotone,
	IconFeatherDuotone,
	IconGitBranchDuotone,
	IconLayoutDuotone,
	IconMapDuotone,
} from "../icons";

export function FeaturesSection() {
	const featuresList = [
		{
			title: "Lightweight",
			description: "Minimal footprint with no heavy dependencies, ensuring fast load times",
			icon: IconFeatherDuotone,
		},
		{
			title: "Flexible UI",
			description: "Build interfaces your way with or without Tailwind CSS",
			icon: IconLayoutDuotone,
		},
		{
			title: "Smart State Management",
			description: "Simple yet powerful state management without the complexity",
			icon: IconGitBranchDuotone,
		},
		{
			title: "Modern Routing",
			description: "Client-side routing that's easy to configure and highly adaptable",
			icon: IconMapDuotone,
		},
		{
			title: "JSX Support",
			description: "Optional JSX runtime for a familiar development experience",
			icon: IconBracketsCurlyDuotone,
		},
		{
			title: "Intuitive API",
			description: "Clean and consistent API design that feels natural to use",
			icon: IconCodeDuotone,
		},
	];

	return Section({
		tag: "section",
		className: "container py-20 mx-auto bg-base-100",
		children: [
			Box({
				className: "text-center mb-16",
				children: [
					Typography({
						className: "text-sm font-bold tracking-wider text-primary uppercase",
						children: "Features",
					}),
					Typography({
						tag: "h2",
						className: "mt-3 text-3xl font-bold tracking-tight lg:text-4xl",
						children: "Everything You Need, Nothing You Don't",
					}),
					Typography({
						className: "max-w-2xl mx-auto mt-4 text-lg opacity-80",
						children:
							"JayJS provides a complete toolkit for modern web development without unnecessary complexity or bloat.",
					}),
				],
			}),
			Box({
				className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
				children: featuresList.map(({ title, description, icon }) => {
					return Box({
						className:
							"p-6 border border-base-300 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/50",
						children: [
							Box({
								className: "flex items-center mb-4",
								children: [
									Box({
										className: "flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary",
										children: icon({ className: "text-2xl" }),
									}),
									Typography({
										tag: "h3",
										className: "ml-4 text-xl font-semibold",
										children: title,
									}),
								],
							}),
							Typography({
								className: "pl-16 opacity-80",
								children: description,
							}),
						],
					});
				}),
			}),
		],
	});
}
