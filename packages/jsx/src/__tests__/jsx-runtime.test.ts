import { beforeEach, describe, expect, test, vi } from "vitest";
import { Fragment, jsx } from "../runtime/jsx-runtime.js";

describe("JSX Runtime", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	test("renders basic element", async () => {
		const result = jsx("div", { id: "test-div" });
		// Handle both synchronous and Promise return types
		const element = result instanceof Promise ? await result : result;

		expect(element.tagName).toBe("DIV");
		expect(element.id).toBe("test-div");
	});

	test("renders element with children", async () => {
		const result = jsx("div", {
			id: "parent",
			children: [jsx("span", { id: "child1" }), jsx("p", { id: "child2" })],
		});

		// Handle both synchronous and Promise return types
		const element = result instanceof Promise ? await result : result;

		expect(element.tagName).toBe("DIV");
		expect(element.id).toBe("parent");
		expect(element.children.length).toBe(2);
		expect(element.children[0].tagName).toBe("SPAN");
		expect(element.children[1].tagName).toBe("P");
	});

	test("handles text content", async () => {
		const result = jsx("div", {
			children: "Hello World",
		});

		// Handle both synchronous and Promise return types
		const element = result instanceof Promise ? await result : result;

		expect(element.tagName).toBe("DIV");
		expect(element.textContent).toBe("Hello World");
	});

	test("handles event listeners", async () => {
		const clickHandler = vi.fn();
		const result = jsx("button", {
			onClick: clickHandler,
		});

		// Handle both synchronous and Promise return types
		const element = result instanceof Promise ? await result : result;

		element.click();
		expect(clickHandler).toHaveBeenCalledTimes(1);
	});

	test("handles function components", async () => {
		function TestComponent(props: any) {
			return jsx("div", {
				id: props.id,
				children: props.children,
			});
		}

		const result = jsx(TestComponent, {
			id: "test-component",
			children: "Component Content",
		});

		// Handle both synchronous and Promise return types
		const element = result instanceof Promise ? await result : result;

		expect(element.tagName).toBe("DIV");
		expect(element.id).toBe("test-component");
		expect(element.textContent).toBe("Component Content");
	});

	test("handles Fragment", async () => {
		const fragmentResult = jsx(Fragment, {
			children: [jsx("div", { id: "item1" }), jsx("div", { id: "item2" })],
		});

		// Handle both synchronous and Promise return types
		const fragment = fragmentResult instanceof Promise ? await fragmentResult : fragmentResult;

		// Fragments should return DocumentFragment
		expect(fragment instanceof DocumentFragment).toBe(true);
		expect(fragment.children.length).toBe(2);
		expect(fragment.children[0].id).toBe("item1");
		expect(fragment.children[1].id).toBe("item2");
	});
});
