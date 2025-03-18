import { DraggableOptions } from "../types.js";

/**
 * Makes an HTML element draggable.
 *
 * @param {HTMLElement} element - The HTML element to make draggable.
 * @param {DraggableOptions} [options={}] - Configuration options for the draggable behavior.
 * @param {Function} [options.onDragStart] - Callback triggered when dragging starts.
 * @param {Function} [options.onDragEnd] - Callback triggered when dragging ends.
 * @param {Function} [options.onDragOver] - Callback triggered when an element is dragged over the target.
 * @param {Function} [options.onDragEnter] - Callback triggered when a draggable element enters the target.
 * @param {Function} [options.onDragLeave] - Callback triggered when a draggable element leaves the target.
 * @param {Function} [options.onDrop] - Callback triggered when a draggable element is dropped on the target.
 */
export function Draggable(
    element: HTMLElement,
    options: DraggableOptions = {}
): void {
    let draggedItem: HTMLElement | null = null;

    element.setAttribute("draggable", "true");

    element.addEventListener("dragstart", (event) => {
        draggedItem = event.target as HTMLElement;
        element.classList.add("dragging");

        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", element.id || "draggable");
        }

        options.onDragStart?.(event);
    });

    element.addEventListener("dragend", (event) => {
        element.classList.remove("dragging");
        draggedItem = null;
        options.onDragEnd?.(event);
    });

    element.addEventListener("dragover", (event) => {
        options.onDragOver?.(event);
    });

    element.addEventListener("dragenter", (event) => {
        options.onDragEnter?.(event);
    });

    element.addEventListener("dragleave", (event) => {
        options.onDragLeave?.(event);
    });

    element.addEventListener("drop", (event) => {
        event.preventDefault();
        options.onDrop?.(event, draggedItem);
    });
}