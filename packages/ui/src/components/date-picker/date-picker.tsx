import { Base, render } from "@jay-js/system";
import { cn } from "../../utils";
import type { TDatePicker } from "./date-picker.types";

type AnyProps = Record<string, unknown>;

function Box(props: AnyProps): HTMLDivElement {
	return Base({
		tag: "div",
		...props,
	});
}

function Button(props: AnyProps): HTMLButtonElement {
	return Base({
		tag: "button",
		...props,
	});
}

function Typography(
	props: AnyProps & {
		tag?: "span" | "label";
	},
): HTMLSpanElement | HTMLLabelElement {
	const { tag, ...rest } = props;
	return Base({
		tag: tag ?? "span",
		...rest,
	});
}

const LOCALES = {
	"pt-BR": {
		months: [
			"Janeiro",
			"Fevereiro",
			"Março",
			"Abril",
			"Maio",
			"Junho",
			"Julho",
			"Agosto",
			"Setembro",
			"Outubro",
			"Novembro",
			"Dezembro",
		],
		weekDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
		back: "Voltar",
		confirm: "Confirmar",
	},
	"en-US": {
		months: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
		weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		back: "Back",
		confirm: "Confirm",
	},
	"es-ES": {
		months: [
			"Enero",
			"Febrero",
			"Marzo",
			"Abril",
			"Mayo",
			"Junio",
			"Julio",
			"Agosto",
			"Septiembre",
			"Octubre",
			"Noviembre",
			"Diciembre",
		],
		weekDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
		back: "Volver",
		confirm: "Confirmar",
	},
};

export function DatePicker({
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
	className,
	onmount,
	...props
}: TDatePicker = {}) {
	const mergedClassName = cn("w-full max-w-sm", className);
	const strings = LOCALES[locale] || LOCALES["pt-BR"];

	let currentDate = new Date(defaultDate);
	let selectedDate: Date | null = value ? new Date(value) : null;
	let currentView: "calendar" | "time" = "calendar";
	let selectedHour = value ? value.getHours() : new Date().getHours();
	let selectedMinute = value ? value.getMinutes() : new Date().getMinutes();

	const monthYearId = `month-year-${Math.random().toString(36).slice(2, 11)}`;
	const calendarDaysId = `calendar-days-${Math.random().toString(36).slice(2, 11)}`;
	let mountedContainer: HTMLDivElement | null = null;
	let contentContainer: HTMLDivElement | null = null;

	function showCalendar() {
		if (!mountedContainer || !contentContainer) return;
		render(contentContainer, createCalendar(mountedContainer));
		renderCalendarDays(mountedContainer);
	}

	function showTimeSelector() {
		if (!contentContainer) return;
		render(contentContainer, createTimeSelector());
	}

	function updateMonthYear(element: HTMLElement) {
		element.textContent = `${strings.months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
	}

	function previousMonth(container: HTMLDivElement) {
		const newDate = new Date(currentDate);
		newDate.setMonth(newDate.getMonth() - 1);
		currentDate = newDate;

		const monthYearElement = container.querySelector(`#${monthYearId}`);
		if (monthYearElement instanceof HTMLElement) {
			updateMonthYear(monthYearElement);
		}
		renderCalendarDays(container);
	}

	function nextMonth(container: HTMLDivElement) {
		const newDate = new Date(currentDate);
		newDate.setMonth(newDate.getMonth() + 1);
		currentDate = newDate;

		const monthYearElement = container.querySelector(`#${monthYearId}`);
		if (monthYearElement instanceof HTMLElement) {
			updateMonthYear(monthYearElement);
		}
		renderCalendarDays(container);
	}

	function selectDate(day: number) {
		const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

		if (minDate && newDate < minDate) return;
		if (maxDate && newDate > maxDate) return;

		selectedDate = newDate;

		if (withTime) {
			currentView = "time";
			showTimeSelector();
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
							selectedHour = (selectedHour - 1 + 24) % 24;
						} else {
							selectedMinute = (selectedMinute - 1 + 60) % 60;
						}
						renderTimeDisplay();
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
							selectedHour = (selectedHour + 1) % 24;
						} else {
							selectedMinute = (selectedMinute + 1) % 60;
						}
						renderTimeDisplay();
					},
				}),
			],
		});
	}

	function renderTimeDisplay() {
		if (!contentContainer) return;
		const timeContainer = contentContainer.querySelector(".time-display-container");
		if (!(timeContainer instanceof HTMLElement)) return;

		const hourColumn = createTimeColumn("hour", selectedHour);
		const minuteColumn = createTimeColumn("minute", selectedMinute);
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
	}

	function createTimeSelector(): HTMLElement {
		const timeContainer = Box({
			className: "time-display-container flex items-center justify-center gap-1 mb-6",
		});

		const hourColumn = createTimeColumn("hour", selectedHour);
		const minuteColumn = createTimeColumn("minute", selectedMinute);
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
								currentView = "calendar";
								showCalendar();
							},
						}),
						Button({
							type: "button",
							children: strings.confirm,
							className: cn("btn", color, size),
							disabled,
							onclick: () => {
								if (selectedDate) {
									selectedDate.setHours(selectedHour, selectedMinute, 0, 0);
									if (onSelect) {
										onSelect(new Date(selectedDate));
									}
								}
							},
						}),
					],
				}),
			],
		});
	}

	function renderCalendarDays(container: HTMLDivElement) {
		const calendarDaysElement = container.querySelector(`#${calendarDaysId}`);
		if (!(calendarDaysElement instanceof HTMLElement)) return;

		const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
		const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

		const days: HTMLElement[] = [];

		for (let i = 0; i < firstDay.getDay(); i++) {
			days.push(Box({ className: "p-2" }));
		}

		for (let day = 1; day <= lastDay.getDate(); day++) {
			const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
			const isDisabled = (minDate && dayDate < minDate) || (maxDate && dayDate > maxDate) || disabled;
			const isSelected =
				selectedDate &&
				selectedDate.getDate() === day &&
				selectedDate.getMonth() === currentDate.getMonth() &&
				selectedDate.getFullYear() === currentDate.getFullYear();
			const isToday = showToday && new Date().toDateString() === dayDate.toDateString();

			const isRangeEdge =
				(rangeStart && dayDate.toDateString() === rangeStart.toDateString()) ||
				(rangeEnd && dayDate.toDateString() === rangeEnd.toDateString());

			const isInRange = rangeStart && rangeEnd && dayDate > rangeStart && dayDate < rangeEnd && !isSelected;

			const dayElement = Button({
				type: "button",
				className: cn(
					"btn btn-square",
					size,
					isSelected || isRangeEdge ? color : isInRange ? "btn-ghost bg-primary/10" : "btn-ghost",
					isToday && !isSelected && !isRangeEdge && "border border-primary",
				),
				children: String(day),
				disabled: isDisabled,
				onclick: () => selectDate(day),
			});

			days.push(dayElement);
		}

		render(calendarDaysElement, days);
	}

	function createCalendar(container: HTMLDivElement): HTMLElement {
		const monthYearElement = Typography({
			id: monthYearId,
			className: "font-semibold text-base",
		});

		updateMonthYear(monthYearElement);

		const calendarDaysElement = Box({
			id: calendarDaysId,
			className: "grid grid-cols-7 p-2 gap-1",
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
							onclick: () => previousMonth(container),
						}),
						monthYearElement,
						Button({
							type: "button",
							className: cn("btn btn-ghost btn-square", size),
							children: "›",
							disabled,
							onclick: () => nextMonth(container),
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

	return (
		<div
			{...props}
			className={mergedClassName}
			onmount={(element) => {
				if (!(element instanceof HTMLDivElement)) {
					return onmount?.(element);
				}
				mountedContainer = element;
				contentContainer = Box({
					className: "w-full",
				});

				if (currentView === "calendar") {
					showCalendar();
				} else {
					showTimeSelector();
				}

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

				render(element, children);
				return onmount?.(element);
			}}
		/>
	);
}
