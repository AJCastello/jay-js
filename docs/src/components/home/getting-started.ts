import { Box, Link, Section, Typography } from "../../../../packages/elements/src";
import { IconArrowRightDuotone } from "../icons";

export function GettingStarted() {
	const steps = [
		{
			number: "01",
			title: "Installation",
			description: "Get started by installing the core packages using your preferred package manager.",
			code: "npm install @jay-js/system @jay-js/ui",
		},
		{
			number: "02",
			title: "Create Your First Component",
			description: "Build a simple component using JayJS's intuitive API.",
			code: `import { Box, Typography, Button } from "@jay-js/elements";

function HelloWorld() {
  return Box({
    className: "p-4 border rounded",
    children: [
      Typography({
        children: "Hello, World!"
      }),
      Button({
        className: "btn-primary mt-2",
        onclick: () => alert("Welcome to JayJS!"),
        children: "Click me"
      })
    ]
  });
}

document.body.appendChild(HelloWorld());`,
		},
		{
			number: "03",
			title: "Add State Management",
			description: "Implement reactive state with JayJS's lightweight state management system.",
			code: `import { State } from "@jay-js/system";

const appState = State({
  count: 0
});

appState.sub("counter", (state) => {
  // React to state changes
  counterElement.textContent = state.count;
});

// Update state
incrementButton.onclick = () => {
  appState.set(state => ({
    ...state,
    count: state.count + 1
  }));
};`,
		},
	];

	return Section({
		tag: "section",
		className: "container py-20 mx-auto",
		children: [
			Box({
				className: "text-center mb-16",
				children: [
					Typography({
						className: "text-sm font-bold tracking-wider text-primary uppercase",
						children: "Getting Started",
					}),
					Typography({
						tag: "h2",
						className: "mt-3 text-3xl font-bold tracking-tight lg:text-4xl",
						children: "Up and Running in Minutes",
					}),
					Typography({
						className: "max-w-2xl mx-auto mt-4 text-lg opacity-80",
						children: "Follow these simple steps to build your first JayJS application.",
					}),
				],
			}),
			Box({
				className: "grid grid-cols-1 gap-12",
				children: steps.map(({ number, title, description, code }) => {
					return Box({
						className: "flex flex-col md:flex-row gap-8 items-start",
						children: [
							Box({
								className:
									"flex-shrink-0 flex items-center justify-center bg-primary text-primary-content w-16 h-16 rounded-full font-bold text-xl",
								children: number,
							}),
							Box({
								className: "flex-grow",
								children: [
									Typography({
										tag: "h3",
										className: "text-2xl font-bold mb-2",
										children: title,
									}),
									Typography({
										className: "mb-4 opacity-80",
										children: description,
									}),
									Box({
										className: "bg-base-200 rounded-lg border border-base-300 overflow-hidden",
										children: [
											Box({
												tag: "pre",
												className: "p-4 overflow-x-auto language-typescript",
												children: Box({
													tag: "code",
													className: "language-typescript font-mono text-sm",
													children: code,
												}),
											}),
										],
									}),
								],
							}),
						],
					});
				}),
			}),
			Box({
				className: "mt-12 text-center",
				children: Link({
					href: "/docs/getting-started",
					className: "btn btn-primary btn-lg gap-2",
					children: ["Explore Full Documentation", IconArrowRightDuotone({ className: "w-5 h-5" })],
				}),
			}),
		],
	});
}
