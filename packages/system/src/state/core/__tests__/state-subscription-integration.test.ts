/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { childs } from "../../utils/helpers.js";
import { state } from "../state.js";
import { subscriptionRegistry } from "../subscription-registry.js";

describe("State + Subscription Registry Integration", () => {
	it("should register subscription when childs() is called with element", () => {
		const myState = state({ count: 0 });
		const element = document.createElement("div");
		const nodeRefId = "test-node-1";

		let renderCount = 0;
		const setChild = () => {
			renderCount++;
			myState.value.count;
		};

		childs(() => myState.value.count, nodeRefId, setChild, element);

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);
		expect(subscriptionRegistry.getSubscriptionCount(element)).toBeGreaterThan(0);
	});

	it("should not register subscription when childs() is called without element", () => {
		const myState = state({ count: 0 });
		const nodeRefId = "test-node-2";

		const setChild = () => {
			myState.value.count;
		};

		childs(() => myState.value.count, nodeRefId, setChild);

		expect(subscriptionRegistry.hasSubscriptions(document.body)).toBe(false);
	});

	it("should register multiple subscriptions for multiple state accesses", () => {
		const state1 = state({ value: "A" });
		const state2 = state({ value: "B" });
		const element = document.createElement("div");
		const nodeRefId = "test-node-3";

		const setChild = () => {
			state1.value.value;
			state2.value.value;
		};

		childs(
			() => {
				state1.value.value;
				state2.value.value;
			},
			nodeRefId,
			setChild,
			element,
		);

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);
		const count = subscriptionRegistry.getSubscriptionCount(element);
		expect(count).toBeGreaterThan(0);
	});

	it("should cleanup subscriptions when element is removed", () => {
		const myState = state({ count: 0 });
		const element = document.createElement("div");
		const nodeRefId = "test-node-4";

		let renderCount = 0;
		const setChild = () => {
			renderCount++;
			myState.value.count;
		};

		childs(() => myState.value.count, nodeRefId, setChild, element);

		const initialCount = renderCount;
		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

		subscriptionRegistry.cleanupElement(element);

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);

		myState.value.count = 10;

		expect(renderCount).toBe(initialCount);
	});

	it("should support nested property access", () => {
		const myState = state({
			user: {
				profile: {
					name: "John",
					age: 30,
				},
			},
		});

		const element = document.createElement("div");
		const nodeRefId = "test-node-5";

		const setChild = () => {
			myState.value.user.profile.name;
		};

		childs(() => myState.value.user.profile.name, nodeRefId, setChild, element);

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

		subscriptionRegistry.cleanupElement(element);
		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);
	});

	it("should handle array access", () => {
		const myState = state({ items: [1, 2, 3, 4, 5] });
		const element = document.createElement("div");
		const nodeRefId = "test-node-6";

		const setChild = () => {
			myState.value.items[0];
			myState.value.items.length;
		};

		childs(
			() => {
				myState.value.items[0];
				myState.value.items.length;
			},
			nodeRefId,
			setChild,
			element,
		);

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

		subscriptionRegistry.cleanupElement(element);
		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);
	});

	it("should register unique subscriptions for same state in different elements", () => {
		const myState = state({ count: 0 });
		const element1 = document.createElement("div");
		const element2 = document.createElement("div");

		childs(
			() => myState.value.count,
			"node-1",
			() => {
				myState.value.count;
			},
			element1,
		);

		childs(
			() => myState.value.count,
			"node-2",
			() => {
				myState.value.count;
			},
			element2,
		);

		expect(subscriptionRegistry.hasSubscriptions(element1)).toBe(true);
		expect(subscriptionRegistry.hasSubscriptions(element2)).toBe(true);

		subscriptionRegistry.cleanupElement(element1);

		expect(subscriptionRegistry.hasSubscriptions(element1)).toBe(false);
		expect(subscriptionRegistry.hasSubscriptions(element2)).toBe(true);

		subscriptionRegistry.cleanupElement(element2);
		expect(subscriptionRegistry.hasSubscriptions(element2)).toBe(false);
	});

	it("should handle cleanup of multiple subscriptions in same element", () => {
		const state1 = state({ value: 1 });
		const state2 = state({ value: 2 });
		const state3 = state({ value: 3 });
		const element = document.createElement("div");

		childs(
			() => state1.value.value,
			"node-1",
			() => {
				state1.value.value;
			},
			element,
		);

		childs(
			() => state2.value.value,
			"node-2",
			() => {
				state2.value.value;
			},
			element,
		);

		childs(
			() => state3.value.value,
			"node-3",
			() => {
				state3.value.value;
			},
			element,
		);

		expect(subscriptionRegistry.getSubscriptionCount(element)).toBeGreaterThan(2);

		subscriptionRegistry.cleanupElement(element);

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);
	});

	it("should track subscriptions across multiple renders", () => {
		const myState = state({ count: 0 });
		const element = document.createElement("div");
		let renderCount = 0;

		childs(
			() => myState.value.count,
			"node-track",
			() => {
				renderCount++;
				myState.value.count;
			},
			element,
		);

		const initialRenderCount = renderCount;
		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

		myState.value.count = 1;
		expect(renderCount).toBeGreaterThan(initialRenderCount);
		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

		myState.value.count = 2;
		expect(renderCount).toBeGreaterThan(initialRenderCount + 1);
		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);

		subscriptionRegistry.cleanupElement(element);

		const beforeCleanupRenderCount = renderCount;
		myState.value.count = 3;
		expect(renderCount).toBe(beforeCleanupRenderCount);
		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);
	});

	it("should handle element without subscriptions gracefully", () => {
		const element = document.createElement("div");

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);
		expect(subscriptionRegistry.getSubscriptionCount(element)).toBe(0);

		expect(() => subscriptionRegistry.cleanupElement(element)).not.toThrow();
	});
});
