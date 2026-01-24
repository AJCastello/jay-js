import { Base, render } from "@jay-js/system";
import { cn } from "../../utils";
import { DatePicker } from "../date-picker";
import type { TDateRangePicker } from "./date-range-picker.types";

export function DateRangePicker({
	startLabel = "De",
	endLabel = "Até",
	startValue,
	endValue,
	onSelectRange,
	onStartChange,
	onEndChange,
	withTime = false,
	minDate,
	maxDate,
	color = "btn-primary",
	size = "btn-sm",
	disabled = false,
	locale = "pt-BR",
	showToday = true,
	layout = "horizontal",
	gap = "gap-4",
	validateRange = true,
	className,
	onmount,
	...props
}: TDateRangePicker = {}) {
	let startDate: Date | null = startValue || null;
	let endDate: Date | null = endValue || null;
	let currentRangeStart: Date | null = startValue || null;
	let currentRangeEnd: Date | null = endValue || null;

	const mergedClassName = cn("flex", layout === "horizontal" ? "flex-row" : "flex-col", gap, "w-full", className);

	function showError(element: HTMLElement, message: string) {
		element.textContent = message;
		element.style.display = "block";
	}

	function hideError(element: HTMLElement) {
		element.style.display = "none";
	}

	function checkAndTriggerRange() {
		const start = startDate;
		const end = endDate;

		if (start && end) {
			if (validateRange && end < start) {
				return;
			}
			if (onSelectRange) {
				onSelectRange(new Date(start), new Date(end));
			}
		}
	}

	function handleStartSelect(startErrorElement: HTMLElement, date: Date) {
		startDate = date;
		currentRangeStart = date;

		if (onStartChange) {
			onStartChange(new Date(date));
		}

		const end = endDate;
		if (validateRange && end && date > end) {
			showError(startErrorElement, "Data inicial não pode ser maior que a final");
			return;
		}

		hideError(startErrorElement);
		checkAndTriggerRange();
		updateEndPicker();
	}

	function handleEndSelect(endErrorElement: HTMLElement, date: Date) {
		endDate = date;
		currentRangeEnd = date;

		if (onEndChange) {
			onEndChange(new Date(date));
		}

		const start = startDate;
		if (validateRange && start && date < start) {
			showError(endErrorElement, "Data final não pode ser menor que a inicial");
			return;
		}

		hideError(endErrorElement);
		checkAndTriggerRange();
		updateStartPicker();
	}

	let startPickerContainer: HTMLDivElement | null = null;
	let endPickerContainer: HTMLDivElement | null = null;
	let startErrorElement: HTMLElement | null = null;
	let endErrorElement: HTMLElement | null = null;

	function updateStartPicker() {
		const container = startPickerContainer;
		const errorElement = startErrorElement;
		if (!container || !errorElement) return;
		const startPicker = DatePicker({
			label: startLabel,
			defaultDate: startValue || new Date(),
			value: startValue,
			onSelect: (date) => handleStartSelect(errorElement, date),
			withTime,
			minDate,
			maxDate: validateRange && endDate ? endDate : maxDate,
			color,
			size,
			disabled,
			locale,
			showToday,
			rangeStart: currentRangeStart,
			rangeEnd: currentRangeEnd,
		});

		render(container, [startPicker, errorElement]);
	}

	function updateEndPicker() {
		const container = endPickerContainer;
		const errorElement = endErrorElement;
		if (!container || !errorElement) return;
		const endPicker = DatePicker({
			label: endLabel,
			defaultDate: endValue || new Date(),
			value: endValue,
			onSelect: (date) => handleEndSelect(errorElement, date),
			withTime,
			minDate: validateRange && startDate ? startDate : minDate,
			maxDate,
			color,
			size,
			disabled,
			locale,
			showToday,
			rangeStart: currentRangeStart,
			rangeEnd: currentRangeEnd,
		});

		render(container, [endPicker, errorElement]);
	}

	return (
		<div
			{...props}
			className={mergedClassName}
			onmount={(container) => {
				startErrorElement = Base({
					tag: "span",
					className: "label-text-alt text-error mt-1",
					style: { display: "none" },
				});

				endErrorElement = Base({
					tag: "span",
					className: "label-text-alt text-error mt-1",
					style: { display: "none" },
				});

				startPickerContainer = Base({
					tag: "div",
					className: cn("flex-1", "flex flex-col"),
				});

				endPickerContainer = Base({
					tag: "div",
					className: cn("flex-1", "flex flex-col"),
				});

				updateStartPicker();
				updateEndPicker();

				render(container, [startPickerContainer, endPickerContainer]);
				return onmount?.(container);
			}}
		/>
	);
}
