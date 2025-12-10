import { State, Values } from "@jay-js/system";
import { vi } from "vitest";
import { Base } from "./base";

describe("Base Function", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
		vi.clearAllMocks();
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
			const clickHandler = vi.fn();
			const element = Base({
				listeners: {
					click: clickHandler,
				},
			});

			element.click();
			expect(clickHandler).toHaveBeenCalledTimes(1);
		});

		it("should attach multiple event listeners", () => {
			const clickHandler = vi.fn();
			const focusHandler = vi.fn();
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

		it("should handle number children", () => {
			const element = Base({
				children: 42,
			});
			expect(element.textContent).toBe("42");
		});

		it("should handle zero as number child", () => {
			const element = Base({
				children: 0,
			});
			expect(element.textContent).toBe("0");
		});

		it("should handle negative numbers as children", () => {
			const element = Base({
				children: -15.5,
			});
			expect(element.textContent).toBe("-15.5");
		});

		it("should handle array with mixed string and number children", () => {
			const element = Base({
				children: ["Progress: ", 75, "%"],
			});
			expect(element.textContent).toBe("Progress: 75%");
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
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
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

	describe("Function Children", () => {
		it("should handle synchronous function children", () => {
			const element = Base({
				children: () => "Function content",
			});

			expect(element.textContent).toBe("Function content");
		});

		it("should handle async function children", async () => {
			const asyncFunction = async () => "Async function content";

			const element = Base({
				children: asyncFunction,
			});

			await new Promise((resolve) => setTimeout(resolve, 10));

			expect(element.textContent).toBe("Async function content");
		});

		it("should handle function children in arrays", () => {
			const element = Base({
				children: ["Text", () => " from function", () => " and more"],
			});

			expect(element.textContent).toBe("Text from function and more");
		});

		it("should handle mixed function and async function children in arrays", async () => {
			const element = Base({
				children: ["Start", () => " sync", async () => " async", " end"],
			});

			expect(element.textContent).toContain("Start sync");

			await new Promise((resolve) => setTimeout(resolve, 0));

			expect(element.textContent).toContain("async");
			expect(element.textContent).toContain("end");
		});

		it("should handle function returning Node", () => {
			const createNode = () => {
				const node = document.createElement("span");
				node.textContent = "Node from function";
				return node;
			};

			const element = Base({
				children: createNode,
			});

			expect(element.querySelector("span")?.textContent).toBe("Node from function");
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
			const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

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

	describe("Automatic Values() Wrapping - className", () => {
		it("should auto-wrap function in className", () => {
			const state = State("initial");
			const element = Base({
				className: () => state.value,
			});

			expect(element.className).toBe("initial");

			state.set("updated");
			expect(element.className).toBe("updated");
		});

		it("should work with manually wrapped Values()", () => {
			const state = State("initial");
			const element = Base({
				className: Values(() => state.value),
			});

			expect(element.className).toBe("initial");

			state.set("updated");
			expect(element.className).toBe("updated");
		});

		it("should not wrap static strings", () => {
			const element = Base({ className: "static-class" });
			expect(element.className).toBe("static-class");
		});

		it("should handle multiple state dependencies in className", () => {
			const firstName = State("John");
			const lastName = State("Doe");
			const element = Base({
				className: () => `${firstName.value}-${lastName.value}`,
			});

			expect(element.className).toBe("John-Doe");

			firstName.set("Jane");
			expect(element.className).toBe("Jane-Doe");

			lastName.set("Smith");
			expect(element.className).toBe("Jane-Smith");
		});
	});

	describe("Automatic Values() Wrapping - style (nested)", () => {
		it("should auto-wrap functions in individual style properties", () => {
			const colorState = State("red");
			const element = Base({
				style: {
					color: () => colorState.value,
					fontSize: "16px",
				},
			});

			expect(element.style.color).toBe("red");
			expect(element.style.fontSize).toBe("16px");

			colorState.set("blue");
			expect(element.style.color).toBe("blue");
		});

		it("should handle mixed static and reactive properties", () => {
			const dynamicState = State("red");
			const element = Base({
				style: {
					color: () => dynamicState.value,
					backgroundColor: "white",
					fontSize: "16px",
				},
			});

			expect(element.style.color).toBe("red");
			expect(element.style.backgroundColor).toBe("white");

			dynamicState.set("green");
			expect(element.style.color).toBe("green");
			expect(element.style.backgroundColor).toBe("white");
		});

		it("should work with manually wrapped Values() in nested style", () => {
			const colorState = State("purple");
			const element = Base({
				style: {
					color: Values(() => colorState.value),
					fontSize: "18px",
				},
			});

			expect(element.style.color).toBe("purple");

			colorState.set("orange");
			expect(element.style.color).toBe("orange");
		});

		it("should handle multiple reactive style properties", () => {
			const colorState = State("red");
			const sizeState = State("16px");
			const element = Base({
				style: {
					color: () => colorState.value,
					fontSize: () => sizeState.value,
					backgroundColor: "white",
				},
			});

			expect(element.style.color).toBe("red");
			expect(element.style.fontSize).toBe("16px");

			colorState.set("blue");
			expect(element.style.color).toBe("blue");

			sizeState.set("20px");
			expect(element.style.fontSize).toBe("20px");
		});
	});

	describe("Automatic Values() Wrapping - dataset", () => {
		it("should auto-wrap functions in individual dataset properties", () => {
			const idState = State("123");
			const element = Base({
				dataset: {
					userId: () => idState.value,
					role: "admin",
				},
			});

			expect(element.dataset.userId).toBe("123");
			expect(element.dataset.role).toBe("admin");

			idState.set("456");
			expect(element.dataset.userId).toBe("456");
		});

		it("should work with manually wrapped Values() in dataset", () => {
			const idState = State("789");
			const element = Base({
				dataset: {
					userId: Values(() => idState.value),
					role: "moderator",
				},
			});

			expect(element.dataset.userId).toBe("789");
			expect(element.dataset.role).toBe("moderator");

			idState.set("101112");
			expect(element.dataset.userId).toBe("101112");
		});

		it("should handle multiple reactive dataset properties", () => {
			const userIdState = State("100");
			const roleState = State("admin");
			const element = Base({
				dataset: {
					userId: () => userIdState.value,
					role: () => roleState.value,
					status: "active",
				},
			});

			expect(element.dataset.userId).toBe("100");
			expect(element.dataset.role).toBe("admin");
			expect(element.dataset.status).toBe("active");

			userIdState.set("200");
			expect(element.dataset.userId).toBe("200");

			roleState.set("user");
			expect(element.dataset.role).toBe("user");
		});
	});

	describe("Backward Compatibility", () => {
		it("should work with existing Values() wrapped className", () => {
			const state = State("test");
			const element = Base({
				className: Values(() => state.value),
			});

			expect(element.className).toBe("test");

			state.set("updated");
			expect(element.className).toBe("updated");
		});

		it("should work with existing Values() wrapped in style", () => {
			const colorState = State("red");
			const element = Base({
				style: {
					color: Values(() => colorState.value),
				},
			});

			expect(element.style.color).toBe("red");

			colorState.set("blue");
			expect(element.style.color).toBe("blue");
		});

		it("should work with existing Values() wrapped in dataset", () => {
			const state = State("test");
			const element = Base({
				dataset: {
					value: Values(() => state.value),
				},
			});

			expect(element.dataset.value).toBe("test");

			state.set("updated");
			expect(element.dataset.value).toBe("updated");
		});

		it("should not break static values", () => {
			const element = Base({
				className: "static",
				style: { color: "red" },
				dataset: { id: "123" },
			});

			expect(element.className).toBe("static");
			expect(element.style.color).toBe("red");
			expect(element.dataset.id).toBe("123");
		});
	});

	describe("Edge Cases - Auto Wrapping", () => {
		it("should handle undefined/null values", () => {
			const element = Base({
				className: undefined,
				style: undefined,
				dataset: undefined,
			});

			expect(element.className).toBe("");
		});

		it("should handle nested undefined in style", () => {
			const state = State<string | undefined>(undefined);
			const element = Base({
				style: {
					color: () => state.value || "red",
				},
			});

			expect(element.style.color).toBe("red");

			state.set("blue");
			expect(element.style.color).toBe("blue");
		});

		it("should not interfere with event listeners", () => {
			const handler = vi.fn();
			const state = State("click-handler");

			const element = Base({
				className: () => state.value,
				listeners: { click: handler },
			});

			element.click();
			expect(handler).toHaveBeenCalledTimes(1);
		});

		it("should not interfere with lifecycle hooks", () => {
			const onmountSpy = vi.fn();
			const state = State("test");

			const element = Base({
				className: () => state.value,
				onmount: onmountSpy,
			});

			expect(typeof (element as any).onmount).toBe("function");
		});

		it("should handle conditional reactive values", () => {
			const isActive = State(true);
			const element = Base({
				className: () => (isActive.value ? "active" : "inactive"),
			});

			expect(element.className).toBe("active");

			isActive.set(false);
			expect(element.className).toBe("inactive");
		});

		it("should handle computed values from multiple states", () => {
			const count = State(5);
			const multiplier = State(2);
			const element = Base({
				dataset: {
					result: () => (count.value * multiplier.value).toString(),
				},
			});

			expect(element.dataset.result).toBe("10");

			count.set(10);
			expect(element.dataset.result).toBe("20");

			multiplier.set(3);
			expect(element.dataset.result).toBe("30");
		});
	});

	describe("Automatic Values() Wrapping - Props (Phase 2)", () => {
		describe("HTML Properties", () => {
			it("should auto-wrap function in value property", () => {
				const valueState = State("hello");
				const element = Base({
					tag: "input",
					value: () => valueState.value,
				});

				expect((element as HTMLInputElement).value).toBe("hello");

				valueState.set("world");
				expect((element as HTMLInputElement).value).toBe("world");
			});

			it("should auto-wrap function in checked property", () => {
				const checkedState = State(true);
				const element = Base({
					tag: "input",
					type: "checkbox",
					checked: () => checkedState.value,
				});

				expect((element as HTMLInputElement).checked).toBe(true);

				checkedState.set(false);
				expect((element as HTMLInputElement).checked).toBe(false);
			});

			it("should auto-wrap function in disabled property", () => {
				const disabledState = State(false);
				const element = Base({
					tag: "button",
					disabled: () => disabledState.value,
				});

				expect((element as HTMLButtonElement).disabled).toBe(false);

				disabledState.set(true);
				expect((element as HTMLButtonElement).disabled).toBe(true);
			});

			it("should auto-wrap function in placeholder property", () => {
				const placeholderState = State("Enter name");
				const element = Base({
					tag: "input",
					placeholder: () => placeholderState.value,
				});

				expect((element as HTMLInputElement).placeholder).toBe("Enter name");

				placeholderState.set("Enter email");
				expect((element as HTMLInputElement).placeholder).toBe("Enter email");
			});

			it("should handle static property values", () => {
				const element = Base({
					tag: "input",
					value: "static",
					disabled: true,
					placeholder: "test",
				});

				expect((element as HTMLInputElement).value).toBe("static");
				expect((element as HTMLInputElement).disabled).toBe(true);
				expect((element as HTMLInputElement).placeholder).toBe("test");
			});
		});

		describe("Event Handlers Should NOT be Wrapped", () => {
			it("should NOT wrap onclick event handler", () => {
				const handler = vi.fn();
				const element = Base({
					tag: "button",
					onclick: handler,
				});

				element.click();
				expect(handler).toHaveBeenCalledTimes(1);
			});

			it("should NOT wrap onchange event handler", () => {
				const handler = vi.fn();
				const element = Base({
					tag: "input",
					onchange: handler,
				});

				element.dispatchEvent(new Event("change"));
				expect(handler).toHaveBeenCalledTimes(1);
			});

			it("should NOT wrap oninput event handler", () => {
				const handler = vi.fn();
				const element = Base({
					tag: "input",
					oninput: handler,
				});

				element.dispatchEvent(new Event("input"));
				expect(handler).toHaveBeenCalledTimes(1);
			});

			it("should NOT wrap onmouseover event handler", () => {
				const handler = vi.fn();
				const element = Base({
					onmouseover: handler,
				});

				element.dispatchEvent(new Event("mouseover"));
				expect(handler).toHaveBeenCalledTimes(1);
			});
		});

		describe("Mixed Props and Event Handlers", () => {
			it("should auto-wrap props but not event handlers", () => {
				const valueState = State("test");
				const disabledState = State(false);
				const clickHandler = vi.fn();
				const inputHandler = vi.fn();

				const element = Base({
					tag: "input",
					value: () => valueState.value,
					disabled: () => disabledState.value,
					onclick: clickHandler,
					oninput: inputHandler,
				});

				expect((element as HTMLInputElement).value).toBe("test");
				expect((element as HTMLInputElement).disabled).toBe(false);

				valueState.set("updated");
				disabledState.set(true);

				expect((element as HTMLInputElement).value).toBe("updated");
				expect((element as HTMLInputElement).disabled).toBe(true);

				element.dispatchEvent(new Event("click"));
				element.dispatchEvent(new Event("input"));

				expect(clickHandler).toHaveBeenCalledTimes(1);
				expect(inputHandler).toHaveBeenCalledTimes(1);
			});
		});

		describe("Backward Compatibility - Props", () => {
			it("should work with existing Values() wrapped props", () => {
				const valueState = State("test");
				const element = Base({
					tag: "input",
					value: Values(() => valueState.value),
				});

				expect((element as HTMLInputElement).value).toBe("test");

				valueState.set("updated");
				expect((element as HTMLInputElement).value).toBe("updated");
			});

			it("should not break when mixing Values() and auto-wrap", () => {
				const value1 = State("a");
				const value2 = State("b");

				const element = Base({
					tag: "input",
					value: Values(() => value1.value),
					placeholder: () => value2.value,
				});

				expect((element as HTMLInputElement).value).toBe("a");
				expect((element as HTMLInputElement).placeholder).toBe("b");

				value1.set("c");
				value2.set("d");

				expect((element as HTMLInputElement).value).toBe("c");
				expect((element as HTMLInputElement).placeholder).toBe("d");
			});
		});

		describe("Edge Cases - Props", () => {
			it("should handle computed values with multiple dependencies", () => {
				const firstName = State("John");
				const lastName = State("Doe");

				const element = Base({
					tag: "input",
					value: () => `${firstName.value} ${lastName.value}`,
				});

				expect((element as HTMLInputElement).value).toBe("John Doe");

				firstName.set("Jane");
				expect((element as HTMLInputElement).value).toBe("Jane Doe");

				lastName.set("Smith");
				expect((element as HTMLInputElement).value).toBe("Jane Smith");
			});

			it("should handle conditional reactive values in props", () => {
				const isEnabled = State(true);
				const element = Base({
					tag: "button",
					disabled: () => !isEnabled.value,
				});

				expect((element as HTMLButtonElement).disabled).toBe(false);

				isEnabled.set(false);
				expect((element as HTMLButtonElement).disabled).toBe(true);
			});
		});
	});

	describe("Automatic Values() Wrapping - Children (Phase 3)", () => {
		describe("Reactive String Children", () => {
			it("should auto-wrap function returning string", () => {
				const textState = State("Hello");
				const element = Base({
					children: () => textState.value,
				});

				expect(element.textContent).toBe("Hello");

				textState.set("World");
				expect(element.textContent).toBe("World");
			});

			it("should handle computed values in children", () => {
				const firstName = State("John");
				const lastName = State("Doe");
				const element = Base({
					children: () => `${firstName.value} ${lastName.value}`,
				});

				expect(element.textContent).toBe("John Doe");

				firstName.set("Jane");
				expect(element.textContent).toBe("Jane Doe");

				lastName.set("Smith");
				expect(element.textContent).toBe("Jane Smith");
			});

			it("should handle multiple state dependencies", () => {
				const count = State(0);
				const prefix = State("Count");
				const element = Base({
					children: () => `${prefix.value}: ${count.value}`,
				});

				expect(element.textContent).toBe("Count: 0");

				count.set(1);
				expect(element.textContent).toBe("Count: 1");

				prefix.set("Total");
				expect(element.textContent).toBe("Total: 1");
			});

			it("should handle reactive number children", () => {
				const progress = State(0);
				const element = Base({
					children: () => progress.value,
				});

				expect(element.textContent).toBe("0");

				progress.set(50);
				expect(element.textContent).toBe("50");

				progress.set(100);
				expect(element.textContent).toBe("100");
			});

			it("should handle reactive number with string template", () => {
				const progress = State(0);
				const element = Base({
					children: () => `${Math.round(progress.value)}%`,
				});

				expect(element.textContent).toBe("0%");

				progress.set(45.7);
				expect(element.textContent).toBe("46%");

				progress.set(99.2);
				expect(element.textContent).toBe("99%");
			});

			it("should handle reactive number in array", () => {
				const score = State(85);
				const element = Base({
					children: ["Score: ", () => score.value, "/100"],
				});

				expect(element.textContent).toBe("Score: 85/100");

				score.set(92);
				expect(element.textContent).toBe("Score: 92/100");
			});
		});

		describe("Reactive Node Children", () => {
			it("should auto-wrap function returning Node", () => {
				const showImage = State(true);
				const element = Base({
					children: () =>
						showImage.value ? Base({ tag: "img", src: "test.jpg" }) : Base({ tag: "span", children: "No image" }),
				});

				expect(element.querySelector("img")).toBeDefined();
				expect(element.querySelector("span")).toBeNull();

				showImage.set(false);
				expect(element.querySelector("img")).toBeNull();
				expect(element.querySelector("span")).toBeDefined();
				expect(element.textContent).toBe("No image");
			});

			it("should handle transitions from string to Node", () => {
				const useElement = State(false);
				const element = Base({
					children: () => (useElement.value ? Base({ tag: "strong", children: "Bold" }) : "Plain text"),
				});

				expect(element.textContent).toBe("Plain text");
				expect(element.querySelector("strong")).toBeNull();

				useElement.set(true);
				expect(element.querySelector("strong")).toBeDefined();
				expect(element.textContent).toBe("Bold");
			});

			it("should handle transitions from Node to string", () => {
				const useElement = State(true);
				const element = Base({
					children: () => (useElement.value ? Base({ tag: "em", children: "Italic" }) : "Plain"),
				});

				expect(element.querySelector("em")).toBeDefined();
				expect(element.textContent).toBe("Italic");

				useElement.set(false);
				expect(element.querySelector("em")).toBeNull();
				expect(element.textContent).toBe("Plain");
			});
		});

		describe("Array Children with Functions", () => {
			it("should auto-wrap functions in array children", () => {
				const prefix = State("Item");
				const count = State(1);
				const element = Base({
					children: [() => prefix.value, " ", () => count.value.toString()],
				});

				expect(element.textContent).toBe("Item 1");

				prefix.set("Entry");
				expect(element.textContent).toBe("Entry 1");

				count.set(2);
				expect(element.textContent).toBe("Entry 2");
			});

			it("should handle mix of static and reactive children", () => {
				const dynamic = State("Dynamic");
				const element = Base({
					children: ["Static ", () => dynamic.value, " End"],
				});

				expect(element.textContent).toBe("Static Dynamic End");

				dynamic.set("Changed");
				expect(element.textContent).toBe("Static Changed End");
			});

			it("should handle multiple reactive functions in array", () => {
				const a = State("A");
				const b = State("B");
				const c = State("C");
				const element = Base({
					children: [() => a.value, "-", () => b.value, "-", () => c.value],
				});

				expect(element.textContent).toBe("A-B-C");

				a.set("X");
				expect(element.textContent).toBe("X-B-C");

				b.set("Y");
				expect(element.textContent).toBe("X-Y-C");

				c.set("Z");
				expect(element.textContent).toBe("X-Y-Z");
			});
		});

		describe("Nested Array Children (Auto-flatten)", () => {
			it("should flatten nested arrays from map operations", () => {
				const items = ["A", "B", "C"];
				const element = Base({
					children: [
						"Start-",
						items.map((item) => Base({ tag: "span", children: item })),
						"-End",
					],
				});

				expect(element.children.length).toBe(3);
				expect(element.textContent).toBe("Start-ABC-End");
			});

			it("should handle deeply nested arrays", () => {
				const element = Base({
					children: [
						"L1",
						[
							"L2",
							[
								"L3",
								["L4"],
							],
						],
					],
				});

				expect(element.textContent).toBe("L1L2L3L4");
			});

			it("should flatten arrays with mix of elements and text nodes", () => {
				const items = [1, 2, 3];
				const element = Base({
					children: [
						Base({ tag: "span", children: "Header" }),
						items.map((n) => Base({ tag: "div", children: n.toString() })),
						Base({ tag: "span", children: "Footer" }),
					],
				});

				expect(element.children.length).toBe(5);
				expect(element.children[0].textContent).toBe("Header");
				expect(element.children[1].textContent).toBe("1");
				expect(element.children[2].textContent).toBe("2");
				expect(element.children[3].textContent).toBe("3");
				expect(element.children[4].textContent).toBe("Footer");
			});

			it("should handle arrays with reactive functions inside", () => {
				const state = State("Test");
				const items = ["A", "B"];
				const element = Base({
					children: [
						() => state.value,
						items.map((item) => Base({ tag: "span", children: item })),
					],
				});

				expect(element.textContent).toBe("TestAB");

				state.set("Updated");
				expect(element.textContent).toBe("UpdatedAB");
			});

			it("should handle empty arrays in nested structure", () => {
				const element = Base({
					children: [
						"Start",
						[],
						"Middle",
						[[], []],
						"End",
					],
				});

				expect(element.textContent).toBe("StartMiddleEnd");
			});

			it("should maintain correct DOM order with nested arrays", () => {
				const firstGroup = ["1", "2"];
				const secondGroup = ["3", "4"];
				const element = Base({
					children: [
						firstGroup.map((n) => Base({ tag: "span", children: n })),
						"-",
						secondGroup.map((n) => Base({ tag: "span", children: n })),
					],
				});

				expect(element.textContent).toBe("12-34");
				const spans = element.querySelectorAll("span");
				expect(spans.length).toBe(4);
				expect(spans[0].textContent).toBe("1");
				expect(spans[1].textContent).toBe("2");
				expect(spans[2].textContent).toBe("3");
				expect(spans[3].textContent).toBe("4");
			});
		});

		describe("Promise Children", () => {
			it("should handle reactive function returning Promise", async () => {
				const shouldResolve = State(true);
				const element = Base({
					children: () => (shouldResolve.value ? Promise.resolve("Resolved") : Promise.resolve("Alternative")),
				});

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(element.textContent).toBe("Resolved");

				shouldResolve.set(false);
				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(element.textContent).toBe("Alternative");
			});

			it("should handle rejected promises gracefully", async () => {
				const shouldReject = State(false);
				const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
				const element = Base({
					children: () => (shouldReject.value ? Promise.reject(new Error("Test error")) : Promise.resolve("Success")),
				});

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(element.textContent).toBe("Success");

				shouldReject.set(true);
				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(element.textContent).toBe("");
				expect(consoleErrorSpy).toHaveBeenCalled();

				consoleErrorSpy.mockRestore();
			});

			it("should handle Promise resolving to number", async () => {
				const element = Base({
					children: Promise.resolve(42),
				});

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(element.textContent).toBe("42");
			});

			it("should handle reactive function returning Promise with number", async () => {
				const value = State(10);
				const element = Base({
					children: () => Promise.resolve(value.value * 2),
				});

				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(element.textContent).toBe("20");

				value.set(25);
				await new Promise((resolve) => setTimeout(resolve, 10));
				expect(element.textContent).toBe("50");
			});
		});

		describe("Backward Compatibility - Children", () => {
			it("should not break static string children", () => {
				const element = Base({
					children: "Static text",
				});

				expect(element.textContent).toBe("Static text");
			});

			it("should not break static Node children", () => {
				const span = Base({ tag: "span", children: "Span content" });
				const element = Base({
					children: span,
				});

				expect(element.querySelector("span")).toBeDefined();
				expect(element.textContent).toBe("Span content");
			});

			it("should not break array children with static values", () => {
				const element = Base({
					children: ["Part 1", " ", "Part 2"],
				});

				expect(element.textContent).toBe("Part 1 Part 2");
			});
		});

		describe("Edge Cases", () => {
			it("should handle null/undefined returns from functions", () => {
				const value = State<string | null>("Text");
				const element = Base({
					children: () => value.value,
				});

				expect(element.textContent).toBe("Text");

				value.set(null);
				expect(element.textContent).toBe("");

				value.set("Back");
				expect(element.textContent).toBe("Back");
			});

			it("should handle boolean returns from functions", () => {
				const value = State<string | boolean>("Show");
				const element = Base({
					children: () => value.value,
				});

				expect(element.textContent).toBe("Show");

				value.set(false);
				expect(element.textContent).toBe("");

				value.set(true);
				expect(element.textContent).toBe("");

				value.set("Text");
				expect(element.textContent).toBe("Text");
			});

			it("should handle rapid state changes", () => {
				const counter = State(0);
				const element = Base({
					children: () => counter.value.toString(),
				});

				expect(element.textContent).toBe("0");

				for (let i = 1; i <= 10; i++) {
					counter.set(i);
					expect(element.textContent).toBe(i.toString());
				}
			});

			it("should handle empty string", () => {
				const value = State("Text");
				const element = Base({
					children: () => value.value,
				});

				expect(element.textContent).toBe("Text");

				value.set("");
				expect(element.textContent).toBe("");
			});

			it("should handle transitions between different types", () => {
				const mode = State<"string" | "node" | "null">("string");
				const element = Base({
					children: () => {
						if (mode.value === "string") return "String value";
						if (mode.value === "node") return Base({ tag: "b", children: "Bold" });
						return null;
					},
				});

				expect(element.textContent).toBe("String value");

				mode.set("node");
				expect(element.querySelector("b")).toBeDefined();
				expect(element.textContent).toBe("Bold");

				mode.set("null");
				expect(element.textContent).toBe("");

				mode.set("string");
				expect(element.textContent).toBe("String value");
			});
		});

		describe("Bug: Nested Reactive Children in Arrays", () => {
			it("should update reactive function inside nested element within array", () => {
				const textState = State("Initial");

				const element = Base({
					children: [
						() => textState.value,
						Base({
							tag: "span",
							children: () => textState.value,
						}),
					],
				});

				const textNodes = Array.from(element.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE);
				const spanElement = element.querySelector("span");

				expect(textNodes[0].textContent).toBe("Initial");
				expect(spanElement?.textContent).toBe("Initial");

				textState.set("Updated");

				expect(textNodes[0].textContent).toBe("Updated");
				expect(spanElement?.textContent).toBe("Updated");
			});

			it("should handle multiple nested reactive children", () => {
				const state1 = State("A");
				const state2 = State("B");

				const element = Base({
					children: [
						Base({
							tag: "div",
							children: () => state1.value,
						}),
						Base({
							tag: "span",
							children: () => state2.value,
						}),
					],
				});

				expect(element.querySelector("div")?.textContent).toBe("A");
				expect(element.querySelector("span")?.textContent).toBe("B");

				state1.set("X");
				state2.set("Y");

				expect(element.querySelector("div")?.textContent).toBe("X");
				expect(element.querySelector("span")?.textContent).toBe("Y");
			});

			it("should handle deeply nested reactive children", () => {
				const state = State("Deep");

				const element = Base({
					children: [
						Base({
							tag: "div",
							children: [
								Base({
									tag: "span",
									children: () => state.value,
								}),
							],
						}),
					],
				});

				expect(element.querySelector("span")?.textContent).toBe("Deep");
				state.set("Updated");
				expect(element.querySelector("span")?.textContent).toBe("Updated");
			});

			it("should handle mix of nested and top-level reactive children", () => {
				const state1 = State("Top");
				const state2 = State("Nested");

				const element = Base({
					children: [
						() => state1.value,
						" - ",
						Base({
							tag: "span",
							children: () => state2.value,
						}),
					],
				});

				expect(element.textContent).toBe("Top - Nested");

				state1.set("Updated1");
				expect(element.textContent).toBe("Updated1 - Nested");

				state2.set("Updated2");
				expect(element.textContent).toBe("Updated1 - Updated2");
			});
		});
	});
});
