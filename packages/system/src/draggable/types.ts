export type DragStartEvent = (event: DragEvent) => void;
export type DragEndEvent = (event: DragEvent) => void;
export type DragOverEvent = (event: DragEvent) => void;
export type DragEnterEvent = (event: DragEvent) => void;
export type DragLeaveEvent = (event: DragEvent) => void;
export type DropEvent = (event: DragEvent, draggedItem: HTMLElement | null) => void;

export interface DraggableOptions {
  onDragStart?: DragStartEvent;
  onDragEnd?: DragEndEvent;
  onDragOver?: DragOverEvent;
  onDragEnter?: DragEnterEvent;
  onDragLeave?: DragLeaveEvent;
  onDrop?: DropEvent;
}

export interface DroppableOptions {
  accept?: boolean;
  acceptTypes?: string[];
  dragOverClass?: string;
}