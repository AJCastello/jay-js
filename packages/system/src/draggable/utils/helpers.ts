import { TDraggableOptions, TDroppableOptions } from "../types.js";
import { Draggable } from "../core/draggable";
import { Droppable } from "../core/droppable";

/**
 * Creates a sortable list with drag-and-drop functionality.
 * 
 * @param {HTMLElement} container - The container element for the sortable list.
 * @param {string} itemSelector - The CSS selector for the sortable items.
 * @param {(items: HTMLElement[]) => void} [onSort] - Callback invoked when the list is sorted.
 */
export function createSortableList(
  container: HTMLElement,
  itemSelector: string,
  onSort?: (items: HTMLElement[]) => void
): void {
  const items = container.querySelectorAll(itemSelector);
  
  items.forEach(item => {
    Draggable(item as HTMLElement, {
      onDragStart: () => item.classList.add("dragging"),
      onDragEnd: () => item.classList.remove("dragging")
    });
  });

  Droppable(container, {
    dragOverClass: "sorting",
    onDragOver: (e) => {
      e.preventDefault();
      const dragging = container.querySelector(".dragging") as HTMLElement;
      if (!dragging) return;

      const siblings = Array.from(container.querySelectorAll(`${itemSelector}:not(.dragging)`));
      const nextSibling = siblings.find(sibling => {
        const rect = sibling.getBoundingClientRect();
        const offset = (e.clientY - rect.top) / rect.height;
        return offset < 0.5;
      });

      container.insertBefore(dragging, nextSibling || null);
    },
    onDrop: () => {
      const items = Array.from(container.querySelectorAll(itemSelector)) as HTMLElement[];
      onSort?.(items);
    }
  });
}

/**
 * Creates a drop zone that accepts file drag-and-drop.
 * 
 * @param {HTMLElement} element - The element that acts as the drop zone.
 * @param {(files: FileList) => void} onFiles - Callback invoked with the dropped files.
 * @param {Partial<TDroppableOptions>} [options] - Additional options for the drop zone.
 */
export function createFileDropZone(
  element: HTMLElement,
  onFiles: (files: FileList) => void,
  options: Partial<TDroppableOptions> = {}
): void {
  Droppable(element, {
    ...options,
    onDragOver: (e) => {
      if (e.dataTransfer?.types.includes("Files")) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      }
    },
    onDrop: (e) => {
      const files = e.dataTransfer?.files;
      if (files?.length) {
        onFiles(files);
      }
    }
  });
}

/**
 * Creates a group of elements that can be dragged between containers.
 * 
 * @param {HTMLElement[]} containers - The list of container elements.
 * @param {string} itemSelector - The CSS selector for the draggable items.
 * @param {(source: HTMLElement, target: HTMLElement, item: HTMLElement) => void} [onChange] - 
 * Callback invoked when an item is moved between containers.
 */
export function createDragGroup(
  containers: HTMLElement[],
  itemSelector: string,
  onChange?: (source: HTMLElement, target: HTMLElement, item: HTMLElement) => void
): void {
  containers.forEach(container => {
    const items = container.querySelectorAll(itemSelector);
    
    items.forEach(item => {
      Draggable(item as HTMLElement);
    });

    Droppable(container, {
      dragOverClass: "drag-group-over",
      onDrop: (e, draggedItem) => {
        if (!draggedItem) return;
        
        const sourceContainer = draggedItem.parentElement;
        if (sourceContainer === container) return;
        
        container.appendChild(draggedItem);
        onChange?.(sourceContainer!, container, draggedItem);
      }
    });
  });
}