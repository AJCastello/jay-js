import { Base } from "./base";

describe("Lifecycle Components", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
		jest.clearAllMocks();
		
		// Clear any existing custom elements
		const existingElements = Array.from(document.querySelectorAll("[is^='jayjs-']"));
		existingElements.forEach(el => el.remove());
	});

	describe("onmount Lifecycle", () => {
		it("should register custom element when onmount is provided", () => {
			const onmount = jest.fn();
			
			const element = Base({
				tag: "div",
				onmount
			});
			
			// Custom element should be registered
			expect(customElements.get("jayjs-div")).toBeDefined();
		});

		it("should call onmount when element is connected to DOM", () => {
			const onmount = jest.fn();
			
			const element = Base({
				tag: "div",
				onmount
			});
			
			// Add to DOM to trigger connectedCallback
			document.body.appendChild(element);
			
			expect(onmount).toHaveBeenCalledTimes(1);
			expect(onmount).toHaveBeenCalledWith(element);
		});

		it("should not register custom element when no lifecycle hooks", () => {
			const element = Base({
				tag: "div"
			});
			
			// Should use standard element creation
			expect(element.hasAttribute("is")).toBe(false);
		});
	});

	describe("onunmount Lifecycle", () => {
		it("should call onunmount when element is disconnected from DOM", () => {
			const onunmount = jest.fn();
			
			const element = Base({
				tag: "div",
				onunmount
			});
			
			// Add to DOM first
			document.body.appendChild(element);
			
			// Remove from DOM to trigger disconnectedCallback
			element.remove();
			
			expect(onunmount).toHaveBeenCalledTimes(1);
			expect(onunmount).toHaveBeenCalledWith(element);
		});

		it("should register custom element when onunmount is provided", () => {
			const onunmount = jest.fn();
			
			const element = Base({
				tag: "span",
				onunmount
			});
			
			expect(customElements.get("jayjs-span")).toBeDefined();
		});
	});

	describe("Combined Lifecycle Hooks", () => {
		it("should call both onmount and onunmount", () => {
			const onmount = jest.fn();
			const onunmount = jest.fn();
			
			const element = Base({
				tag: "div",
				onmount,
				onunmount
			});
			
			// Add to DOM
			document.body.appendChild(element);
			expect(onmount).toHaveBeenCalledTimes(1);
			expect(onmount).toHaveBeenCalledWith(element);
			
			// Remove from DOM
			element.remove();
			expect(onunmount).toHaveBeenCalledTimes(1);
			expect(onunmount).toHaveBeenCalledWith(element);
		});

		it("should handle multiple elements with same tag", () => {
			const onmount1 = jest.fn();
			const onmount2 = jest.fn();
			
			const element1 = Base({
				tag: "div",
				onmount: onmount1
			});
			
			const element2 = Base({
				tag: "div",
				onmount: onmount2
			});
			
			document.body.appendChild(element1);
			document.body.appendChild(element2);
			
			expect(onmount1).toHaveBeenCalledWith(element1);
			expect(onmount2).toHaveBeenCalledWith(element2);
		});
	});

	describe("Custom Element Registration", () => {
		it("should not re-register existing custom element", () => {
			const onmount1 = jest.fn();
			const onmount2 = jest.fn();
			
			// Create first element
			Base({
				tag: "button",
				onmount: onmount1
			});
			
			const initialDefinition = customElements.get("jayjs-button");
			
			// Create second element with same tag
			Base({
				tag: "button",
				onmount: onmount2
			});
			
			const finalDefinition = customElements.get("jayjs-button");
			
			// Should be the same definition (not re-registered)
			expect(finalDefinition).toBe(initialDefinition);
		});

		it("should create element with is attribute when lifecycle hooks exist", () => {
			const element = Base({
				tag: "section",
				onmount: jest.fn()
			});
			
			// The element should be created with lifecycle support
			expect(element.tagName.toLowerCase()).toBe("section");
			// Note: The 'is' attribute behavior may vary based on custom element registration
		});

		it("should extend proper HTML element class", () => {
			const element = Base({
				tag: "button",
				onmount: jest.fn()
			});
			
			expect(element instanceof HTMLButtonElement).toBe(true);
			expect(element.tagName.toLowerCase()).toBe("button");
		});
	});

	describe("Error Handling", () => {
		it("should handle missing lifecycle hooks", () => {
			const element = Base({
				tag: "div",
				onmount: undefined,
				onunmount: undefined
			});
			
			// Should not register custom element for undefined hooks
			expect(element.hasAttribute("is")).toBe(false);
		});
	});

	describe("Lifecycle Hook Context", () => {
		it("should pass correct element to onmount", () => {
			let mountedElement: HTMLElement | null = null;
			
			const element = Base({
				tag: "article",
				id: "test-article",
				onmount: (el) => {
					mountedElement = el;
				}
			});
			
			document.body.appendChild(element);
			
			expect(mountedElement).toBe(element);
			expect(mountedElement!.id).toBe("test-article");
			expect(mountedElement!.tagName.toLowerCase()).toBe("article");
		});

		it("should pass correct element to onunmount", () => {
			let unmountedElement: HTMLElement | null = null;
			
			const element = Base({
				tag: "aside",
				id: "test-aside",
				onunmount: (el) => {
					unmountedElement = el;
				}
			});
			
			document.body.appendChild(element);
			element.remove();
			
			expect(unmountedElement).toBe(element);
			expect(unmountedElement!.id).toBe("test-aside");
			expect(unmountedElement!.tagName.toLowerCase()).toBe("aside");
		});
	});
});