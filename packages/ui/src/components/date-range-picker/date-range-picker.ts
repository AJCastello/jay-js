import { Base, Box, type TBaseTagMap, Typography } from "@jay-js/elements";
import { render } from "@jay-js/system";
import { cn } from "../../utils/cn";
import { DatePicker } from "../date-picker/date-picker";
import type { TDateRangePicker } from "./date-range-picker.types";

export function DateRangePicker<T extends TBaseTagMap = "div">(
	{
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
		...props
	}: TDateRangePicker<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	let startDate: Date | null = startValue || null;
	let endDate: Date | null = endValue || null;
	let currentRangeStart: Date | null = startValue || null;
	let currentRangeEnd: Date | null = endValue || null;

	const container = Base({
		tag: "div",
		...props,
		className: cn("flex", layout === "horizontal" ? "flex-row" : "flex-col", gap, "w-full", props.className),
	}) as HTMLDivElement;

	const startErrorElement = Typography({
		tag: "span",
		className: "label-text-alt text-error mt-1",
		style: { display: "none" },
	});

	const endErrorElement = Typography({
		tag: "span",
		className: "label-text-alt text-error mt-1",
		style: { display: "none" },
	});

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

	function handleStartSelect(date: Date) {
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

	function handleEndSelect(date: Date) {
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

	const startPickerContainer = Box({
		className: cn("flex-1", "flex flex-col"),
	}) as HTMLDivElement;

	const endPickerContainer = Box({
		className: cn("flex-1", "flex flex-col"),
	}) as HTMLDivElement;

	function updateStartPicker() {
		const startPicker = DatePicker({
			label: startLabel,
			defaultDate: startValue || new Date(),
			value: startValue,
			onSelect: handleStartSelect,
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

		render(startPickerContainer, [startPicker, startErrorElement]);
	}

	function updateEndPicker() {
		const endPicker = DatePicker({
			label: endLabel,
			defaultDate: endValue || new Date(),
			value: endValue,
			onSelect: handleEndSelect,
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

		render(endPickerContainer, [endPicker, endErrorElement]);
	}

	updateStartPicker();
	updateEndPicker();

	render(container, [startPickerContainer, endPickerContainer]);

	return container as HTMLElementTagNameMap[T];
}
