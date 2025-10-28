import { Box, Link, Section, Typography } from "@jay-js/elements";

export function Hero() {
	return Section({
		tag: "section",
		className: "container mx-auto py-24 flex flex-wrap items-center",
		children: [
			Box({
				className: "flex items-center w-full lg:w-1/2",
				children: [
					Box({
						className: "max-w-2xl",
						children: [
							Typography({
								className: "text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent",
								children: "JayJS",
							}),
							Typography({
								tag: "h2",
								className: "text-3xl font-bold mt-2",
								children: "Lightweight & Intuitive JavaScript Framework",
							}),
							Typography({
								className: "py-5 text-lg opacity-80",
								children:
									"Build modern web applications with a framework that prioritizes simplicity and performance. JayJS combines the best of both worlds: intuitive APIs with minimal overhead.",
							}),
							Box({
								className: "flex flex-wrap gap-4 mt-4",
								children: [
									Link({
										href: "/docs",
										className: "btn btn-primary no-underline",
										children: "Get Started",
									}),
									Link({
										href: "https://github.com/jay-js/jay-js",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "btn btn-outline no-underline",
										children: "GitHub",
									}),
								],
							}),
						],
					}),
				],
			}),
			Box({
				className: "flex items-center justify-center w-full lg:w-1/2 mt-10 lg:mt-0",
				children: [
					Box({
						className: "rounded-lg bg-base-200 shadow-xl p-6 w-full max-w-lg",
						children: [
							Box({
								tag: "pre",
								className: "language-bash",
								children: [
									Typography({
										tag: "code",
										className: "language-bash font-mono text-sm",
										children:
											"# Install using your favorite package manager\nnpm install @jay-js/system @jay-js/ui\n\n# or with JSX support\nnpm install @jay-js/system @jay-js/ui @jay-js/jsx",
									}),
								],
							}),
						],
					}),
				],
			}),
		],
	});
}
