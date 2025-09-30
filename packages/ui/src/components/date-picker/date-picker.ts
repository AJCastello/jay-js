import { Base, Box, Button, Typography, type TBaseTagMap } from "@jay-js/elements";
import { Effect, State, render } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TDatePicker } from "./date-picker.types";

const LOCALES = {
	"pt-BR": {
		months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
		weekDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
		back: "Voltar",
		confirm: "Confirmar",
	},
	"en-US": {
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		back: "Back",
		confirm: "Confirm",
	},
	"es-ES": {
		months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		weekDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
		back: "Volver",
		confirm: "Confirmar",
	},
};

export function DatePicker<T extends TBaseTagMap = "div">(
	{
		label,
		defaultDate = new Date(),
		value,
		onSelect,
		withTime = false,
		minDate,
		maxDate,
		color = "btn-primary",
		size = "btn-sm",
		disabled = false,
		locale = "pt-BR",
		showToday = true,
		rangeStart,
		rangeEnd,
		...props
	}: TDatePicker<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const strings = LOCALES[locale];

	const currentDate = State(new Date(defaultDate));
	const selectedDate = State<Date | null>(value ? new Date(value) : null);
	const currentView = State<"calendar" | "time">("calendar");
	const selectedHour = State(value ? value.getHours() : new Date().getHours());
	const selectedMinute = State(value ? value.getMinutes() : new Date().getMinutes());

	const containerId = `picker-${Math.random().toString(36).slice(2, 11)}`;
	const monthYearId = `${containerId}-month-year`;
	const calendarDaysId = `${containerId}-calendar-days`;

	const container = Base({
		tag: "div",
		...props,
		className: cn("w-full max-w-sm", props.className),
		onunmount: () => {
			currentDate.clear();
			selectedDate.clear();
			currentView.clear();
			selectedHour.clear();
			selectedMinute.clear();
		},
	}) as HTMLDivElement;

	function previousMonth() {
		currentDate.set((current) => {
			const newDate = new Date(current);
			newDate.setMonth(newDate.getMonth() - 1);
			return newDate;
		});
	}

	function nextMonth() {
		currentDate.set((current) => {
			const newDate = new Date(current);
			newDate.setMonth(newDate.getMonth() + 1);
			return newDate;
		});
	}

	function selectDate(day: number) {
		const newDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day);

		if (minDate && newDate < minDate) return;
		if (maxDate && newDate > maxDate) return;

		selectedDate.set(newDate);

		if (withTime) {
			currentView.set("time");
		} else {
			if (onSelect) {
				onSelect(new Date(newDate));
			}
		}
	}

	function createTimeDisplay(value: number, isActive: boolean) {
		return Box({
			className: cn(
				"h-12 flex items-center justify-center transition-all duration-200",
				isActive ? "font-mono text-3xl font-bold text-primary" : "font-mono text-sm opacity-40",
			),
			style: { userSelect: "none" },
			children: String(value).padStart(2, "0"),
		});
	}

	function createTimeColumn(type: "hour" | "minute", currentValue: number) {
		const max = type === "hour" ? 24 : 60;
		const items = [];

		for (let i = -1; i <= 1; i++) {
			const value = (currentValue + i + max) % max;
			items.push(createTimeDisplay(value, i === 0));
		}

		return Box({
			className: "flex flex-col items-center w-20",
			children: [
				Button({
					type: "button",
					className: cn("btn btn-ghost btn-xs mb-1", size),
					children: "▲",
					disabled,
					onclick: () => {
						if (type === "hour") {
							selectedHour.set((h) => (h - 1 + 24) % 24);
						} else {
							selectedMinute.set((m) => (m - 1 + 60) % 60);
						}
					},
				}),
				Box({
					className: "flex flex-col",
					children: items,
				}),
				Button({
					type: "button",
					className: cn("btn btn-ghost btn-xs mt-1", size),
					children: "▼",
					disabled,
					onclick: () => {
						if (type === "hour") {
							selectedHour.set((h) => (h + 1) % 24);
						} else {
							selectedMinute.set((m) => (m + 1) % 60);
						}
					},
				}),
			],
		});
	}

	function createTimeSelector(): HTMLElement {
		const timeContainer = Box({
			className: "time-display-container flex items-center justify-center gap-1 mb-6",
		});

		Effect(() => {
			const hour = selectedHour.value;
			const minute = selectedMinute.value;

			const hourColumn = createTimeColumn("hour", hour);
			const minuteColumn = createTimeColumn("minute", minute);
			const separator = Box({
				className: "flex items-center justify-center px-2",
				children: Typography({
					tag: "span",
					children: ":",
					className: "font-mono text-2xl font-bold",
					style: { userSelect: "none" },
				}),
			});

			render(timeContainer, [hourColumn, separator, minuteColumn]);
		});

		return Box({
			className: "border border-base-300 rounded-lg bg-base-100 shadow-sm p-6",
			children: [
				timeContainer,
				Box({
					className: "flex justify-center gap-3",
					children: [
						Button({
							type: "button",
							children: strings.back,
							className: cn("btn btn-ghost", size),
							disabled,
							onclick: () => {
								currentView.set("calendar");
							},
						}),
						Button({
							type: "button",
							children: strings.confirm,
							className: cn("btn", color, size),
							disabled,
							onclick: () => {
								const selected = selectedDate.value;
								if (selected) {
									selected.setHours(selectedHour.value, selectedMinute.value, 0, 0);
									if (onSelect) {
										onSelect(new Date(selected));
									}
								}
							},
						}),
					],
				}),
			],
		});
	}

	function createCalendar(): HTMLElement {
		const monthYearElement = Typography({
			id: monthYearId,
			className: "font-semibold text-base",
		});

		const calendarDaysElement = Box({
			id: calendarDaysId,
			className: "grid grid-cols-7 p-2 gap-1",
		});

		Effect(() => {
			const current = currentDate.value;
			monthYearElement.textContent = `${strings.months[current.getMonth()]} ${current.getFullYear()}`;
		});

		Effect(() => {
			const current = currentDate.value;
			const selected = selectedDate.value;

			const firstDay = new Date(current.getFullYear(), current.getMonth(), 1);
			const lastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0);

			const days: HTMLElement[] = [];

			for (let i = 0; i < firstDay.getDay(); i++) {
				days.push(Box({ className: "p-2" }));
			}

			for (let day = 1; day <= lastDay.getDate(); day++) {
				const dayDate = new Date(current.getFullYear(), current.getMonth(), day);
				const isDisabled = (minDate && dayDate < minDate) || (maxDate && dayDate > maxDate) || disabled;
				const isSelected =
					selected &&
					selected.getDate() === day &&
					selected.getMonth() === current.getMonth() &&
					selected.getFullYear() === current.getFullYear();
				const isToday = showToday && new Date().toDateString() === dayDate.toDateString();

				const isInRange = rangeStart && rangeEnd &&
					dayDate >= rangeStart &&
					dayDate <= rangeEnd &&
					!isSelected;

				const dayElement = Button({
					type: "button",
					className: cn(
						"btn btn-square",
						size,
						isSelected ? color : isInRange ? "btn-ghost bg-primary/10" : "btn-ghost",
						isToday && !isSelected && "border border-primary",
					),
					children: String(day),
					disabled: isDisabled,
					onclick: () => selectDate(day),
				});

				days.push(dayElement);
			}

			render(calendarDaysElement, days);
		});

		return Box({
			className: "border border-base-300 rounded-lg bg-base-100 shadow-sm",
			children: [
				Box({
					className: "flex items-center justify-between p-3 border-b border-base-300",
					children: [
						Button({
							type: "button",
							className: cn("btn btn-ghost btn-square", size),
							children: "‹",
							disabled,
							onclick: previousMonth,
						}),
						monthYearElement,
						Button({
							type: "button",
							className: cn("btn btn-ghost btn-square", size),
							children: "›",
							disabled,
							onclick: nextMonth,
						}),
					],
				}),
				Box({
					className: "grid grid-cols-7 border-b border-base-300 bg-base-200",
					children: strings.weekDays.map((day) =>
						Box({
							className: "p-2 text-center text-xs font-medium",
							children: day,
						}),
					),
				}),
				calendarDaysElement,
			],
		});
	}

	const contentContainer = Box({
		className: "w-full",
	});

	Effect(() => {
		const view = currentView.value;

		if (view === "calendar") {
			render(contentContainer, createCalendar());
		} else {
			render(contentContainer, createTimeSelector());
		}
	});

	const children: HTMLElement[] = [contentContainer];

	if (label) {
		const labelElement = Typography({
			tag: "label",
			className: "label",
			children: Base({
				tag: "span",
				className: "label-text font-semibold",
				children: label,
			}),
		});
		children.unshift(labelElement);
	}

	render(container, children);

	return container as HTMLElementTagNameMap[T];
}