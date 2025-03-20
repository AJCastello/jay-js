import { Droppable } from "../droppable";

const createBubbledEvent = (type: string, props: any = {}) => {
	const event = new Event(type, {
		bubbles: true,
		cancelable: true,
	});
	return Object.assign(event, props);
};

describe("Droppable", () => {
	let element: HTMLElement;
	let draggedElement: HTMLElement;

	beforeEach(() => {
		element = document.createElement("div");
		draggedElement = document.createElement("div");
		draggedElement.classList.add("dragging");
		document.body.appendChild(element);
		document.body.appendChild(draggedElement);
	});

	afterEach(() => {
		document.body.removeChild(element);
		document.body.removeChild(draggedElement);
	});

	it("should prevent default on dragover", () => {
		Droppable(element);

		const dragOverEvent = createBubbledEvent("dragover", {
			dataTransfer: {
				types: ["text/plain"],
			},
		});

		const preventDefaultSpy = jest.spyOn(dragOverEvent, "preventDefault");
		element.dispatchEvent(dragOverEvent);

		expect(preventDefaultSpy).toHaveBeenCalled();
	});

	it("should add dragOverClass on dragenter", () => {
		const dragOverClass = "custom-drag-over";
		Droppable(element, { dragOverClass });

		const dragEnterEvent = createBubbledEvent("dragenter", {
			dataTransfer: {
				types: ["text/plain"],
			},
		});

		element.dispatchEvent(dragEnterEvent);
		expect(element.classList.contains(dragOverClass)).toBe(true);
	});

	it("should remove dragOverClass on dragleave when dragOverCount reaches 0", () => {
		const dragOverClass = "custom-drag-over";
		Droppable(element, { dragOverClass });

		const dragEnterEvent = createBubbledEvent("dragenter", {
			dataTransfer: {
				types: ["text/plain"],
			},
		});
		element.dispatchEvent(dragEnterEvent);

		const dragLeaveEvent = createBubbledEvent("dragleave");
		element.dispatchEvent(dragLeaveEvent);

		expect(element.classList.contains(dragOverClass)).toBe(false);
	});

	it("should call onDrop callback with dragged item", () => {
		const onDrop = jest.fn();
		Droppable(element, { onDrop });

		const dropEvent = createBubbledEvent("drop", {
			dataTransfer: {
				types: ["text/plain"],
				getData: () => "test-id",
			},
		});

		element.dispatchEvent(dropEvent);
		expect(onDrop).toHaveBeenCalledWith(expect.any(Event), draggedElement);
	});

	it("should respect accept option", () => {
		const onDrop = jest.fn();
		Droppable(element, { accept: false, onDrop });

		const dropEvent = createBubbledEvent("drop", {
			dataTransfer: {
				types: ["text/plain"],
				getData: () => "test-id",
			},
		});

		element.dispatchEvent(dropEvent);
		expect(onDrop).not.toHaveBeenCalled();
	});

	it("should respect acceptTypes option", () => {
		const onDrop = jest.fn();
		Droppable(element, {
			acceptTypes: ["custom-type"],
			onDrop,
		});

		const dropEvent = createBubbledEvent("drop", {
			dataTransfer: {
				types: ["text/plain"],
				getData: () => "different-type",
			},
		});

		element.dispatchEvent(dropEvent);
		expect(onDrop).not.toHaveBeenCalled();
	});
});
