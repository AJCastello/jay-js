export type TDragStartEvent = (event: DragEvent) => void;
export type TDragEndEvent = (event: DragEvent) => void;
export type TDragOverEvent = (event: DragEvent) => void;
export type TDragEnterEvent = (event: DragEvent) => void;
export type TDragLeaveEvent = (event: DragEvent) => void;
export type TDropEvent = (event: DragEvent, draggedItem: HTMLElement | null) => void;

export type TDraggableOptions = {
  onDragStart?: TDragStartEvent;
  onDragEnd?: TDragEndEvent;
  onDragOver?: TDragOverEvent;
  onDragEnter?: TDragEnterEvent;
  onDragLeave?: TDragLeaveEvent;
  onDrop?: TDropEvent;
}

export type TDroppableOptions = {
  accept?: boolean;
  acceptTypes?: string[];
  dragOverClass?: string;
}