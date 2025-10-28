import { Box, Section, Typography } from "@jay-js/elements";
import { IconCheckCircleDuotone } from "../icons";

export function WhyJayJS() {
	const reasonsList = [
		{
			title: "Performance Focused",
			description: "Built with performance in mind, JayJS avoids unnecessary abstractions and optimizes for speed.",
		},
		{
			title: "Developer-Friendly",
			description: "Designed to be intuitive for JavaScript developers with a gentle learning curve.",
		},
		{
			title: "Production Ready",
			description: "Stable API and thoroughly tested components ready for your production applications.",
		},
		{
			title: "Vanilla First",
			description: "Leverage your existing JavaScript knowledge without learning a completely new paradigm.",
		},
	];

	return Section({
		tag: "section",
		className: "container py-20 mx-auto bg-base-200",
		children: [
			Box({
				className: "flex flex-wrap items-center",
				children: [
					Box({
						className: "w-full lg:w-1/2 p-6",
						children: [
							Typography({
								className: "text-sm font-bold tracking-wider text-primary uppercase",
								children: "Why Choose JayJS",
							}),
							Typography({
								tag: "h2",
								className: "mt-3 text-3xl font-bold tracking-tight lg:text-4xl",
								children: "Modern Web Development, Simplified",
							}),
							Typography({
								className: "mt-4 text-lg opacity-80",
								children:
									"JayJS strikes the perfect balance between simplicity and capability, letting you build complex applications without complex tooling.",
							}),
							Box({
								className: "mt-8 space-y-4",
								children: reasonsList.map(({ title, description }) => {
									return Box({
										className: "flex",
										children: [
											Box({
												className: "flex-shrink-0 mt-1",
												children: IconCheckCircleDuotone({ className: "w-5 h-5 text-primary" }),
											}),
											Box({
												className: "ml-4",
												children: [
													Typography({
														tag: "h3",
														className: "text-lg font-medium",
														children: title,
													}),
													Typography({
														className: "mt-1 opacity-80",
														children: description,
													}),
												],
											}),
										],
									});
								}),
							}),
						],
					}),
					Box({
						className: "w-full lg:w-1/2 p-6",
						children: Box({
							className: "p-6 bg-base-100 rounded-lg shadow-lg border border-base-300",
							children: [
								Typography({
									tag: "h3",
									className: "text-xl font-bold mb-4",
									children: "Compared to Other Frameworks",
								}),
								Box({
									tag: "table",
									className: "w-full",
									children: [
										Box({
											tag: "thead",
											children: Box({
												tag: "tr",
												className: "border-b border-base-300",
												children: [
													Typography({
														tag: "th",
														className: "py-2 text-left",
														children: "Feature",
													}),
													Typography({
														tag: "th",
														className: "py-2 text-center",
														children: "JayJS",
													}),
													Typography({
														tag: "th",
														className: "py-2 text-center",
														children: "Others",
													}),
												],
											}),
										}),
										Box({
											tag: "tbody",
											children: [
												Box({
													tag: "tr",
													className: "border-b border-base-300",
													children: [
														Typography({
															tag: "td",
															className: "py-2",
															children: "Bundle Size",
														}),
														Typography({
															tag: "td",
															className: "py-2 text-center text-success",
															children: "Small",
														}),
														Typography({
															tag: "td",
															className: "py-2 text-center",
															children: "Larger",
														}),
													],
												}),
												Box({
													tag: "tr",
													className: "border-b border-base-300",
													children: [
														Typography({
															tag: "td",
															className: "py-2",
															children: "Learning Curve",
														}),
														Typography({
															tag: "td",
															className: "py-2 text-center text-success",
															children: "Gentle",
														}),
														Typography({
															tag: "td",
															className: "py-2 text-center",
															children: "Steep",
														}),
													],
												}),
												Box({
													tag: "tr",
													className: "border-b border-base-300",
													children: [
														Typography({
															tag: "td",
															className: "py-2",
															children: "Boilerplate",
														}),
														Typography({
															tag: "td",
															className: "py-2 text-center text-success",
															children: "Minimal",
														}),
														Typography({
															tag: "td",
															className: "py-2 text-center",
															children: "Extensive",
														}),
													],
												}),
												Box({
													tag: "tr",
													className: "border-b border-base-300",
													children: [
														Typography({
															tag: "td",
															className: "py-2",
															children: "Setup Time",
														}),
														Typography({
															tag: "td",
															className: "py-2 text-center text-success",
															children: "Minutes",
														}),
														Typography({
															tag: "td",
															className: "py-2 text-center",
															children: "Hours",
														}),
													],
												}),
											],
										}),
									],
								}),
							],
						}),
					}),
				],
			}),
		],
	});
}
