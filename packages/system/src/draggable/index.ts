type DragStartEvent = (event: DragEvent) => void;
type DragEndEvent = (event: DragEvent) => void;
type DragOverEvent = (event: DragEvent) => void;
type DragEnterEvent = (event: DragEvent) => void;
type DragLeaveEvent = (event: DragEvent) => void;
type DropEvent = (event: DragEvent, draggedItem: HTMLElement | null) => void;

interface DraggableOptions {
  onDragStart?: DragStartEvent;
  onDragEnd?: DragEndEvent;
  onDragOver?: DragOverEvent;
  onDragEnter?: DragEnterEvent;
  onDragLeave?: DragLeaveEvent;
  onDrop?: DropEvent;
}

export function Draggable(
  element: HTMLElement,
  {
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop
  }: DraggableOptions = {}
): void {
  let draggedItem: HTMLElement | null = null;

  onDragStart && element.addEventListener("dragstart", (event) => {
    draggedItem = event.target as HTMLElement;
    onDragStart && onDragStart(event);
  });

  onDragEnd && element.addEventListener("dragend", onDragEnd);

  element.addEventListener("dragover", (event) => {
    event.preventDefault();
    onDragOver && onDragOver(event);
  });

  onDragEnter && element.addEventListener("dragenter", onDragEnter);
  onDragLeave && element.addEventListener("dragleave", onDragLeave);

  onDrop && element.addEventListener("drop", (event) => {
    onDrop(event, draggedItem);
  });
}
