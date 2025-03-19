import { createSortableList, createFileDropZone, createDragGroup } from "../helpers";

const createBubbledEvent = (type: string, props: any = {}) => {
  const event = new Event(type, {
    bubbles: true,
    cancelable: true
  });
  return Object.assign(event, props);
};

describe("Draggable Helpers", () => {
  describe("createSortableList", () => {
    let container: HTMLElement;
    let items: HTMLElement[];

    beforeEach(() => {
      container = document.createElement("div");
      items = Array.from({ length: 3 }, (_, i) => {
        const item = document.createElement("div");
        item.classList.add("sortable-item");
        item.textContent = `Item ${i + 1}`;
        container.appendChild(item);
        return item;
      });
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it("should make items draggable", () => {
      createSortableList(container, ".sortable-item");
      items.forEach(item => {
        expect(item.getAttribute("draggable")).toBe("true");
      });
    });

    it("should call onSort callback when items are reordered", () => {
      const onSort = jest.fn();
      createSortableList(container, ".sortable-item", onSort);

      const initialOrder = Array.from(container.children).map(item => (item as HTMLElement).textContent);

      const draggedItem = items[0];
      draggedItem.classList.add("dragging");

      const dragStartEvent = createBubbledEvent("dragstart", {
        dataTransfer: createBubbledEvent("dataTransfer", {
          getData: jest.fn(() => draggedItem.textContent || ""),
          setData: jest.fn(),
          effectAllowed: "move",
          types: ["text/plain"]
        })
      });
      draggedItem.dispatchEvent(dragStartEvent);

      container.appendChild(draggedItem);

      const dropEvent = createBubbledEvent("drop", {
        dataTransfer: createBubbledEvent("dataTransfer", {
          getData: jest.fn(() => draggedItem.textContent || ""),
          setData: jest.fn(),
          types: ["text/plain"]
        }),
        clientY: items[items.length - 1].getBoundingClientRect().bottom
      });

      container.dispatchEvent(dropEvent);

      expect(onSort).toHaveBeenCalledTimes(1);
      const newOrderArray = onSort.mock.calls[0][0] as HTMLElement[];

      expect(Array.isArray(newOrderArray)).toBe(true);
      newOrderArray.forEach((item: HTMLElement) => {
        expect(item instanceof HTMLElement).toBe(true);
        expect(item.classList.contains("sortable-item")).toBe(true);
      });

      const newOrder = newOrderArray.map((item: HTMLElement) => item.textContent);
      expect(newOrder).not.toEqual(initialOrder);

      expect(newOrder[newOrder.length - 1]).toBe(initialOrder[0]);

      expect(new Set(newOrder)).toEqual(new Set(initialOrder));
    });
  });

  describe("createFileDropZone", () => {
    let dropZone: HTMLElement;

    beforeEach(() => {
      dropZone = document.createElement("div");
      document.body.appendChild(dropZone);
    });

    afterEach(() => {
      document.body.removeChild(dropZone);
    });

    it("should handle file drops", () => {
      const onFiles = jest.fn();
      createFileDropZone(dropZone, onFiles);

      const files = [
        new File(["content"], "file1.txt", { type: "text/plain" }),
        new File(["content"], "file2.txt", { type: "text/plain" })
      ];

      const dropEvent = createBubbledEvent("drop", {
        dataTransfer: {
          files,
          getData: (type: string) => null,
          types: ["Files"]
        }
      });

      dropZone.dispatchEvent(dropEvent);
      expect(onFiles).toHaveBeenCalledWith(files);
    });

    it("should prevent default on dragover when files are being dragged", () => {
      createFileDropZone(dropZone, jest.fn());

      const dragOverEvent = createBubbledEvent("dragover", {
        dataTransfer: { types: ["Files"] }
      });

      const preventDefaultSpy = jest.spyOn(dragOverEvent, "preventDefault");
      dropZone.dispatchEvent(dragOverEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe("createDragGroup", () => {
    let containers: HTMLElement[];
    let items: HTMLElement[];

    beforeEach(() => {
      containers = Array.from({ length: 2 }, () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        return container;
      });

      items = Array.from({ length: 2 }, (_, i) => {
        const item = document.createElement("div");
        item.classList.add("drag-item");
        containers[0].appendChild(item);
        return item;
      });
    });

    afterEach(() => {
      containers.forEach(container => {
        document.body.removeChild(container);
      });
    });

    it("should make items draggable", () => {
      createDragGroup(containers, ".drag-item");
      items.forEach(item => {
        expect(item.getAttribute("draggable")).toBe("true");
      });
    });

    it("should call onChange when item is moved between containers", () => {
      const onChange = jest.fn();
      createDragGroup(containers, ".drag-item", onChange);

      const item = items[0];
      const targetContainer = containers[1];
      item.classList.add("dragging");

      const dropEvent = createBubbledEvent("drop", {
        clientX: 0,
        clientY: 1
      });

      targetContainer.dispatchEvent(dropEvent);
      expect(onChange).toHaveBeenCalledWith(
        containers[0],
        targetContainer,
        item
      );
    });
  });
});