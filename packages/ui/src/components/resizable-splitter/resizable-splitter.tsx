import { cn } from "../../utils/cn";
import type { IResizableSplitter } from "./resizable-splitter.types.js";

export function ResizableSplitter({ direction = "vertical", className, onmount, ...props }: IResizableSplitter = {}) {
	const mergedClassName = cn("bg-base-300 flex flex-shrink-0", className);

	return (
		<div
			{...props}
			className={mergedClassName}
			onmount={(element) => {
				element.style.cursor = direction === "horizontal" ? "row-resize" : "col-resize";
				element.style.width = direction === "horizontal" ? "100%" : "0.25rem";
				element.style.height = direction === "horizontal" ? "0.25rem" : "100%";
				bindColumnResizeHandler(element, direction);
				return onmount?.(element);
			}}
		/>
	);
}

function bindColumnResizeHandler(handle: HTMLElement, direction: "horizontal" | "vertical") {
	let isDragging = false;
	let previousElement: HTMLElement | null;
	let nextElement: HTMLElement | null;

	handle.addEventListener("mousedown", (e: MouseEvent) => {
		isDragging = true;
		if (e.target instanceof HTMLElement) {
			previousElement = e.target.previousElementSibling instanceof HTMLElement ? e.target.previousElementSibling : null;
			nextElement = e.target.nextElementSibling instanceof HTMLElement ? e.target.nextElementSibling : null;
		}
	});

	document.addEventListener("mousemove", (e: MouseEvent) => {
		if (!isDragging) return;
		e.preventDefault();
		const minColumnSize = 50;

		if (direction === "horizontal") {
			const parent = handle.parentElement;
			const mousePosition = e.clientY;

			const newSizePrevious = Math.max(
				mousePosition - (parent?.offsetTop ?? 0) - (previousElement?.offsetTop ?? 0),
				minColumnSize,
			);
			const newSizeNext = Math.max(
				(nextElement?.offsetTop || 0) + (nextElement?.clientHeight || 0) - mousePosition,
				minColumnSize,
			);
			previousElement?.style.setProperty("height", `${newSizePrevious}px`);
			nextElement?.style.setProperty("height", `${newSizeNext}px`);
			return;
		}

		const mousePosition = e.clientX;
		const newSizePrevious = Math.max(mousePosition - (previousElement?.offsetLeft || 0), minColumnSize);
		const newSizeNext = Math.max(
			(nextElement?.offsetLeft || 0) + (nextElement?.clientWidth || 0) - mousePosition,
			minColumnSize,
		);
		previousElement?.style.setProperty("width", `${newSizePrevious}px`);
		nextElement?.style.setProperty("width", `${newSizeNext}px`);
	});

	document.addEventListener("mouseup", () => {
		isDragging = false;
	});
}
