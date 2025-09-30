import { Box, Typography } from "@jay-js/elements";
import { DatePicker, DateRangePicker } from "@jay-js/ui";

export function DemoDatePicker() {
	return Box({
		className: "p-8 font-sans mt-4 min-h-screen",
		children: [
			Typography({
				className: "text-3xl font-bold mt-12 mb-6 text-center",
				children: "📅 Date Picker Components"
			}),

			Typography({
				className: "text-2xl font-bold mt-8 mb-4",
				children: "1️⃣ DatePicker Individual"
			}),

			Box({
				className: "bg-base-300 p-6 rounded-lg shadow-md mb-4",
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
				className: "bg-base-300 p-6 rounded-lg shadow-md mb-4",
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
				className: "bg-base-300 p-6 rounded-lg shadow-md mb-4",
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
				className: "bg-base-300 p-6 rounded-lg shadow-md mb-4",
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
				className: "bg-base-300 p-6 rounded-lg shadow-md mb-4",
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
				className: "bg-base-300 p-6 rounded-lg shadow-md mb-4",
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
				className: "bg-base-300 p-6 rounded-lg shadow-md mb-4",
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