interface DraggableOptions {
  onDragStart?: (event: DragEvent) => void;
  onDragEnd?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
  onDragEnter?: (event: DragEvent) => void;
  onDragLeave?: (event: DragEvent) => void;
  onDrop?: (event: DragEvent, draggedItem: EventTarget | null) => void;
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
  let draggedItem: EventTarget | null = null;

  element.addEventListener("dragstart", function (event) {
    draggedItem = event.target;
    onDragStart && onDragStart(event);
  });

  element.addEventListener("dragend", function (event) {
    event.preventDefault();
    onDragEnd && onDragEnd(event);
  });

  element.addEventListener("dragover", function (event) {
    event.preventDefault();
    onDragOver && onDragOver(event);
  });

  element.addEventListener("dragenter", function (event) {
    event.preventDefault();
    onDragEnter && onDragEnter(event);
  });

  element.addEventListener("dragleave", function (event) {
    event.preventDefault();
    onDragLeave && onDragLeave(event);
  });

  element.addEventListener("drop", function (event){
    event.preventDefault();
    onDrop && onDrop(event, draggedItem);
  });
}
