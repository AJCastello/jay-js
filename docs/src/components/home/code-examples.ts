import { Box, Section, Typography } from "@jay-js/elements";

// Simple Icon function for creating icon elements
function _Icon({ icon, className }: { icon: string; className?: string }) {
	const element = document.createElement("i");
	element.className = `${icon} ${className || ""}`.trim();
	return element;
}

export function CodeExamples() {
	const examples = [
		{
			title: "Creating UI Components",
			language: "typescript",
			code: `import { Button, Typography, Box } from "@jay-js/elements";

function Card({ title, content, onAction }) {
  return Box({
    className: "p-6 border rounded-lg shadow-md",
    children: [
      Typography({
        tag: "h3",
        className: "text-xl font-bold mb-4",
        children: title
      }),
      Typography({
        className: "mb-4",
        children: content
      }),
      Button({
        className: "btn-primary",
        onclick: onAction,
        children: "Learn More"
      })
    ]
  });
}`,
		},
		{
			title: "State Management",
			language: "typescript",
			code: `import { State } from "@jay-js/system";

// Create a state object
const counter = State({
  count: 0,
  lastUpdated: new Date()
});

// Subscribe to changes
counter.sub("display", (state) => {
  document.getElementById("count").textContent = state.count;
  document.getElementById("updated").textContent = 
    state.lastUpdated.toLocaleString();
});

// Update the state
document.getElementById("increment").addEventListener("click", () => {
  counter.set((state) => ({
    ...state,
    count: state.count + 1,
    lastUpdated: new Date()
  }));
});`,
		},
		{
			title: "JSX Syntax (Optional)",
			language: "typescript",
			code: `/** @jsx jsx */
import { jsx } from '@jay-js/jsx';

function Greeting({ name, onGreet }) {
  return (
    <div className="greeting">
      <h1>Hello, {name}!</h1>
      <p>Welcome to JayJS</p>
      <button onClick={onGreet}>
        Say Hello
      </button>
    </div>
  );
}

// Render the component
document.body.appendChild(
  <Greeting 
    name="Developer" 
    onGreet={() => alert('Hello!')} 
  />
);`,
		},
	];

	return Section({
		tag: "section",
		className: "container py-20 mx-auto bg-base-200",
		children: [
			Box({
				className: "text-center mb-16",
				children: [
					Typography({
						className: "text-sm font-bold tracking-wider text-primary uppercase",
						children: "Code Examples",
					}),
					Typography({
						tag: "h2",
						className: "mt-3 text-3xl font-bold tracking-tight lg:text-4xl",
						children: "Simple, Expressive, Powerful",
					}),
					Typography({
						className: "max-w-2xl mx-auto mt-4 text-lg opacity-80",
						children: "JayJS makes it easy to write clean, maintainable code with a straightforward API.",
					}),
				],
			}),
			Box({
				className: "grid grid-cols-1 gap-10",
				children: examples.map(({ title, language, code }) => {
					return Box({
						className: "flex flex-col rounded-lg overflow-hidden border border-base-300 shadow-md",
						children: [
							Box({
								className: "bg-base-100 p-4 border-b border-base-300 flex items-center justify-between",
								children: [
									Typography({
										tag: "h3",
										className: "font-mono text-lg font-semibold",
										children: title,
									}),
									Box({
										className: "badge badge-primary font-mono",
										children: language,
									}),
								],
							}),
							Box({
								tag: "pre",
								className: `p-4 bg-base-300/50 overflow-x-auto language-${language}`,
								children: Box({
									tag: "code",
									className: `language-${language} font-mono text-sm`,
									children: code,
								}),
							}),
						],
					});
				}),
			}),
		],
	});
}
