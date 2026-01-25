/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";
import { state } from "../../../state/core/state.js";
import { subscriptionRegistry } from "../../../state/core/subscription-registry.js";
import { Base } from "../base.js";

describe("Subscription Cleanup End-to-End", () => {
	it("should register and cleanup subscriptions automatically with Base component", () => {
		const myState = state({ count: 0 });

		const element = Base({
			tag: "div",
			children: () => `Count: ${myState.value.count}`,
		});

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);
		expect(subscriptionRegistry.getSubscriptionCount(element)).toBeGreaterThan(0);

		document.body.appendChild(element);

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);
		expect(element.textContent).toBe("Count: 0");

		myState.value.count = 5;
		expect(element.textContent).toBe("Count: 5");

		element.remove();

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);
	});

	it("should not update DOM after element is removed", () => {
		const myState = state({ count: 0 });
		const renderFn = vi.fn(() => `Count: ${myState.value.count}`);

		const element = Base({
			tag: "div",
			children: renderFn,
		});

		document.body.appendChild(element);

		const initialCallCount = renderFn.mock.calls.length;
		expect(initialCallCount).toBeGreaterThan(0);

		element.remove();

		myState.value.count = 10;
		myState.value.count = 20;
		myState.value.count = 30;

		expect(renderFn.mock.calls.length).toBe(initialCallCount);
	});

	it("should cleanup subscriptions with multiple reactive children", () => {
		const state1 = state({ value: "A" });
		const state2 = state({ value: "B" });

		const element = Base({
			tag: "div",
			children: [() => `First: ${state1.value.value}`, () => ` Second: ${state2.value.value}`],
		});

		document.body.appendChild(element);

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);
		expect(element.textContent).toBe("First: A Second: B");

		state1.value.value = "X";
		expect(element.textContent).toBe("First: X Second: B");

		element.remove();

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);

		state1.value.value = "Z";
		state2.value.value = "Y";

		expect(element.textContent).toBe("First: X Second: B");
	});

	it("should cleanup subscriptions with nested elements", () => {
		const myState = state({ count: 0 });

		const nestedElement = Base({
			tag: "span",
			children: () => `Count: ${myState.value.count}`,
		});

		const element = Base({
			tag: "div",
			children: [nestedElement],
		});

		expect(subscriptionRegistry.hasSubscriptions(nestedElement)).toBe(true);

		document.body.appendChild(element);

		expect(subscriptionRegistry.hasSubscriptions(nestedElement)).toBe(true);

		element.remove();

		expect(subscriptionRegistry.hasSubscriptions(nestedElement)).toBe(false);
	});

	it("should work with onmount and onunmount hooks", () => {
		const myState = state({ count: 0 });
		const onmount = vi.fn();
		const onunmount = vi.fn();

		const element = Base({
			tag: "div",
			onmount,
			onunmount,
			children: () => `Count: ${myState.value.count}`,
		});

		document.body.appendChild(element);

		expect(onmount).toHaveBeenCalledTimes(1);
		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

		element.remove();

		expect(onunmount).toHaveBeenCalledTimes(1);
		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);
	});

	it("should cleanup subscriptions before onunmount is called", () => {
		const myState = state({ count: 0 });
		let subscriptionCountInOnunmount = -1;

		const element = Base({
			tag: "div",
			children: () => `Count: ${myState.value.count}`,
			onunmount: (el) => {
				subscriptionCountInOnunmount = subscriptionRegistry.getSubscriptionCount(el);
			},
		});

		document.body.appendChild(element);
		element.remove();

		expect(subscriptionCountInOnunmount).toBe(0);
	});

	it("should handle multiple create/mount/unmount cycles", () => {
		const myState = state({ count: 0 });

		for (let i = 0; i < 5; i++) {
			const element = Base({
				tag: "div",
				children: () => `Count: ${myState.value.count}`,
			});

			expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

			document.body.appendChild(element);
			expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

			myState.value.count = i;
			expect(element.textContent).toBe(`Count: ${i}`);

			element.remove();
			expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);
		}
	});

	it("should not leak subscriptions in SPA navigation simulation", () => {
		const globalState = state({ route: "home", data: { count: 0 } });

		const createPage = (route: string) => {
			return Base({
				tag: "div",
				children: () => `Route: ${globalState.value.route} | Count: ${globalState.value.data.count}`,
			});
		};

		for (let i = 0; i < 10; i++) {
			const page = createPage(`route-${i}`);

			expect(subscriptionRegistry.hasSubscriptions(page)).toBe(true);

			document.body.appendChild(page);
			globalState.value.data.count++;

			page.remove();

			expect(subscriptionRegistry.hasSubscriptions(page)).toBe(false);
		}
	});

	it("should handle array children with reactive functions", () => {
		const myState = state({ items: ["A", "B", "C"] });

		const element = Base({
			tag: "ul",
			children: myState.value.items.map((item) =>
				Base({
					tag: "li",
					children: () => `${item}: ${myState.value.items.length}`,
				}),
			),
		});

		document.body.appendChild(element);
		element.remove();

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);
	});

	it("should handle deeply nested state access", () => {
		const myState = state({
			user: {
				profile: {
					settings: {
						theme: "dark",
					},
				},
			},
		});

		const element = Base({
			tag: "div",
			children: () => `Theme: ${myState.value.user.profile.settings.theme}`,
		});

		document.body.appendChild(element);

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);
		expect(element.textContent).toBe("Theme: dark");

		myState.value.user.profile.settings.theme = "light";
		expect(element.textContent).toBe("Theme: light");

		element.remove();

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);

		myState.value.user.profile.settings.theme = "dark";
		expect(element.textContent).toBe("Theme: light");
	});

	it("should prevent memory leak with rapid create/destroy cycles", () => {
		const myState = state({ count: 0 });

		for (let i = 0; i < 100; i++) {
			const element = Base({
				tag: "div",
				children: () => `Count: ${myState.value.count}`,
			});

			expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

			document.body.appendChild(element);
			element.remove();

			expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);
		}
	});
});
