import { MyComponent } from "@/components/my-component";
import { Box, Button, Typography } from "@jay-js/elements";
import { AutoReactiveState } from "@jay-js/system";
import {
	DatePicker,
	DateRangePicker,
	Card,
	CardBody,
	CardTitle,
	Badge,
	Alert,
	Avatar,
	Navbar
} from "@jay-js/ui";

export function Home() {
	const testColor = AutoReactiveState("bg-red-500");
	const currentTheme = AutoReactiveState("light");

	// Função para mudar tema
	const changeTheme = (theme: string) => {
		currentTheme.set(theme);
		document.documentElement.setAttribute('data-theme', theme);
	};

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
									children: `Tema: ${currentTheme.value}`,
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
											onclick: () => changeTheme(theme)
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

			// Seção de teste dos componentes Jay-JS UI
			Card({
				className: "shadow-xl mb-8 bg-base-100",
				children: CardBody({
					children: [
						CardTitle({
							children: "🧩 Componentes Jay-JS UI + DaisyUI"
						}),

						Alert({
							severity: "alert-info",
							className: "mb-4",
							children: [
								"ℹ️ ",
								Typography({
									children: "Estes componentes vêm da pasta packages/ui e usam classes DaisyUI!"
								})
							]
						}),

						Box({
							className: "flex flex-wrap gap-2 mb-4",
							children: [
								Badge({
									color: "badge-primary",
									children: "UI Component"
								}),
								Badge({
									color: "badge-secondary",
									children: "DaisyUI Classes"
								}),
								Badge({
									color: "badge-accent",
									children: "Funcionando!"
								})
							]
						}),

						Box({
							className: "avatar mb-4",
							children: Box({
								className: "w-16 rounded-full",
								innerHTML: `<img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Avatar" />`
							})
						})
					]
				})
			}),

			// Card com componentes DaisyUI
			Box({
				className: "card bg-base-100 shadow-xl mb-8",
				children: Box({
					className: "card-body",
					children: [
						Typography({
							className: "card-title text-2xl font-bold mb-4",
							children: "🧪 Debug AutoReactiveState com DaisyUI"
						}),

						Box({
							className: "alert alert-info mb-4",
							children: [
								"ℹ️ ",
								Typography({
									children: "Teste a reatividade dos estados clicando nos botões abaixo!"
								})
							]
						}),

						Button({
							className: "btn btn-accent mb-4",
							children: [
								"Hi ",
								Typography({
									className: "badge badge-success",
									children: "DaisyUI Badge"
								}),
							],
							onclick: () => alert("Botão DaisyUI funcionando!")
						}),

						MyComponent(),

						Box({
							className: testColor.value + " text-white p-4 rounded-lg text-center mb-4 transition-all duration-300",
							children: "Este box deveria mudar de cor quando você clicar nos botões abaixo"
						}),

						// Buttons com DaisyUI
						Box({
							className: "btn-group btn-group-horizontal",
							children: [
								Button({
									className: "btn btn-success",
									children: "🟢 Verde",
									onclick: () => {
										testColor.set("bg-success");
										console.log("Mudou para verde:", testColor.get());
									}
								}),

								Button({
									className: "btn btn-info",
									children: "🔵 Azul",
									onclick: () => {
										testColor.set("bg-info");
										console.log("Mudou para azul:", testColor.get());
									}
								}),

								Button({
									className: "btn btn-error",
									children: "🔴 Vermelho",
									onclick: () => {
										testColor.set("bg-error");
										console.log("Voltou ao vermelho:", testColor.get());
									}
								})
							]
						})
					]
				})
			}),

			// Showcase de componentes DaisyUI
			Box({
				className: "card bg-base-100 shadow-xl mb-8",
				children: Box({
					className: "card-body",
					children: [
						Typography({
							className: "card-title text-2xl font-bold mb-4",
							children: "🎨 Showcase DaisyUI Components"
						}),

						// Stats
						Box({
							className: "stats shadow mb-4",
							children: [
								Box({
									className: "stat",
									children: [
										Typography({
											className: "stat-title",
											children: "Total Components"
										}),
										Typography({
											className: "stat-value text-primary",
											children: "50+"
										}),
										Typography({
											className: "stat-desc",
											children: "Available in DaisyUI"
										})
									]
								}),
								Box({
									className: "stat",
									children: [
										Typography({
											className: "stat-title",
											children: "Themes"
										}),
										Typography({
											className: "stat-value text-secondary",
											children: "30+"
										}),
										Typography({
											className: "stat-desc",
											children: "Built-in themes"
										})
									]
								})
							]
						}),

						// Loading e Skeleton
						Box({
							className: "space-y-2 mb-4",
							children: [
								Typography({
									className: "text-lg font-semibold mb-2",
									children: "Loading States:"
								}),
								Box({
									className: "loading loading-spinner loading-lg text-primary"
								}),
								Box({
									className: "loading loading-dots loading-lg text-secondary"
								}),
								Box({
									className: "loading loading-ring loading-lg text-accent"
								})
							]
						}),

						// Badges
						Box({
							className: "flex flex-wrap gap-2 mb-4",
							children: [
								Typography({
									className: "badge badge-primary",
									children: "Primary"
								}),
								Typography({
									className: "badge badge-secondary",
									children: "Secondary"
								}),
								Typography({
									className: "badge badge-accent",
									children: "Accent"
								}),
								Typography({
									className: "badge badge-success",
									children: "Success"
								}),
								Typography({
									className: "badge badge-warning",
									children: "Warning"
								}),
								Typography({
									className: "badge badge-error",
									children: "Error"
								})
							]
						})
					]
				})
			}),

			Typography({
				className: "text-3xl font-bold mt-12 mb-6 text-center",
				children: "📅 Date Picker Components"
			}),

			Typography({
				className: "text-2xl font-bold mt-8 mb-4",
				children: "1️⃣ DatePicker Individual"
			}),

			Box({
				className: "bg-white p-6 rounded-lg shadow-md mb-4",
				children: [
					Typography({
						className: "text-lg font-semibold mb-3",
						children: "Básico - Apenas Data"
					}),
					DatePicker({
						label: "Selecione uma data",
						onSelect: (date) => {
							console.log("Data selecionada:", date.toLocaleString("pt-BR"));
						}
					})
				]
			}),

			Box({
				className: "bg-white p-6 rounded-lg shadow-md mb-4",
				children: [
					Typography({
						className: "text-lg font-semibold mb-3",
						children: "Com Seleção de Horário"
					}),
					DatePicker({
						label: "Data e Hora do Evento",
						withTime: true,
						color: "btn-primary",
						size: "btn-md",
						onSelect: (date) => {
							console.log("Data e hora selecionadas:", date.toLocaleString("pt-BR"));
						}
					})
				]
			}),

			Box({
				className: "bg-white p-6 rounded-lg shadow-md mb-4",
				children: [
					Typography({
						className: "text-lg font-semibold mb-3",
						children: "Com Restrições (próximos 7 dias)"
					}),
					DatePicker({
						label: "Agendar Entrega",
						minDate: new Date(),
						maxDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
						color: "btn-success",
						onSelect: (date) => {
							console.log("Data de entrega:", date.toLocaleDateString("pt-BR"));
						}
					})
				]
			}),

			Typography({
				className: "text-2xl font-bold mt-8 mb-4",
				children: "2️⃣ DateRangePicker - Intervalo de Datas"
			}),

			Box({
				className: "bg-white p-6 rounded-lg shadow-md mb-4",
				children: [
					Typography({
						className: "text-lg font-semibold mb-3",
						children: "Horizontal - Apenas Datas"
					}),
					DateRangePicker({
						startLabel: "Check-in",
						endLabel: "Check-out",
						layout: "horizontal",
						onSelectRange: (start, end) => {
							console.log("Período de hospedagem:",
								start.toLocaleDateString("pt-BR"),
								"até",
								end.toLocaleDateString("pt-BR")
							);
						}
					})
				]
			}),

			Box({
				className: "bg-white p-6 rounded-lg shadow-md mb-4",
				children: [
					Typography({
						className: "text-lg font-semibold mb-3",
						children: "Vertical - Com Horário"
					}),
					DateRangePicker({
						startLabel: "Início do Evento",
						endLabel: "Fim do Evento",
						layout: "vertical",
						withTime: true,
						color: "btn-accent",
						gap: "gap-6",
						onSelectRange: (start, end) => {
							console.log("Período do evento:",
								start.toLocaleString("pt-BR"),
								"até",
								end.toLocaleString("pt-BR")
							);
						}
					})
				]
			}),

			Box({
				className: "bg-white p-6 rounded-lg shadow-md mb-4",
				children: [
					Typography({
						className: "text-lg font-semibold mb-3",
						children: "Com Validação de Intervalo"
					}),
					Typography({
						className: "text-sm text-gray-600 mb-3",
						children: "Tente selecionar uma data final anterior à inicial - verá uma mensagem de erro"
					}),
					DateRangePicker({
						startLabel: "Data Início",
						endLabel: "Data Fim",
						color: "btn-info",
						validateRange: true,
						onSelectRange: (start, end) => {
							console.log("Intervalo válido:",
								start.toLocaleDateString("pt-BR"),
								"até",
								end.toLocaleDateString("pt-BR")
							);
						}
					})
				]
			}),

			Box({
				className: "bg-white p-6 rounded-lg shadow-md mb-4",
				children: [
					Typography({
						className: "text-lg font-semibold mb-3",
						children: "Multi-idioma (English)"
					}),
					DateRangePicker({
						startLabel: "Start Date",
						endLabel: "End Date",
						locale: "en-US",
						color: "btn-secondary",
						onSelectRange: (start, end) => {
							console.log("Date range:",
								start.toLocaleDateString("en-US"),
								"to",
								end.toLocaleDateString("en-US")
							);
						}
					})
				]
			})
		]
	});
}