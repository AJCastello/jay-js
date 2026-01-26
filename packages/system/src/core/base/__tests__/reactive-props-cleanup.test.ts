/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { state } from "../../../state/core/state.js";
import { subscriptionRegistry } from "../../../state/core/subscription-registry.js";
import { Base } from "../base.js";

describe("Reactive Props Cleanup", () => {
	it("should track and cleanup subscriptions for reactive id", () => {
		const myState = state({ id: "initial-id" });

		const element = Base({
			tag: "div",
			id: () => myState.value.id,
		});

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);
		expect(subscriptionRegistry.getSubscriptionCount(element)).toBeGreaterThan(0);

		document.body.appendChild(element);
		expect(element.id).toBe("initial-id");

		myState.value.id = "updated-id";
		expect(element.id).toBe("updated-id");

		element.remove();

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);

		myState.value.id = "should-not-update";
		expect(element.id).toBe("updated-id");
	});

	it("should track and cleanup subscriptions for reactive className", () => {
		const myState = state({ className: "initial-class" });

		const element = Base({
			tag: "div",
			className: () => myState.value.className,
		});

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

		document.body.appendChild(element);
		expect(element.className).toBe("initial-class");

		myState.value.className = "updated-class";
		expect(element.className).toBe("updated-class");

		element.remove();

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);

		myState.value.className = "should-not-update";
		expect(element.className).toBe("updated-class");
	});

	it("should track and cleanup subscriptions for reactive style properties", () => {
		const myState = state({ color: "red" });

		const element = Base({
			tag: "div",
			style: {
				color: () => myState.value.color,
			},
		});

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

		document.body.appendChild(element);
		expect(element.style.color).toBe("red");

		myState.value.color = "blue";
		expect(element.style.color).toBe("blue");

		element.remove();

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);

		myState.value.color = "green";
		expect(element.style.color).toBe("blue");
	});

	it("should track and cleanup subscriptions for reactive dataset", () => {
		const myState = state({ userId: "123" });

		const element = Base({
			tag: "div",
			dataset: {
				userId: () => myState.value.userId,
			},
		});

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

		document.body.appendChild(element);
		expect(element.dataset.userId).toBe("123");

		myState.value.userId = "456";
		expect(element.dataset.userId).toBe("456");

		element.remove();

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);

		myState.value.userId = "789";
		expect(element.dataset.userId).toBe("456");
	});

	it("should track and cleanup subscriptions for reactive general props", () => {
		const myState = state({ title: "Initial Title" });

		const element = Base({
			tag: "div",
			title: () => myState.value.title,
		});

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

		document.body.appendChild(element);
		expect(element.title).toBe("Initial Title");

		myState.value.title = "Updated Title";
		expect(element.title).toBe("Updated Title");

		element.remove();

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);

		myState.value.title = "Should Not Update";
		expect(element.title).toBe("Updated Title");
	});

	it("should handle multiple reactive props on same element", () => {
		const myState = state({
			id: "elem-1",
			className: "class-1",
			title: "Title 1",
			color: "red",
		});

		const element = Base({
			tag: "div",
			id: () => myState.value.id,
			className: () => myState.value.className,
			title: () => myState.value.title,
			style: {
				color: () => myState.value.color,
			},
		});

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);
		const initialCount = subscriptionRegistry.getSubscriptionCount(element);
		expect(initialCount).toBeGreaterThan(3);

		document.body.appendChild(element);

		expect(element.id).toBe("elem-1");
		expect(element.className).toBe("class-1");
		expect(element.title).toBe("Title 1");
		expect(element.style.color).toBe("red");

		myState.value.id = "elem-2";
		myState.value.className = "class-2";
		myState.value.title = "Title 2";
		myState.value.color = "blue";

		expect(element.id).toBe("elem-2");
		expect(element.className).toBe("class-2");
		expect(element.title).toBe("Title 2");
		expect(element.style.color).toBe("blue");

		element.remove();

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);

		myState.value.id = "elem-3";
		myState.value.className = "class-3";
		myState.value.title = "Title 3";
		myState.value.color = "green";

		expect(element.id).toBe("elem-2");
		expect(element.className).toBe("class-2");
		expect(element.title).toBe("Title 2");
		expect(element.style.color).toBe("blue");
	});

	it("should cleanup reactive props in rapid create/destroy cycles", () => {
		const myState = state({ value: 0 });

		for (let i = 0; i < 50; i++) {
			const element = Base({
				tag: "div",
				id: () => `elem-${myState.value.value}`,
				className: () => `class-${myState.value.value}`,
			});

			expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

			document.body.appendChild(element);
			myState.value.value = i;

			element.remove();

			expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);
		}
	});

	it("should work with combined reactive children and reactive props", () => {
		const myState = state({
			id: "elem-1",
			count: 0,
		});

		const element = Base({
			tag: "div",
			id: () => myState.value.id,
			children: () => `Count: ${myState.value.count}`,
		});

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

		document.body.appendChild(element);

		expect(element.id).toBe("elem-1");
		expect(element.textContent).toBe("Count: 0");

		myState.value.id = "elem-2";
		myState.value.count = 5;

		expect(element.id).toBe("elem-2");
		expect(element.textContent).toBe("Count: 5");

		element.remove();

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);

		myState.value.id = "elem-3";
		myState.value.count = 10;

		expect(element.id).toBe("elem-2");
		expect(element.textContent).toBe("Count: 5");
	});
});
