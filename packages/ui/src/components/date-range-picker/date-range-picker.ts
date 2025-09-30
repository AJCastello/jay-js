import { Base, Box, Typography, type TBaseTagMap } from "@jay-js/elements";
import { Effect, State, render } from "@jay-js/system";
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
	const startDate = State<Date | null>(startValue || null);
	const endDate = State<Date | null>(endValue || null);
	const startError = State<string | null>(null);
	const endError = State<string | null>(null);

	const container = Base({
		tag: "div",
		...props,
		className: cn(
			"flex",
			layout === "horizontal" ? "flex-row" : "flex-col",
			gap,
			"w-full",
			props.className,
		),
		onunmount: () => {
			startDate.clear();
			endDate.clear();
			startError.clear();
			endError.clear();
		},
	}) as HTMLDivElement;

	function checkAndTriggerRange() {
		const start = startDate.value;
		const end = endDate.value;

		if (start && end) {
			if (validateRange && end < start) {
				return;
			}
			if (onSelectRange) {
				onSelectRange(new Date(start), new Date(end));
			}
		}
	}

	const startPickerContainer = Box({
		className: cn("flex-1", "flex flex-col"),
	}) as HTMLDivElement;

	const startErrorElement = Typography({
		tag: "span",
		className: "label-text-alt text-error mt-1",
		style: { display: "none" },
	});

	Effect(() => {
		const error = startError.value;
		if (error) {
			startErrorElement.textContent = error;
			startErrorElement.style.display = "block";
		} else {
			startErrorElement.style.display = "none";
		}
	});

	Effect(() => {
		const end = endDate.value;

		const startPicker = DatePicker({
			label: startLabel,
			defaultDate: startValue || new Date(),
			value: startValue,
			onSelect: (date) => {
				startDate.set(date);
				if (onStartChange) {
					onStartChange(new Date(date));
				}

				const end = endDate.value;
				if (validateRange && end && date > end) {
					startError.set("Data inicial não pode ser maior que a final");
					return;
				}

				startError.set(null);
				checkAndTriggerRange();
			},
			withTime,
			minDate,
			maxDate: validateRange && end ? end : maxDate,
			color,
			size,
			disabled,
			locale,
			showToday,
			rangeStart: startDate.value,
			rangeEnd: end,
		});

		render(startPickerContainer, [startPicker, startErrorElement]);
	});

	const endPickerContainer = Box({
		className: cn("flex-1", "flex flex-col"),
	}) as HTMLDivElement;

	const endErrorElement = Typography({
		tag: "span",
		className: "label-text-alt text-error mt-1",
		style: { display: "none" },
	});

	Effect(() => {
		const error = endError.value;
		if (error) {
			endErrorElement.textContent = error;
			endErrorElement.style.display = "block";
		} else {
			endErrorElement.style.display = "none";
		}
	});

	Effect(() => {
		const start = startDate.value;

		const endPicker = DatePicker({
			label: endLabel,
			defaultDate: endValue || new Date(),
			value: endValue,
			onSelect: (date) => {
				endDate.set(date);
				if (onEndChange) {
					onEndChange(new Date(date));
				}

				const start = startDate.value;
				if (validateRange && start && date < start) {
					endError.set("Data final não pode ser menor que a inicial");
					return;
				}

				endError.set(null);
				checkAndTriggerRange();
			},
			withTime,
			minDate: validateRange && start ? start : minDate,
			maxDate,
			color,
			size,
			disabled,
			locale,
			showToday,
			rangeStart: start,
			rangeEnd: endDate.value,
		});

		render(endPickerContainer, [endPicker, endErrorElement]);
	});
	render(container, [startPickerContainer, endPickerContainer]);

	return container as HTMLElementTagNameMap[T];
}