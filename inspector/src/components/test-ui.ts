import { Badge, Card, CardBody, Alert } from "@jay-js/ui";
import { Box, Typography } from "@jay-js/elements";

export function TestUIComponents() {
	return Box({
		className: "p-4",
		children: [
			Typography({
				className: "text-2xl font-bold mb-4",
				children: "🧪 Teste de Componentes UI"
			}),

			Card({
				className: "shadow-lg mb-4",
				children: CardBody({
					children: [
						Typography({
							className: "card-title",
							children: "Componente Card da UI"
						}),
						Typography({
							children: "Este card usa o componente da pasta packages/ui"
						})
					]
				})
			}),

			Alert({
				severity: "alert-success",
				className: "mb-4",
				children: "Alert funcionando com classes DaisyUI!"
			}),

			Box({
				className: "flex gap-2",
				children: [
					Badge({
						color: "badge-primary",
						children: "Primário"
					}),
					Badge({
						color: "badge-secondary",
						children: "Secundário"
					}),
					Badge({
						color: "badge-accent",
						children: "Accent"
					})
				]
			})
		]
	});
}