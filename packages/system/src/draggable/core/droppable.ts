import { DroppableOptions, DraggableOptions } from "../types.js";

/**
 * Makes an HTML element a droppable area where draggable elements can be dropped.
 *
 * @param {HTMLElement} element - The HTML element to be made droppable.
 * @param {DroppableOptions & DraggableOptions} [options={}] - Configuration options for the droppable area.
 * @param {boolean} [options.accept=true] - Whether the element accepts drops.
 * @param {string[]} [options.acceptTypes=[]] - List of accepted types for draggable items.
 * @param {string} [options.dragOverClass="drag-over"] - CSS class to apply when a draggable item is over the element.
 * @param {Function} [options.onDragOver] - Callback triggered when a draggable item is dragged over the element.
 * @param {Function} [options.onDragEnter] - Callback triggered when a draggable item enters the element.
 * @param {Function} [options.onDragLeave] - Callback triggered when a draggable item leaves the element.
 * @param {Function} [options.onDrop] - Callback triggered when a draggable item is dropped on the element.
 */
export function Droppable(
	element: HTMLElement,
	options: DroppableOptions & DraggableOptions = {}
): void {
	const {
		accept = true,
		acceptTypes = [],
		dragOverClass = "drag-over",
		...dragOptions
	} = options;

	let dragOverCount = 0;

	element.addEventListener("dragover", (event) => {
		if (!accept) return;

		event.preventDefault();
		event.dataTransfer!.dropEffect = "move";

		dragOptions.onDragOver?.(event);
	});

	element.addEventListener("dragenter", (event) => {
		if (!accept) return;

		dragOverCount++;

		if (dragOverCount === 1) {
			element.classList.add(dragOverClass);
			dragOptions.onDragEnter?.(event);
		}
	});

	element.addEventListener("dragleave", (event) => {
		if (!accept) return;

		dragOverCount--;

		if (dragOverCount === 0) {
			element.classList.remove(dragOverClass);
			dragOptions.onDragLeave?.(event);
		}
	});

	element.addEventListener("drop", (event) => {
		if (!accept) return;

		event.preventDefault();
		dragOverCount = 0;
		element.classList.remove(dragOverClass);

		const draggedType = event.dataTransfer?.getData("text/plain");
		if (acceptTypes.length === 0 || (draggedType && acceptTypes.includes(draggedType))) {
			const draggedItem = document.querySelector(".dragging");
			dragOptions.onDrop?.(event, draggedItem as HTMLElement);
		}
	});
}