import { Button, Heading, Link, Paragraph, Section } from "@jay-js/elements";

export function Home() {
	return Section({
		tag: "section",
		className: "flex flex-col justify-center items-center gap-6 p-8",
		children: [
			Heading({
				tag: "h1",
				className: "text-4xl font-bold text-primary",
				children: "Welcome to Jay JS"
			}),
			Paragraph({
				className: "text-lg text-center max-w-2xl",
				children: "Este é um site estático gerado com Jay JS. Todo o conteúdo é pré-renderizado em HTML puro, sem JavaScript no cliente."
			}),
			Paragraph({
				className: "text-center text-gray-600",
				children: "Ideal para sites de conteúdo, blogs, documentação e landing pages que precisam de performance máxima e SEO otimizado."
			}),
			Button({
				tag: "a",
				href: "/about",
				className: "px-4 py-2 bg-emerald-400 text-zinc-800 rounded hover:bg-emerald-400 cursor-pointer",
				children: "Saiba mais"
			})
		]
	})
}
