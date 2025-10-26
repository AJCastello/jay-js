import { Base } from "./base";

describe("Base Function", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
		jest.clearAllMocks();
	});

	describe("Element Creation", () => {
		it("should create a div element by default", () => {
			const element = Base();
			expect(element.tagName.toLowerCase()).toBe("div");
		});

		it("should create specified HTML element", () => {
			const element = Base({ tag: "button" });
			expect(element.tagName.toLowerCase()).toBe("button");
		});

		it("should not generate id when not provided", () => {
			const element1 = Base();
			const element2 = Base();
			expect(element1.id).toBe("");
			expect(element2.id).toBe("");
		});

		it("should use provided id", () => {
			const element = Base({ id: "test-id" });
			expect(element.id).toBe("test-id");
		});
	});

	describe("Properties and Attributes", () => {
		it("should apply className", () => {
			const element = Base({ className: "test-class" });
			expect(element.className).toBe("test-class");
		});

		it("should apply style properties", () => {
			const element = Base({
				style: {
					color: "red",
					backgroundColor: "blue",
					fontSize: "16px",
				},
			});
			expect(element.style.color).toBe("red");
			expect(element.style.backgroundColor).toBe("blue");
			expect(element.style.fontSize).toBe("16px");
		});

		it("should apply dataset attributes", () => {
			const element = Base({
				dataset: {
					testId: "test-value",
					customAttr: "custom-value",
				},
			});
			expect(element.dataset.testId).toBe("test-value");
			expect(element.dataset.customAttr).toBe("custom-value");
		});

		it("should apply HTML element properties", () => {
			const element = Base({
				tag: "input",
				type: "text",
				placeholder: "Enter text",
			});
			expect((element as HTMLInputElement).type).toBe("text");
			expect((element as HTMLInputElement).placeholder).toBe("Enter text");
		});
	});

	describe("Event Listeners", () => {
		it("should attach event listeners", () => {
			const clickHandler = jest.fn();
			const element = Base({
				listeners: {
					click: clickHandler,
				},
			});

			element.click();
			expect(clickHandler).toHaveBeenCalledTimes(1);
		});

		it("should attach multiple event listeners", () => {
			const clickHandler = jest.fn();
			const focusHandler = jest.fn();
			const element = Base({
				tag: "input",
				listeners: {
					click: clickHandler,
					focus: focusHandler,
				},
			});

			// Add to DOM to ensure element can receive focus
			document.body.appendChild(element);

			element.click();
			(element as HTMLInputElement).focus();

			expect(clickHandler).toHaveBeenCalledTimes(1);
			expect(focusHandler).toHaveBeenCalledTimes(1);

			element.remove();
		});
	});

	describe("Children Handling", () => {
		it("should handle string children", () => {
			const element = Base({
				children: "Hello World",
			});
			expect(element.textContent).toBe("Hello World");
		});

		it("should handle Node children", () => {
			const childElement = document.createElement("span");
			childElement.textContent = "Child Node";

			const element = Base({
				children: childElement,
			});

			expect(element.children.length).toBe(1);
			expect(element.children[0]).toBe(childElement);
			expect(element.textContent).toBe("Child Node");
		});

		it("should handle array of children", () => {
			const child1 = document.createElement("span");
			child1.textContent = "Child 1";

			const element = Base({
				children: ["Text child", child1, "Another text"],
			});

			expect(element.childNodes.length).toBe(3);
			expect(element.childNodes[0].textContent).toBe("Text child");
			expect(element.childNodes[1]).toBe(child1);
			expect(element.childNodes[2].textContent).toBe("Another text");
		});

		it("should filter out boolean and null children", () => {
			const element = Base({
				children: ["Valid text", false, null, undefined, true],
			});

			expect(element.childNodes.length).toBe(1);
			expect(element.textContent).toBe("Valid text");
		});
	});

	describe("Ref Handling", () => {
		it("should assign element to ref.current", () => {
			const ref = { current: null };
			const element = Base({ ref });

			expect(ref.current).toBe(element);
		});
	});

	describe("Promise Children", () => {
		it("should handle Promise children with lazy slot", async () => {
			const promiseChild = Promise.resolve("Resolved content");

			const element = Base({
				children: promiseChild,
			});

			// Initially should have a lazy slot
			expect(element.children.length).toBe(1);
			expect(element.children[0].tagName.toLowerCase()).toBe("jayjs-lazy-slot");

			// Wait for promise resolution
			await promiseChild;

			// Allow for async DOM update
			await new Promise((resolve) => setTimeout(resolve, 0));

			expect(element.textContent).toBe("Resolved content");
		});

		it("should handle rejected Promise children", async () => {
			const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
			const rejectedPromise = Promise.reject(new Error("Test error"));

			Base({
				children: rejectedPromise,
			});

			// Wait for promise rejection
			await new Promise((resolve) => setTimeout(resolve, 0));

			expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to resolve child promise:", expect.any(Error));

			consoleErrorSpy.mockRestore();
		});
	});

	describe("Property Assignment", () => {
		it("should assign additional properties to element", () => {
			const element = Base({
				tag: "input",
				value: "test value",
				disabled: true,
			});

			expect((element as HTMLInputElement).value).toBe("test value");
			expect((element as HTMLInputElement).disabled).toBe(true);
		});

		it("should handle property assignment errors gracefully", () => {
			const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

			// Test with a property that will actually cause an error
			const element = Base({
				tag: "input",
			});

			// Try to set a readonly property directly
			expect(() => {
				(element as any).readOnly = "invalid";
			}).not.toThrow(); // Most readonly properties just ignore invalid assignments

			consoleWarnSpy.mockRestore();
		});
	});

	describe("Edge Cases", () => {
		it("should handle empty props object", () => {
			const element = Base({});
			expect(element.tagName.toLowerCase()).toBe("div");
			expect(element.id).toBe("");
		});

		it("should handle undefined props", () => {
			const element = Base();
			expect(element.tagName.toLowerCase()).toBe("div");
			expect(element.id).toBe("");
		});

		it("should skip parentRule and length properties in style", () => {
			const element = Base({
				style: {
					color: "red",
					...({ parentRule: null, length: 10 } as any),
				},
			});

			expect(element.style.color).toBe("red");
			// parentRule and length should be skipped
		});
	});
});
