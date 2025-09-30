import { Badge, Card, CardBody, Alert } from "@jay-js/ui";
import { Box, Typography, Button } from "@jay-js/elements";

export function DemoUI() {
	return Box({
		className: "p-8 min-h-screen bg-base-200",
		children: [
			Typography({
				className: "text-4xl font-bold text-center mb-8",
				children: "🧪 Demo: UI Components + DaisyUI"
			}),

			// Card usando componente da UI
			Card({
				className: "shadow-xl mb-6 bg-base-100",
				children: CardBody({
					children: [
						Typography({
							className: "card-title text-2xl mb-4",
							children: "✅ Configuração Funcionando!"
						}),

						Typography({
							className: "mb-4",
							children: "Os componentes da pasta packages/ui estão sendo processados pelo Tailwind CSS e as classes DaisyUI estão funcionando corretamente."
						}),

						Alert({
							severity: "alert-success",
							className: "mb-4",
							children: "🎉 Sucesso! Tailwind está lendo os arquivos da pasta ../packages/ui/src/"
						}),

						Box({
							className: "flex flex-wrap gap-3 mb-4",
							children: [
								Badge({
									color: "badge-primary",
									children: "packages/ui"
								}),
								Badge({
									color: "badge-secondary",
									children: "DaisyUI"
								}),
								Badge({
									color: "badge-accent",
									children: "Tailwind CSS"
								}),
								Badge({
									color: "badge-success",
									children: "Funcionando!"
								})
							]
						}),

						Button({
							className: "btn btn-primary",
							children: "Teste de Botão",
							onclick: () => alert("Componentes funcionando perfeitamente! 🎉")
						})
					]
				})
			}),

			// Informações técnicas
			Card({
				className: "shadow-lg bg-base-100",
				children: CardBody({
					children: [
						Typography({
							className: "card-title text-xl mb-3",
							children: "📋 Informações Técnicas"
						}),

						Box({
							className: "space-y-2",
							children: [
								Typography({
									children: "• Tailwind CSS configurado para ler: ../packages/ui/src/**/*.{js,ts,jsx,tsx}"
								}),
								Typography({
									children: "• DaisyUI versão 5.1.25 instalada e funcionando"
								}),
								Typography({
									children: "• Componentes Jay-JS UI usando classes DaisyUI"
								}),
								Typography({
									children: "• Hot reload funcionando em todas as pastas"
								})
							]
						})
					]
				})
			})
		]
	});
}