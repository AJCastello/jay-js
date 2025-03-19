import { Draggable } from "../draggable";

const createBubbledEvent = (type: string, props: any = {}) => {
  const event = new Event(type, {
    bubbles: true,
    cancelable: true
  });
  return Object.assign(event, props);
};

describe("Draggable", () => {
  let element: HTMLElement;
  
  beforeEach(() => {
    element = document.createElement("div");
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it("should make element draggable", () => {
    Draggable(element);
    expect(element.getAttribute("draggable")).toBe("true");
  });

  it("should add dragging class on dragstart", () => {
    Draggable(element);
    
    const dragStartEvent = createBubbledEvent("dragstart", {
      dataTransfer: {
        setData: jest.fn(),
        effectAllowed: null
      }
    });
    
    element.dispatchEvent(dragStartEvent);
    expect(element.classList.contains("dragging")).toBe(true);
  });

  it("should remove dragging class on dragend", () => {
    Draggable(element);
    element.classList.add("dragging");
    
    const dragEndEvent = createBubbledEvent("dragend");
    element.dispatchEvent(dragEndEvent);
    
    expect(element.classList.contains("dragging")).toBe(false);
  });

  it("should call onDragStart callback", () => {
    const onDragStart = jest.fn();
    Draggable(element, { onDragStart });
    
    const dragStartEvent = createBubbledEvent("dragstart", {
      dataTransfer: {
        setData: jest.fn(),
        effectAllowed: null
      }
    });
    
    element.dispatchEvent(dragStartEvent);
    expect(onDragStart).toHaveBeenCalledWith(expect.any(Event));
  });

  it("should call onDragEnd callback", () => {
    const onDragEnd = jest.fn();
    Draggable(element, { onDragEnd });
    
    const dragEndEvent = createBubbledEvent("dragend");
    element.dispatchEvent(dragEndEvent);
    
    expect(onDragEnd).toHaveBeenCalledWith(expect.any(Event));
  });

  it("should set dataTransfer on dragstart", () => {
    Draggable(element);
    element.id = "test-element";
    
    const setData = jest.fn();
    const dragStartEvent = createBubbledEvent("dragstart", {
      dataTransfer: {
        setData,
        effectAllowed: null
      }
    });
    
    element.dispatchEvent(dragStartEvent);
    expect(setData).toHaveBeenCalledWith("text/plain", "test-element");
  });
});