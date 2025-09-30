import { Box, Button, Typography } from "@jay-js/elements";
import { setTheme } from "@jay-js/system";
import { Navbar } from "@jay-js/ui";

export function Home() {
	setTheme('light'); // Tema padrão

	return Box({
		className: "p-8 font-sans mt-4 min-h-screen",
		children: [
			// Navbar usando componente da UI
			Navbar({
				className: "bg-base-100 rounded-lg shadow-lg mb-8",
				children: [
					Box({
						className: "navbar-start",
						children: Typography({
							className: "text-xl font-bold",
							children: "🎨 DaisyUI + Jay-JS UI Components"
						})
					}),
					Box({
						className: "navbar-end",
						children: Box({
							className: "dropdown dropdown-end",
							children: [
								Button({
									className: "btn btn-outline",
									children: "Tema",
									onclick: (e) => {
										const dropdown = (e.target as HTMLElement).closest('.dropdown');
										dropdown?.classList.toggle('dropdown-open');
									}
								}),
								Box({
									className: "dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow",
									children: [
										"light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
										"synthwave", "retro", "cyberpunk", "valentine", "halloween"
									].map(theme =>
										Button({
											className: "btn btn-ghost btn-sm justify-start",
											children: theme,
											onclick: () => setTheme(theme)
										})
									)
								})
							]
						})
					})
				]
			}),

			// Hero Section com DaisyUI
			Box({
				className: "hero bg-base-200 rounded-lg mb-8",
				children: Box({
					className: "hero-content text-center",
					children: Box({
						className: "max-w-md",
						children: [
							Typography({
								className: "text-5xl font-bold",
								children: "🚀 DaisyUI + Jay-JS"
							}),
							Typography({
								className: "py-6",
								children: "DaisyUI foi instalado e configurado com sucesso! Agora você pode usar todos os componentes do DaisyUI junto com Tailwind CSS."
							}),
							Button({
								className: "btn btn-primary",
								children: "Começar a usar!",
								onclick: () => alert("DaisyUI está funcionando! 🎉")
							})
						]
					})
				})
			}),
		]
	});
}